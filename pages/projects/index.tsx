import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { FC } from 'react';

import AuthRequired from '@/components/auth/AuthRequired';
import Header from '@/components/common/Header';
import Text from '@/components/common/Text';
import ProjectCard from '@/components/projects/main/ProjectCard';
import useGetProjectListQuery from '@/components/projects/upload/hooks/useGetProjectListQuery';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const ProjectPage: FC = () => {
  const { data } = useGetProjectListQuery();
  const router = useRouter();

  return (
    <AuthRequired>
      <StyledContainer>
        <StyledContent>
          <StyledLength typography='SUIT_22_B'>{data?.projects.length} Projects</StyledLength>
          <StyledGridContainer>
            {data?.projects.map((project) => (
              <ProjectCard
                key={project.id}
                category={project.category}
                summary={project.summary}
                generation={project.generation}
                links={project.links}
                logoImage={project.logo_image}
                name={project.name}
                serviceType={project.service_type}
                thumbnailImage={project.thumbnail_image}
                onClick={() => router.push(`/projects/detail?projectId=${project.id}`)}
              />
            ))}
          </StyledGridContainer>
        </StyledContent>
      </StyledContainer>
    </AuthRequired>
  );
};

setLayout(ProjectPage, (page) => (
  <>
    <Header />
    {page}
  </>
));

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
