import styled from '@emotion/styled';

import AuthRequired from '@/components/auth/AuthRequired';
import Header from '@/components/common/Header';
import AdditionalFormSection from '@/components/members/upload/AdditionalInfoFormSection';
import BasicFormSection from '@/components/members/upload/BasicFormSection';
import PublicQuestionFormSection from '@/components/members/upload/PublicQuestionFormSection';
import SoptActivityFormSection from '@/components/members/upload/SoptActivityFormSection';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
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
          <AdditionalFormSection />
          <SoptActivityFormSection />
          <PublicQuestionFormSection />
        </StyledForm>
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
  flex-direction: column;
  align-items: center;

  & > * {
    width: 790px;
    @media (max-width: 790px) {
      width: 100%;
    }
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
