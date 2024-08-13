import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Flex, width100 } from '@toss/emotion-utils';
import { ImpressionArea } from '@toss/impression-area';
import { useDebounce } from '@toss/react';
import { uniqBy as _uniqBy } from 'lodash-es';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BooleanParam, createEnumParam, StringParam, useQueryParams, withDefault } from 'use-query-params';

import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import MobileProjectCard from '@/components/projects/main/card/MobileProjectCard';
import ProjectCard from '@/components/projects/main/card/ProjectCard';
import ProjectCategorySelect from '@/components/projects/main/ProjectCategorySelect';
import ProjectFilterChip from '@/components/projects/main/ProjectFilterChip';
import ProjectSearch from '@/components/projects/main/ProjectSearch';
import useGetProjectListQuery from '@/components/projects/upload/hooks/useGetProjectListQuery';
import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

type ProjectCategory = 'APPJAM' | 'SOPKATHON' | 'SOPTERM' | 'STUDY' | 'ETC';

const PROJECT_CATEGORY_LIST: Array<{ value: ProjectCategory; label: string }> = [
  { value: 'APPJAM', label: '앱잼' },
  { value: 'SOPKATHON', label: '솝커톤' },
  { value: 'SOPTERM', label: '솝텀 프로젝트' },
  { value: 'STUDY', label: '스터디' },
  { value: 'ETC', label: '사이드 프로젝트' },
];

const ProjectList = () => {
  const [queryParams, setQueryParams] = useQueryParams({
    name: withDefault(StringParam, undefined),
    isAvailable: withDefault(BooleanParam, undefined),
    isFounding: withDefault(BooleanParam, undefined),
    category: createEnumParam<ProjectCategory>(['APPJAM', 'SOPKATHON', 'SOPTERM', 'STUDY', 'ETC']),
  });
  const [value, setValue] = useState(queryParams.name);
  const [totalCount, setTotalCount] = useState<number>();
  const debouncedChangeName = useDebounce((value: string | undefined) => setQueryParams({ name: value }), 300);
  const { data, fetchNextPage } = useGetProjectListQuery({
    limit: 20,
    name: queryParams.name,
    isAvailable: queryParams.isAvailable,
    isFounding: queryParams.isFounding,
    category: queryParams.category ?? undefined,
  });

  const isEmpty = data?.pages[0].totalCount === 0;

  useEffect(() => {
    if (data?.pages) {
      const newTotalCount = data.pages[0].totalCount;
      setTotalCount(newTotalCount);
    }
  }, [data]);

  return (
    <StyledContainer>
      <StyledContent>
        <ProjectSearch
          value={value ?? queryParams.name}
          onValueChange={(value) => {
            setValue(value);
            debouncedChangeName(value || undefined);
          }}
          placeholder='프로젝트 검색'
        />
        <LengthWrapper>
          <StyledLength typography='SUIT_18_M'>전체 {totalCount}개</StyledLength>
          <Responsive only='desktop'>
            <Flex css={{ gap: 6 }} align='center'>
              <ProjectFilterChip
                checked={queryParams.isAvailable ?? false}
                onCheckedChange={(checked) => setQueryParams({ isAvailable: checked || undefined })}
              >
                이용 가능한 서비스
              </ProjectFilterChip>
              <ProjectFilterChip
                checked={queryParams.isFounding ?? false}
                onCheckedChange={(checked) => setQueryParams({ isFounding: checked || undefined })}
              >
                창업 중
              </ProjectFilterChip>
              <ProjectCategorySelect
                css={{ marginLeft: 10 }}
                placeholder='프로젝트 전체'
                allowClear
                onClear={() => setQueryParams({ category: undefined })}
                value={queryParams.category ?? undefined}
                onValueChange={(value) => setQueryParams({ category: value as ProjectCategory })}
              >
                {PROJECT_CATEGORY_LIST.map(({ label, value }) => (
                  <ProjectCategorySelect.Item key={value} value={value}>
                    {label}
                  </ProjectCategorySelect.Item>
                ))}
              </ProjectCategorySelect>
            </Flex>
          </Responsive>
          <Responsive only='mobile' css={width100}>
            <Flex css={{ marginTop: 4.5, padding: '8px 0' }} justify='space-between' align='center'>
              <Flex css={{ gap: 6 }}>
                <ProjectFilterChip
                  size='small'
                  checked={queryParams.isAvailable ?? false}
                  onCheckedChange={(checked) => setQueryParams({ isAvailable: checked || undefined })}
                >
                  이용 가능한 서비스
                </ProjectFilterChip>
                <ProjectFilterChip
                  size='small'
                  checked={queryParams.isFounding ?? false}
                  onCheckedChange={(checked) => setQueryParams({ isFounding: checked || undefined })}
                >
                  창업 중
                </ProjectFilterChip>
              </Flex>
              <ProjectCategorySelect
                placeholder='프로젝트 전체'
                size='small'
                allowClear
                onClear={() => setQueryParams({ category: undefined })}
                value={queryParams.category ?? undefined}
                onValueChange={(value) => setQueryParams({ category: value as ProjectCategory })}
              >
                {PROJECT_CATEGORY_LIST.map(({ label, value }) => (
                  <ProjectCategorySelect.Item key={value} value={value}>
                    {label}
                  </ProjectCategorySelect.Item>
                ))}
              </ProjectCategorySelect>
            </Flex>
          </Responsive>
        </LengthWrapper>
        {isEmpty ? (
          <StyledEmpty>
            <EmptyTitle>OMG... 검색 결과가 없어요.</EmptyTitle>
            <EmptyDescription>검색어를 바르게 입력했는지 확인하거나, 필터를 변경해보세요.</EmptyDescription>
          </StyledEmpty>
        ) : (
          <StyledGridContainer>
            {data?.pages.map((page) =>
              page.projectList.map((project, index) => {
                const memberList = project.members.map((member) => ({
                  id: member.memberId,
                  profileImage: member.memberProfileImage,
                }));
                return (
                  <>
                    <Responsive only='desktop' asChild>
                      <Link href={playgroundLink.projectDetail(project.id)}>
                        <ProjectCard
                          key={project.id}
                          image={project.thumbnailImage}
                          title={project.name}
                          serviceType={project.serviceType}
                          summary={project.summary}
                          memberList={memberList}
                          isAvailable={project.isAvailable}
                          isFounding={project.isFounding}
                        />
                      </Link>
                    </Responsive>
                    <Responsive only='mobile' asChild>
                      <Link href={playgroundLink.projectDetail(project.id)}>
                        <MobileProjectCard
                          key={project.id}
                          logoImage={project.logoImage}
                          title={project.name}
                          serviceType={project.serviceType}
                          summary={project.summary}
                          memberList={memberList}
                          isAvailable={project.isAvailable}
                          isFounding={project.isFounding}
                        />
                        <div css={{ width: '100%', height: '1px', background: colors.gray700 }} />
                      </Link>
                    </Responsive>
                  </>
                );
              }),
            )}
            <ImpressionArea onImpressionStart={fetchNextPage} />
          </StyledGridContainer>
        )}
      </StyledContent>
      <ProjectUploadButton href={playgroundLink.projectUpload()}>
        <PlusIcon />
        프로젝트 올리기
      </ProjectUploadButton>
    </StyledContainer>
  );
};

export default ProjectList;

const CONTAINER_MAX_WIDTH = 1480;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin: 64px 0;
  min-width: ${CONTAINER_MAX_WIDTH}px;
  min-height: 100vh;

  @media screen and (max-width: ${CONTAINER_MAX_WIDTH}px) {
    min-width: 1086px;
  }

  @media screen and (max-width: 1120px) {
    min-width: 719px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 0;
    margin: 0;
    padding: 12px 10px;
    width: 100%;
    min-width: 0;
  }
`;

const ProjectUploadButton = styled(Link)`
  display: flex;
  position: fixed;
  right: 60px;
  bottom: 80px;
  gap: 8px;
  align-items: center;
  border-radius: 18px;
  background-color: ${colors.gray10};
  padding: 14px 30px 14px 27px;
  color: ${colors.gray950};
  ${fonts.TITLE_20_SB};

  &:hover {
    background-color: ${colors.gray50};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    right: 16px;
    bottom: 16px;
    padding: 12px;
    ${fonts.LABEL_16_SB}
  }
`;

const PlusIcon = () => (
  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M10.9208 2.58751C10.9208 2.07966 10.5091 1.66797 10.0013 1.66797C9.49345 1.66797 9.08176 2.07966 9.08176 2.58751V9.08176H2.58751C2.07966 9.08176 1.66797 9.49345 1.66797 10.0013C1.66797 10.5091 2.07966 10.9208 2.58751 10.9208H9.08176V17.4151C9.08176 17.9229 9.49345 18.3346 10.0013 18.3346C10.5091 18.3346 10.9208 17.9229 10.9208 17.4151V10.9208H17.4151C17.9229 10.9208 18.3346 10.5091 18.3346 10.0013C18.3346 9.49345 17.9229 9.08176 17.4151 9.08176H10.9208V2.58751Z'
      fill='#0F0F12'
    />
  </svg>
);

const LengthWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 18.5px;
  }
`;

const StyledLength = styled(Text)`
  ${fonts.BODY_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.BODY_14_M};
  }
`;

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  min-width: ${CONTAINER_MAX_WIDTH}px;

  @media screen and (max-width: ${CONTAINER_MAX_WIDTH}px) {
    grid-template-columns: repeat(3, 1fr);
    justify-content: start;
    min-width: 0;
    min-width: 790px;
  }

  @media screen and (max-width: 1120px) {
    grid-template-columns: repeat(2, 1fr);
    min-width: 0;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: 1fr;
    margin-top: 0;
    width: 100%;
  }
`;

const EmptyTitle = styled.span`
  ${textStyles.SUIT_32_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_24_B};
  }
`;

const EmptyDescription = styled.span`
  color: ${colors.gray400};
  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M}
  }
`;

const StyledEmpty = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 100%;
`;
