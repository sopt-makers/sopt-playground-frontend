import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ImpressionArea } from '@toss/impression-area';
import { uniqBy as _uniqBy } from 'lodash-es';
import Link from 'next/link';

import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import ProjectCard from '@/components/projects/main/ProjectCard';
import useGetProjectListQuery from '@/components/projects/upload/hooks/useGetProjectListQuery';
import { playgroundLink } from '@/constants/links';
import IconPen from '@/public/icons/icon-pen.svg';
import IconPlusWhite from '@/public/icons/icon-plus-black.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const ProjectList = () => {
  const {
    data: projects,
    isLoading,
    fetchNextPage,
  } = useGetProjectListQuery({
    limit: 20,
  });
  const { logClickEvent } = useEventLogger();

  return (
    <StyledContainer>
      <StyledContent>
        <TopWrapper>
          <Title as='h1' typography='SUIT_32_B'>
            ✨ 솝트에서 진행된 프로젝트 둘러보기
          </Title>
          <Responsive only='desktop'>
            <ProjectUploadButton
              href={playgroundLink.projectUpload()}
              onClick={() =>
                logClickEvent('projectUpload', {
                  referral: 'projectPage',
                })
              }
            >
              <IconPlusWhite />
              <Text typography='SUIT_18_B'>내 프로젝트 올리기</Text>
            </ProjectUploadButton>
          </Responsive>
        </TopWrapper>
        <LengthWrapper>
          {/* {uniqueProjects && <StyledLength typography='SUIT_18_M'>{uniqueProjects.length}개의 프로젝트</StyledLength>} */}
          <ProjectMobileUploadButton
            onClick={() =>
              logClickEvent('projectUpload', {
                referral: 'projectPage',
              })
            }
            href={playgroundLink.projectUpload()}
          >
            <IconPen />
          </ProjectMobileUploadButton>
        </LengthWrapper>
        {!isLoading && projects?.pages == null ? (
          <StyledNoData>현재 등록된 프로젝트가 없습니다.</StyledNoData>
        ) : (
          <StyledGridContainer>
            {projects?.pages.map((page) =>
              page.projectList.map((project) => <ProjectCard key={project.id} {...project} />),
            )}
            <ImpressionArea onImpressionStart={fetchNextPage} />
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

const Title = styled(Text)`
  ${textStyles.SUIT_32_B};

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 0 6px;
    ${textStyles.SUIT_20_B};
  }
`;

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProjectMobileUploadButton = styled(Link)`
  display: none;
  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ProjectUploadButton = styled(Link)`
  display: flex;
  gap: 12px;
  align-items: center;
  border-radius: 10px;
  background-color: ${colors.gray10};
  padding: 18px 24px 18px 20px;
  color: ${colors.gray950};

  &:hover {
    background-color: ${colors.gray50};
  }
`;

const LengthWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 48px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 30px 6px 0;
  }
`;

const StyledLength = styled(Text)`
  ${textStyles.SUIT_18_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_16_M};
  }
`;

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 64px;
  column-gap: 30px;
  margin-top: 22px;
  min-width: 1200px;

  @media screen and (max-width: 1250px) {
    grid-template-columns: repeat(2, 1fr);
    justify-content: start;
    min-width: 0;
    min-width: 790px;
  }

  @media screen and (max-width: 850px) {
    grid-template-columns: 1fr;
    min-width: 0;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    row-gap: 24px;
    column-gap: 0;
    justify-content: start;
  }
`;

const StyledNoData = styled.div`
  margin-top: 120px;
  color: ${colors.gray300};
  ${textStyles.SUIT_16_M}
  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M}
  }
`;
