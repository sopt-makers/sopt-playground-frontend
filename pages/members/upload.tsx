import styled from '@emotion/styled';

import AuthRequired from '@/components/auth/AuthRequired';
import Header from '@/components/common/Header';
import AdditionalFormSection from '@/components/members/upload/AdditionalInfoFormSection';
import BasicFormSection from '@/components/members/upload/BasicFormSection';
import PublicQuestionFormSection from '@/components/members/upload/PublicQuestionFormSection';
import SoptActivityFormSection from '@/components/members/upload/SoptActivityFormSection';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { setLayout } from '@/utils/layout';

export default function MemberUploadPage() {
  return (
    <AuthRequired>
      <StyledContainer>
        <StyledHeader>
          <div className='title'>프로필 등록</div>
          <div className='description'>SOPT 멤버들을 위한 프로필을 등록해주세요</div>
        </StyledHeader>
        <StyledForm>
          <BasicFormSection />
          <SoptActivityFormSection />
          <AdditionalFormSection />
          <PublicQuestionFormSection />
          <MobileSubmitButton className='mobile-only'>완료</MobileSubmitButton>
        </StyledForm>
        <StyledFooter className='pc-only'>
          <button className='submit'>프로필 등록하기</button>
        </StyledFooter>
      </StyledContainer>
    </AuthRequired>
  );
}

setLayout(MemberUploadPage, (page) => (
  <>
    <Header />
    {page}
  </>
));

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
  justify-content: flex-end;
  background-color: ${colors.black80};
  width: 100vw;
  height: 90px;

  .submit {
    margin-right: 360px;
    border-radius: 100px;
    background-color: ${colors.purple100};
    padding: 18px 50px;

    ${textStyles.SUIT_14_M}
  }
`;
