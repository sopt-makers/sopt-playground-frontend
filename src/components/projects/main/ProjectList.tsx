import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconPlus } from '@sopt-makers/icons';
import { Button, Chip, SearchField, SelectV2 } from '@sopt-makers/ui';
import { Flex, width100 } from '@toss/emotion-utils';
import { ImpressionArea } from '@toss/impression-area';
import { useDebounce } from '@toss/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { BooleanParam, createEnumParam, StringParam, useQueryParams, withDefault } from 'use-query-params';

import EmptyView from '@/components/common/EmptyView';
import Loading from '@/components/common/Loading';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import MobileProjectCard from '@/components/projects/main/card/MobileProjectCard';
import ProjectCard from '@/components/projects/main/card/ProjectCard';
import ProjectCategorySelect from '@/components/projects/main/ProjectCategorySelect';
import ProjectFilterChip from '@/components/projects/main/ProjectFilterChip';
import useGetProjectListQuery from '@/components/projects/upload/hooks/useGetProjectListQuery';
import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

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
    name: withDefault(StringParam, null),
    isAvailable: withDefault(BooleanParam, null),
    isFounding: withDefault(BooleanParam, null),
    category: createEnumParam<ProjectCategory>(['APPJAM', 'SOPKATHON', 'SOPTERM', 'STUDY', 'ETC']),
  });
  const [value, setValue] = useState(queryParams.name);
  const debouncedChangeName = useDebounce((value: string | null) => setQueryParams({ name: value }), 300);
  const { data, isLoading, fetchNextPage } = useGetProjectListQuery({
    limit: 20,
    name: queryParams.name,
    isAvailable: queryParams.isAvailable,
    isFounding: queryParams.isFounding,
    category: queryParams.category,
  });
  console.log(queryParams);
  const totalCount = data?.pages && data.pages[0].totalCount;

  return (
    <StyledContainer>
      <StyledContent>
        <SearchField
          value={value ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            setValue(value);
            debouncedChangeName(value === '' ? null : value);
          }}
          onSubmit={() => {
            //
          }}
          onReset={() => {
            setValue('');
            debouncedChangeName(null);
          }}
          placeholder='서비스 이름을 검색해보세요!'
        />
        {isLoading ? (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        ) : (
          <LengthWrapper>
            <StyledLength typography='SUIT_18_M'>전체 {totalCount}개</StyledLength>
            <Responsive only='desktop'>
              <Flex css={{ gap: 8 }} align='center'>
                <div onClick={() => setQueryParams({ isAvailable: !queryParams.isAvailable || null })}>
                  <Responsive only='desktop'>
                    <Chip size='md' active={queryParams.isAvailable ?? false}>
                      이용 가능한 서비스
                    </Chip>
                  </Responsive>
                  <Responsive only='mobile'>
                    <Chip size='sm' active={queryParams.isAvailable ?? false}>
                      이용 가능한 서비스
                    </Chip>
                  </Responsive>
                </div>
                <div onClick={() => setQueryParams({ isFounding: !queryParams.isFounding || null })}>
                  <Responsive only='desktop'>
                    <Chip size='md' active={queryParams.isFounding ?? false}>
                      창업 중
                    </Chip>
                  </Responsive>
                  <Responsive only='mobile'>
                    <Chip size='sm' active={queryParams.isFounding ?? false}>
                      창업 중
                    </Chip>
                  </Responsive>
                </div>
                <Responsive only='desktop'>
                  <CategorySelect
                    type='text'
                    visibleOptions={5}
                    defaultValue={PROJECT_CATEGORY_LIST.find((option) => option.value === queryParams.category)}
                    onChange={(value) => setQueryParams({ category: value as ProjectCategory })}
                  >
                    <SelectV2.Trigger>
                      <SelectV2.TriggerContent placeholder={'프로젝트 종류'} />
                    </SelectV2.Trigger>
                    <SelectV2.Menu>
                      {PROJECT_CATEGORY_LIST.map((option) => (
                        <SelectV2.MenuItem key={option.value} option={option} className='menu' />
                      ))}
                    </SelectV2.Menu>
                  </CategorySelect>
                </Responsive>
                {/* <ProjectCategorySelect
                  css={{ marginLeft: 10 }}
                  placeholder='프로젝트 종류'
                  allowClear
                  onClear={() => setQueryParams({ category: null })}
                  value={queryParams.category ?? undefined}
                  onValueChange={(value) => setQueryParams({ category: value as ProjectCategory })}
                >
                  {PROJECT_CATEGORY_LIST.map(({ label, value }) => (
                    <ProjectCategorySelect.Item key={value} value={value}>
                      {label}
                    </ProjectCategorySelect.Item>
                  ))}
                </ProjectCategorySelect> */}
              </Flex>
            </Responsive>
            <Responsive only='mobile' css={width100}>
              <Flex css={{ marginTop: 4.5, padding: '8px 0' }} justify='space-between' align='center'>
                <Flex css={{ gap: 6 }}>
                  <ProjectFilterChip
                    size='small'
                    checked={queryParams.isAvailable ?? false}
                    onCheckedChange={(checked) => setQueryParams({ isAvailable: checked })}
                  >
                    이용 가능한 서비스
                  </ProjectFilterChip>
                  <ProjectFilterChip
                    size='small'
                    checked={queryParams.isFounding ?? false}
                    onCheckedChange={(checked) => setQueryParams({ isFounding: checked })}
                  >
                    창업 중
                  </ProjectFilterChip>
                </Flex>
                <ProjectCategorySelect
                  placeholder='프로젝트 전체'
                  size='small'
                  allowClear
                  onClear={() => setQueryParams({ category: null })}
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
        )}

        {totalCount === 0 ? (
          <EmptyView />
        ) : (
          <StyledGridContainer>
            {data?.pages.map((page) =>
              page.projectList.map((project, index) => {
                const memberList = project.members.map((member) => ({
                  id: member.memberId,
                  profileImage: member.memberProfileImage,
                }));
                return (
                  <React.Fragment key={project.id}>
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
                  </React.Fragment>
                );
              }),
            )}
            <ImpressionArea onImpressionStart={fetchNextPage} />
          </StyledGridContainer>
        )}
      </StyledContent>
      <ProjectUploadButton href={playgroundLink.projectUpload()}>
        <Responsive only='desktop'>
          <Button size='lg' LeftIcon={IconPlus}>
            프로젝트 올리기
          </Button>
        </Responsive>
        <Responsive only='mobile'>
          <Button size='md' LeftIcon={IconPlus}>
            프로젝트 올리기
          </Button>
        </Responsive>
      </ProjectUploadButton>
    </StyledContainer>
  );
};

export default ProjectList;

const CategorySelect = styled(SelectV2.Root)`
  margin-left: 8px;

  > button > div > p {
    min-width: max-content;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CONTAINER_MAX_WIDTH = 1480;

const StyledContent = styled.div`
  justify-self: flex-start;
  margin: 64px 0;
  padding: 0 24px;
  min-width: ${CONTAINER_MAX_WIDTH}px;

  @media screen and (max-width: ${CONTAINER_MAX_WIDTH}px) {
    min-width: calc(352px * 3 + 15px * 2);
  }

  @media screen and (max-width: 1120px) {
    min-width: calc(352px * 2 + 15px * 1);
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 12px;
    margin: 0;
    padding: 12px 10px;
    width: 100%;
    min-width: 352px;
  }
`;

const ProjectUploadButton = styled(Link)`
  display: flex;
  position: fixed;
  right: 100px;
  bottom: 80px;

  @media ${MOBILE_MEDIA_QUERY} {
    right: 20px;
    bottom: 42px;
  }
`;

const LengthWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
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
  margin-top: 22px;
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
    gap: 0;
    justify-content: start;
    margin-top: 0;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 290px 0;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 170px 0;
    padding-bottom: 100px;
  }
`;
