import styled from '@emotion/styled';
import ProjectCard from '@/components/project/main/ProjectCard';
import IconAppstore from '@/public/icons/icon-appstore.svg';
import { FC } from 'react';
import useGetProjectListQuery from '@/components/project/upload/hooks/useGetProjectListQuery';

const ProjectPage: FC = () => {
  const { data } = useGetProjectListQuery();

  return (
    <StyledContainer>
      <StyledContent>
        <h1>Projects</h1>
        <StyledGridContainer>
          <IconAppstore />
          {/* Project Cards */}
        </StyledGridContainer>
      </StyledContent>
    </StyledContainer>
  );
};

export default ProjectPage;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StyledContent = styled.div`
  justify-self: flex-start;
  margin: 64px 0 0;
`;

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 30px;
  column-gap: 64px;
`;
