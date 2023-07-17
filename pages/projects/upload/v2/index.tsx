import styled from '@emotion/styled';

import AuthRequired from '@/components/auth/AuthRequired';
import ProjectForm from '@/components/projects/form/ProjectForm';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const ProjectUploadPage = () => {
  return (
    <AuthRequired>
      <Container>
        <ProjectForm submitButtonContent='프로젝트 등록하기' />
      </Container>
    </AuthRequired>
  );
};

export default ProjectUploadPage;

setLayout(ProjectUploadPage, 'header');

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 98px 0;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 12px;
  }
`;
