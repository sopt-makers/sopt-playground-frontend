import styled from '@emotion/styled';

import AuthRequired from '@/components/auth/AuthRequired';
import Header from '@/components/common/Header';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

export default function MembersUploadPage() {
  return (
    <AuthRequired>
      <StyledContainer>
        <div>
          <StyledTitle>프로필 등록</StyledTitle>
          <StyledDescription>SOPT 멤버들을 위한 프로필을 등록해주세요</StyledDescription>
        </div>
      </StyledContainer>
    </AuthRequired>
  );
}

setLayout(MembersUploadPage, (page) => (
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
    /* TODO break point 잡아서 반응형으로 해주면 좋을 듯 */
    width: 790px;
  }
`;

const StyledTitle = styled.h1`
  margin-top: 142px;
  color: #fcfcfc;
  font-size: 36px;
  font-weight: 700;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 36px;
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
    font-size: 14px;
  }
`;
