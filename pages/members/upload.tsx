import styled from '@emotion/styled';

import AuthRequired from '@/components/auth/AuthRequired';
import Header from '@/components/common/Header';
import MemberAdditionalInfo from '@/components/members/upload/AdditionalInfo';
import MemberBasicInfo from '@/components/members/upload/BasicInfo';
import MemberPublicQuestion from '@/components/members/upload/PublicQuestion';
import MemberSoptActivityInfo from '@/components/members/upload/SoptActivityInfo';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

export default function MemberUploadPage() {
  return (
    <AuthRequired>
      <StyledContainer>
        <div>
          <StyledTitle>프로필 등록</StyledTitle>
          <StyledDescription>SOPT 멤버들을 위한 프로필을 등록해주세요</StyledDescription>
        </div>
        <StyledForm>
          <MemberBasicInfo />
          <MemberAdditionalInfo />
          <MemberSoptActivityInfo />
          <MemberPublicQuestion />
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

  & > *:nth-child(1) {
    margin-top: 142px;
    @media ${MOBILE_MEDIA_QUERY} {
      margin-top: 36px;
    }
  }

  & > *:nth-child(2) {
    margin-top: 50px;
    @media ${MOBILE_MEDIA_QUERY} {
      margin-top: 52px;
    }
  }
`;

const StyledTitle = styled.h1`
  color: #fcfcfc;
  font-size: 36px;
  font-weight: 700;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 36px;
    margin-left: 24px;
    font-size: 24px;
  }
`;

const StyledDescription = styled.div`
  margin-top: 16px;
  color: ${colors.gray100};
  font-size: 16px;
  font-weight: 500;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 12px;
    margin-left: 24px;
    font-size: 14px;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 70px;
    padding: 0 20px 48px;
  }
`;
