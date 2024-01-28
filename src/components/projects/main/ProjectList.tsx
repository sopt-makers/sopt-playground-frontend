import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ImpressionArea } from '@toss/impression-area';
import { uniqBy as _uniqBy } from 'lodash-es';
import Link from 'next/link';

import Text from '@/components/common/Text';
import ProjectCard from '@/components/projects/main/ProjectCard';
import useGetProjectListQuery from '@/components/projects/upload/hooks/useGetProjectListQuery';
import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import ProjectSearch from '@/components/projects/main/ProjectSearch';
import { BooleanParam, StringParam, useQueryParam, useQueryParams, withDefault } from 'use-query-params';
import { useDebounce } from '@toss/react';
import { fonts } from '@sopt-makers/fonts';
import { useEffect, useState } from 'react';
import { Flex } from '@toss/emotion-utils';
import ProjectFilterChip from '@/components/projects/main/ProjectFilterChip';
import Responsive from '@/components/common/Responsive';

const ProjectList = () => {
  const [queryParams, setQueryParams] = useQueryParams({
    name: withDefault(StringParam, undefined),
    isAvailable: withDefault(BooleanParam, undefined),
    isFounding: withDefault(BooleanParam, undefined),
  });
  const [value, setValue] = useState(queryParams.name);
  const [totalCount, setTotalCount] = useState<number>();
  const debouncedChangeName = useDebounce((value: string) => setQueryParams({ name: value }), 300);
  const { data, isLoading, fetchNextPage, isFetched } = useGetProjectListQuery({
    limit: 20,
    name: queryParams.name,
    isAvailable: queryParams.isAvailable,
    isFounding: queryParams.isFounding,
  });

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
            debouncedChangeName(value);
          }}
          placeholder='프로젝트 검색'
        />
        {totalCount ? (
          <LengthWrapper>
            <StyledLength typography='SUIT_18_M'>전체 {totalCount}개</StyledLength>
            <Responsive only='desktop'>
              <Flex css={{ gap: 6 }}>
                <ProjectFilterChip
                  checked={queryParams.isAvailable ?? false}
                  onCheckedChange={(checked) => setQueryParams({ isAvailable: checked })}
                >
                  서비스 이용 중
                </ProjectFilterChip>
                <ProjectFilterChip
                  checked={queryParams.isFounding ?? false}
                  onCheckedChange={(checked) => setQueryParams({ isFounding: checked })}
                >
                  창업 중
                </ProjectFilterChip>
              </Flex>
            </Responsive>
            <Responsive only='mobile'>
              <Flex css={{ marginTop: 4.5, padding: '8px 0' }} justify='space-between'>
                <Flex css={{ gap: 6 }}>
                  <ProjectFilterChip
                    size='small'
                    checked={queryParams.isAvailable ?? false}
                    onCheckedChange={(checked) => setQueryParams({ isAvailable: checked })}
                  >
                    서비스 이용 중
                  </ProjectFilterChip>
                  <ProjectFilterChip
                    size='small'
                    checked={queryParams.isFounding ?? false}
                    onCheckedChange={(checked) => setQueryParams({ isFounding: checked })}
                  >
                    창업 중
                  </ProjectFilterChip>
                </Flex>
              </Flex>
            </Responsive>
          </LengthWrapper>
        ) : null}
        {!isLoading && data?.pages == null ? (
          <StyledNoData>현재 등록된 프로젝트가 없습니다.</StyledNoData>
        ) : (
          <StyledGridContainer>
            {data?.pages.map((page) =>
              page.projectList.map((project) => <ProjectCard key={project.id} {...project} />),
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
