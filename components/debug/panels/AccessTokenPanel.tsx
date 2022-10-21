import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FC, useMemo, useReducer } from 'react';
import { useRecoilState } from 'recoil';

import { accessTokenAtom } from '@/components/auth/states/accessTokenAtom';
import { safeDecodeAccessToken } from '@/components/auth/util/accessToken';
import Button from '@/components/common/Button';
import TextArea from '@/components/common/TextArea';
import Panel from '@/components/debug/Panel';
import { colors } from '@/styles/colors';

const AccessTokenPanel: FC = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);

  const [editState, dispatchEdit] = useReducer(reducer, { type: 'idle' });

  const applyEdit = () => {
    if (editState.type !== 'editing') {
      return;
    }
    if (isEditError) {
      return;
    }
    setAccessToken(editState.value !== '' ? editState.value : null);
    dispatchEdit({ type: 'end' });
  };

  const decodedToken = useMemo(() => {
    if (!accessToken) {
      return false;
    }
    return safeDecodeAccessToken(accessToken);
  }, [accessToken]);

  const isEditError = useMemo(() => {
    if (editState.type === 'idle') {
      return false;
    }
    return safeDecodeAccessToken(editState.value) === null;
  }, [editState]);

  return (
    <Panel title='저장된 액세스 토큰'>
      {editState.type === 'editing' ? (
        <>
          <StyledTextArea
            value={editState.value}
            onChange={(e) => dispatchEdit({ type: 'change', value: e.target.value })}
            error={isEditError}
          />
          <ActionBox>
            <Button
              variant='primary'
              onClick={() => dispatchEdit({ type: 'end' })}
              css={{ backgroundColor: colors.gray100, marginLeft: '5px' }}
            >
              취소
            </Button>
            <Button variant='primary' onClick={applyEdit}>
              확인
            </Button>
          </ActionBox>
        </>
      ) : (
        <>
          <StyledTextArea value={accessToken ?? ''} disabled />
          <ActionBox>
            <Button variant='primary' onClick={() => dispatchEdit({ type: 'change', value: accessToken ?? '' })}>
              변경
            </Button>
          </ActionBox>
          <InSectionTitle>디코드된 토큰 정보</InSectionTitle>
          <StyledTextArea value={JSON.stringify(decodedToken, null, 2)} disabled />
        </>
      )}
    </Panel>
  );
};

export default AccessTokenPanel;

const StyledTextArea = styled(TextArea)`
  min-height: 130px;

  ${(props) =>
    props.disabled
      ? css`
          background-color: #444;
        `
      : ''}
`;

const ActionBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 8px;
`;

const InSectionTitle = styled.h3`
  margin: 5px 0;
`;

type States =
  | {
      type: 'editing';
      value: string;
    }
  | {
      type: 'idle';
    };

type Action =
  | {
      type: 'change';
      value: string;
    }
  | {
      type: 'end';
    };

const reducer = (_state: States, action: Action): States => {
  if (action.type === 'change') {
    return {
      type: 'editing',
      value: action.value,
    };
  } else if (action.type === 'end') {
    return {
      type: 'idle',
    };
  }

  throw new Error(`Invalid action type`);
};
