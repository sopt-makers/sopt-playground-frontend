import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Button } from '@sopt-makers/ui';
import { ReactNode } from 'react';

import Responsive from '@/components/common/Responsive';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

type FormType = 'upload' | 'edit';
const TYPE_MAP: Record<FormType, string> = { upload: '업로드', edit: '수정' };

interface MemberFormProps {
  type: FormType;
  children: ReactNode;
  onSubmit: () => void;
  isValid: boolean;
}

export default function MemberForm({ type, children, onSubmit, isValid }: MemberFormProps) {
  return (
    <StyledContainer>
      <StyledHeader>
        <div className='title'>프로필 {TYPE_MAP[type]}</div>
        <div className='description'>SOPT 멤버들을 위한 프로필을 {TYPE_MAP[type]}해주세요</div>
      </StyledHeader>
      <StyledForm onSubmit={(e) => e.preventDefault()}>
        {children}
        <Responsive only='desktop'>
          <SubmitButton rounded='lg' theme='white' disabled={!isValid} onClick={onSubmit}>
            프로필 {TYPE_MAP[type]}하기
          </SubmitButton>
        </Responsive>
        <Responsive only='mobile'>
          <SubmitButton theme='white' disabled={!isValid} onClick={onSubmit}>
            프로필 {TYPE_MAP[type]}하기
          </SubmitButton>
        </Responsive>
      </StyledForm>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 257px;

  & > * {
    width: 790px;
    @media (max-width: 790px) {
      width: 100%;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding-bottom: 222px;
  }
`;

const StyledHeader = styled.header`
  margin-top: 142px;

  .title {
    color: #fcfcfc;
    font-size: 36px;
    font-weight: 700;

    @media ${MOBILE_MEDIA_QUERY} {
      margin-top: 36px;
      margin-left: 24px;
      font-size: 24px;
    }
  }

  .description {
    margin-top: 16px;
    color: ${colors.gray600};
    font-size: 16px;
    font-weight: 500;

    @media ${MOBILE_MEDIA_QUERY} {
      margin-top: 12px;
      margin-left: 24px;
      font-size: 14px;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 36px;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 50px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 70px;
    margin-top: 52px;
    padding: 0 20px 48px;
  }
`;

const SubmitButton = styled(Button)`
  float: right;
  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;
