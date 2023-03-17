import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

type FormType = 'upload' | 'edit';
const TYPE_MAP: Record<FormType, string> = { upload: '업로드', edit: '수정' };

interface MemberFormProps {
  type: FormType;
  children: ReactNode;
  onSubmit: () => void;
}

export default function MemberForm({ type, children, onSubmit }: MemberFormProps) {
  return (
    <StyledContainer>
      <StyledHeader>
        <div className='title'>프로필 {TYPE_MAP[type]}</div>
        <div className='description'>SOPT 멤버들을 위한 프로필을 {TYPE_MAP[type]}해주세요</div>
      </StyledHeader>
      <StyledForm onSubmit={(e) => e.preventDefault()}>
        {children}
        <MobileSubmitButton onClick={onSubmit} className='mobile-only'>
          완료
        </MobileSubmitButton>
      </StyledForm>
      <StyledFooter className='pc-only'>
        <div className='button-wrapper'>
          <button onClick={onSubmit} className='submit'>
            프로필 {TYPE_MAP[type]}하기
          </button>
        </div>
      </StyledFooter>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding-bottom: 375px;

  & > * {
    width: 790px;
    @media (max-width: 790px) {
      width: 100%;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding-bottom: 0;
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
    color: ${colors.gray100};
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

const MobileSubmitButton = styled.button`
  margin-top: 18px;
  border-radius: 12px;
  background-color: ${colors.purple100};
  padding: 18px 0;
  color: ${colors.white100};
  font-size: 16px;
  font-weight: 600;
`;

const StyledFooter = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: ${colors.black80};
  width: 100vw;
  height: 90px;

  .submit {
    border-radius: 100px;
    background-color: ${colors.purple100};
    padding: 18px 50px;

    ${textStyles.SUIT_14_M}
  }

  .button-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 790px;

    button {
      cursor: pointer;
    }

    @media (max-width: 790px) {
      width: 100%;
    }
  }
`;
