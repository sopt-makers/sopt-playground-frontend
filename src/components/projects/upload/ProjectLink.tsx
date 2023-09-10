import styled from '@emotion/styled';
import { FC } from 'react';

import FormTitle from '@/components/projects/upload/FormTitle';
import LinkForm from '@/components/projects/upload/LinkForm';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const ProjectLink: FC = () => {
  return (
    <StyledContainer>
      <FormTitle>링크</FormTitle>
      <StyledDescriptionWrapper>
        <StyledDescription>
          웹사이트, 구글 플레이스토어, 앱스토어, Github, 발표영상, 관련자료, instagram 등을 자유롭게 업로드해주세요
        </StyledDescription>
        <MobileDescription>관련 자료를 자유롭게 업로드해주세요</MobileDescription>
      </StyledDescriptionWrapper>
      <LinkForm />
    </StyledContainer>
  );
};

export default ProjectLink;

const StyledContainer = styled.section`
  margin: 60px 0 0;
`;

const StyledDescriptionWrapper = styled.div`
  margin: 12px 0 18px;
  color: ${colors.gray100};
  ${textStyles.SUIT_14_M};
`;

const StyledDescription = styled.span`
  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const MobileDescription = styled.span`
  display: none;
  @media ${MOBILE_MEDIA_QUERY} {
    display: block;
  }
`;
