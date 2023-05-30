import styled from '@emotion/styled';
import { uniqBy as _uniqBy } from 'lodash-es';
import Link from 'next/link';

import Text from '@/components/common/Text';
import ProjectCard from '@/components/projects/main/ProjectCard';
import useGetProjectListQuery from '@/components/projects/upload/hooks/useGetProjectListQuery';
import { playgroundLink } from '@/constants/links';
import IconPlusWhite from '@/public/icons/icon-plus-white.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const ProjectList = () => {
  const { data: projects, isLoading } = useGetProjectListQuery();

  // 최신순
  const sortedProjects = projects && [...projects].sort((a, b) => b.id - a.id);

  const uniqueProjects =
    sortedProjects &&
    sortedProjects.filter((project, index) => {
      const latestProjectIndex = sortedProjects.findIndex(({ name }) => name === project.name);
      return latestProjectIndex === index;
    });

  return (
    <StyledContainer>
      <StyledContent>
        <TopWrapper>
          <Text as='h1' typography='SUIT_32_B'>
            ✨ 솝트에서 진행된 프로젝트 둘러보기
          </Text>
          <ProjectUploadButton href={playgroundLink.projectUpload()}>
            <IconPlusWhite />
            <Text typography='SUIT_18_B'>내 프로젝트 올리기</Text>
          </ProjectUploadButton>
        </TopWrapper>
        {uniqueProjects && <StyledLength typography='SUIT_18_M'>{uniqueProjects.length}개의 프로젝트</StyledLength>}
        {!isLoading && uniqueProjects == null ? (
          <StyledNoData>현재 등록된 프로젝트가 없습니다.</StyledNoData>
        ) : (
          <StyledGridContainer>
            {uniqueProjects?.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                // FIXME: 서버쪽에서 link가 중복으로 내려오는 이슈가 있어 임시처리합니다.
                links={_uniqBy(project.links, 'linkId')}
              />
            ))}
          </StyledGridContainer>
        )}
      </StyledContent>
    </StyledContainer>
  );
};

export default ProjectList;

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
  margin: 64px 0;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0;
  }
`;

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProjectUploadButton = styled(Link)`
  display: flex;
  gap: 12px;
  align-items: center;
  border-radius: 10px;
  background-color: ${colors.purple100};
  padding: 18px 24px 18px 20px;
`;

const StyledLength = styled(Text)`
  display: block;
  margin-top: 48px;

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

const StyledNoData = styled.div`
  margin-top: 120px;
  color: ${colors.gray60};
  ${textStyles.SUIT_16_M}
  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M}
  }
`;
