import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { isEmpty } from 'lodash-es';
import { FC, useMemo, useState } from 'react';

import { getMembersSearchByName } from '@/api/endpoint/members/getMembersSearchByName';
import { getMemberById } from '@/api/endpoint_LEGACY/members';
import Input from '@/components/common/Input';
import ErrorMessage from '@/components/common/Input/ErrorMessage';
import Select from '@/components/common/Select';
import useToast from '@/components/common/Toast/useToast';
import { MemberRoleInfo } from '@/components/projects/constants';
import MemberSearch from '@/components/projects/upload/form/fields/member/MemberSearch';
import { Member, MemberSearchContext } from '@/components/projects/upload/form/fields/member/MemberSearchContext';
import IconTrash from '@/public/icons/icon-trash.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

type Value = {
  memberId: string;
  memberRole: string;
  memberDescription: string;
};

type ErrorMessage = {
  memberId?: string;
  memberRole?: string;
  memberDescription?: string;
};

interface MemberFieldProps {
  className?: string;
  value: Value;
  onChange: (value: Value) => void;
  onRemove: () => void;
  errorMessage?: ErrorMessage;
}

const MemberField: FC<MemberFieldProps> = ({ className, value, errorMessage, onChange, onRemove }) => {
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [selectedMember, setSelcetedMember] = useState<Member | undefined>();
  const isError = useMemo(() => !isEmpty(errorMessage), [errorMessage]);
  const toast = useToast();

  const searchMember = async (name: string) => {
    const members = await getMembersSearchByName.request(name);
    return members.map((member) => ({
      id: String(member.id),
      name: member.name,
      generation: member.generation,
      profileImage: member.profileImage,
    }));
  };

  const fetchMemberById = async (id: string) => {
    const member = await getMemberById(Number(id));
    const defaultMember = {
      id: String(member.id),
      name: member.name,
      generation: member.generation,
      profileImage: member.profileImage,
    };
    setSelcetedMember(defaultMember);
    return defaultMember;
  };

  const onSelectMember = (member: Member) => {
    onChange({
      ...value,
      memberId: member.id,
    });
    setSelcetedMember(member);
  };

  const onClearMember = () => {
    onChange({
      ...value,
      memberId: '',
    });
    setSelcetedMember(undefined);
  };

  const onClickEdit = () => {
    setIsEdit(true);
  };

  const onClickEditComplete = () => {
    if (isError) {
      toast.show({
        title: '알림',
        message: '멤버 필드를 모두 채워주세요.',
      });
      return;
    }
    setIsEdit(false);
  };

  return (
    <StyledMemberField className={className} onClick={onClickEdit}>
      {isEdit ? (
        <StyledMemberEditView isError={isError}>
          <MemberSearchContext.Provider
            value={{
              searchMember,
              memberId: value.memberId,
              getMemberById: fetchMemberById,
            }}
          >
            <StyledFormWrapper>
              <StyledMemberSearch
                isError={!!errorMessage?.memberId}
                selectedMember={selectedMember}
                placeholder='SOPT 멤버 검색'
                onSelect={onSelectMember}
                onClear={onClearMember}
              />
              {errorMessage?.memberId && <ErrorMessage message={errorMessage?.memberId} />}
            </StyledFormWrapper>
          </MemberSearchContext.Provider>
          <StyledFormWrapper>
            <StyledSelect
              error={!!errorMessage?.memberRole}
              placeholder='역할'
              value={value.memberRole ?? ''}
              onChange={(e) => onChange({ ...value, memberRole: e.target.value })}
            >
              {Object.entries(MemberRoleInfo).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </StyledSelect>
            {errorMessage?.memberRole && <ErrorMessage message={errorMessage?.memberRole} />}
          </StyledFormWrapper>
          <StyledInput
            error={!!errorMessage?.memberDescription}
            errorMessage={errorMessage && errorMessage.memberDescription}
            placeholder='어떤 역할을 맡았는지 적어주세요.'
            value={value.memberDescription}
            onChange={(e) =>
              onChange({
                ...value,
                memberDescription: e.target.value,
              })
            }
          />
          <StyledEditCompleteButton
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              onClickEditComplete();
            }}
          >
            완료
          </StyledEditCompleteButton>
          <IconDeleteWrapper>
            <IconTrash onClick={onRemove} />
          </IconDeleteWrapper>
        </StyledMemberEditView>
      ) : (
        <StyledMemberView>
          <span className='name'>{selectedMember?.name}</span>
          <span className='role'>{value.memberRole}</span>
          <span>{value.memberDescription}</span>
        </StyledMemberView>
      )}
    </StyledMemberField>
  );
};

export default MemberField;

const StyledMemberField = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
`;

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;
const StyledMemberEditView = styled.div<{ isError: boolean }>`
  display: flex;
  column-gap: 10px;
  align-items: ${({ isError }) => (isError ? 'flex-start' : 'center')};
  border-radius: 6px;
  background-color: ${colors.gray700};
  padding: 10px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    display: grid;
    grid-template-areas:
      'member role'
      'description description';
    grid-template-columns: 135px 1fr;
    grid-row-gap: 10px;
    padding: 12px;
  }
`;

const StyledMemberView = styled.div`
  display: flex;
  gap: 42px;
  border-radius: 6px;
  background-color: ${colors.gray700};
  cursor: pointer;
  padding: 14px 30px;
  width: 100%;
  min-height: 42px;
  white-space: nowrap;
  color: ${colors.gray500};

  ${textStyles.SUIT_14_M};

  & > .name {
    flex-basis: 105px;
  }

  & > .role {
    flex-basis: 126px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 15px 20px;
    ${textStyles.SUIT_12_M};
  }
`;

const StyledMemberSearch = styled(MemberSearch)`
  @media ${MOBILE_MEDIA_QUERY} {
    grid-area: member;
  }
`;

const StyledSelect = styled(Select)`
  border: 1px solid ${colors.gray600};
  border-radius: 6px;

  @media ${MOBILE_MEDIA_QUERY} {
    grid-area: role;
    max-width: 158px;
  }
`;

const StyledInput = styled(Input)`
  flex: 1 1 330px;
  border-radius: 6px;

  & > input {
    border: 1px solid ${colors.gray600};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    grid-area: description;
  }
`;

const StyledEditCompleteButton = styled.button`
  border-radius: 4px;
  background-color: ${colors.gray600};
  padding: 16px 36px;
  white-space: nowrap;
  color: ${colors.gray500};

  ${textStyles.SUIT_14_M};

  @media ${MOBILE_MEDIA_QUERY} {
    align-self: center;
    justify-self: end;
    order: 2;
    padding: 6.5px 30px;
  }
`;

const IconDeleteWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 42px;
  min-height: 42px;

  @media ${MOBILE_MEDIA_QUERY} {
    justify-self: start;
    order: 1;
  }
`;
