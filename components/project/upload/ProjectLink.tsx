import Text from '@/components/common/Text';
import FormTitle from '@/components/project/upload/FormTitle';
import LinkForm from '@/components/project/upload/LinkForm';
import useScreenSize from '@/hooks/useScreenSize';
import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import { FC } from 'react';

const ProjectLink: FC = () => {
  const { isMobile } = useScreenSize();
  return (
    <StyledContainer>
      <FormTitle>링크</FormTitle>
      <StyledDescription color={colors.gray100}>
        {!isMobile
          ? '웹사이트, 구글 플레이스토어, 앱스토어, Github, 발표영상, 관련자료, instagram 등을 자유롭게 업로드해주세요'
          : '관련 자료를 자유롭게 업로드해주세요'}
      </StyledDescription>
      <LinkForm />
    </StyledContainer>
  );
};

export default ProjectLink;

const StyledContainer = styled.section`
  margin: 60px 0 0;
`;

const StyledDescription = styled(Text)`
  display: block;
  margin: 12px 0 18px;
  color: ${colors.gray100};
`;
