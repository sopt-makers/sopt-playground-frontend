import styled from '@emotion/styled';
import ProjectCard from '@/components/project/main/ProjectCard';
import { FC } from 'react';
import useGetProjectListQuery from '@/components/project/upload/hooks/useGetProjectListQuery';
import Text from '@/components/common/Text';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const ProjectPage: FC = () => {
  const { data } = useGetProjectListQuery();

  return (
    <StyledContainer>
      <StyledContent>
        <StyledLength typography='SUIT_22_B'>{data?.projects.length} Projects</StyledLength>
        <StyledGridContainer>
          {data?.projects.map((project, index) => (
            <ProjectCard
              key={index}
              category={project.category}
              summary={project.summary}
              generation={project.generation}
              links={project.links}
              logoImage={project.logo_image}
              name={project.name}
              serviceType={project.service_type}
              thumbnailIamge={project.thumbnail_image}
            />
          ))}
        </StyledGridContainer>
      </StyledContent>
    </StyledContainer>
  );
};

export default ProjectPage;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 12px 10px;
  }
`;

const StyledContent = styled.div`
  justify-self: flex-start;
  margin: 64px 0 0;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0;
  }
`;

const StyledLength = styled(Text)`
  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 30px;
  margin-top: 22px;
  row-gap: 64px;

  @media screen and (max-width: 1250px) {
    grid-template-columns: repeat(2, 1fr);
    justify-content: start;
  }

  @media screen and (max-width: 850px) {
    grid-template-columns: 1fr;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: start;
    column-gap: 0;
    row-gap: 24px;
  }
`;
