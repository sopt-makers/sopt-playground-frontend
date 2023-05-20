import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { uniq } from 'lodash-es';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react';

import { Profile } from '@/api/endpoint_LEGACY/members/type';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import OrderBySelect from '@/components/members/common/select/OrderBySelect';
import MessageModal from '@/components/members/detail/MessageSection/MessageModal';
import { useMemberProfileQuery } from '@/components/members/main/hooks/useMemberProfileQuery';
import MemberCard from '@/components/members/main/MemberCard';
import {
  FILTER_DEFAULT_OPTION,
  GENERATION_DEFAULT_OPTION,
  GENERATION_OPTIONS,
  MBTI_OPTIONS,
  ORDER_OPTIONS,
  PART_OPTIONS,
  SOJU_CAPACITY_OPTIONS,
  TEAM_OPTIONS,
} from '@/components/members/main/MemberList/filters/constants';
import MemberListFilter from '@/components/members/main/MemberList/filters/MemberListFilter';
import { useHorizontalScroll } from '@/components/members/main/MemberList/filters/useHorizontalScroll';
import MemberSearch from '@/components/members/main/MemberList/MemberSearch';
import { LATEST_GENERATION } from '@/constants/generation';
import { playgroundLink } from '@/constants/links';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { usePageQueryParams } from '@/hooks/usePageQueryParams';
import { useRunOnce } from '@/hooks/useRunOnce';
import IconArrowUpDown from '@/public/icons/icon-arrow-up-down.svg';
import IconDiagonalArrow from '@/public/icons/icon-diagonal-arrow.svg';
import IconExpand from '@/public/icons/icon-expand-less.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const PAGE_LIMIT = 30;
const DESKTOP_ONE_MEDIA_QUERY = 'screen and (max-width: 1542px)';
const DESKTOP_TWO_MEDIA_QUERY = 'screen and (max-width: 1200px)';

const MemberListFilterSheet = dynamic(() => import('./filters/MemberListFilterSheet').then((comp) => comp.default), {
  ssr: false,
});
interface MemberListProps {
  banner: ReactNode;
}

type MessageModalState =
  | {
      show: false;
    }
  | {
      show: true;
      data: {
        targetId: string;
        name: string;
        profileUrl: string;
      };
    };

const MemberList: FC<MemberListProps> = ({ banner }) => {
  const [generation, setGeneration] = useState<string | undefined>(undefined);
  const [part, setPart] = useState<string | undefined>(undefined);
  const [sojuCapacity, setSojuCapacity] = useState<string | undefined>(undefined);
  const [team, setTeam] = useState<string | undefined>(undefined);
  const [mbti, setMbti] = useState<string | undefined>(undefined);
  const [orderBy, setOrderBy] = useState<string>(ORDER_OPTIONS[0].value);

  const [name, setName] = useState<string>('');
  const [messageModalState, setMessageModalState] = useState<MessageModalState>({ show: false });
  const horizontalScrollProps = useHorizontalScroll();

  const router = useRouter();
  const { logClickEvent, logSubmitEvent, logPageViewEvent } = useEventLogger();
  const { ref, isVisible } = useIntersectionObserver();
  const { data: memberProfileData, fetchNextPage } = useMemberProfileQuery({
    limit: PAGE_LIMIT,
    queryKey: [router.query],
  });
  const { addQueryParamsToUrl } = usePageQueryParams({
    skipNull: true,
  });

  const profiles = useMemo(
    () =>
      memberProfileData?.pages.map((page) =>
        page.members.map((member) => ({
          ...member,
          isActive: member.activities.map(({ generation }) => generation).includes(LATEST_GENERATION),
          part: uniq(member.activities.map(({ part }) => part)).join(' / '),
        })),
      ),
    [memberProfileData],
  );

  useRunOnce(() => {
    logPageViewEvent('mamberPageList', {});
  }, []);

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible, fetchNextPage]);

  useEffect(() => {
    if (router.isReady) {
      const { generation, filter, name, sojuCapacity, team, mbti, orderBy } = router.query;
      if (typeof generation === 'string' || generation === undefined) {
        setGeneration(generation);
      }
      if (typeof filter === 'string' || filter === undefined) {
        setPart(filter);
      }
      if (typeof name === 'string') {
        setName(name);
      }
      if (typeof team === 'string' || team === undefined) {
        setTeam(team);
      }
      if (typeof mbti === 'string' || mbti === undefined) {
        setMbti(mbti);
      }
      if (typeof sojuCapacity === 'string' || sojuCapacity === undefined) {
        setSojuCapacity(sojuCapacity);
      }
      if (typeof orderBy === 'string') {
        setOrderBy(orderBy);
      }
    }
  }, [router.isReady, router.query, router]);

  const handleSelectPart = (filter: string) => {
    addQueryParamsToUrl({ filter });
    logClickEvent('filterPart', { part: filter });
  };
  const handleSelectGeneration = (generation: string | undefined) => {
    addQueryParamsToUrl({ generation });
    logClickEvent('filterGeneration', { generation: generation ?? 'all' });
  };
  const handleSelectTeam = (team: string) => {
    addQueryParamsToUrl({ team });
    logClickEvent('filterTeam', { team });
  };
  const handleSelectMbti = (mbti: string) => {
    addQueryParamsToUrl({ mbti });
    logClickEvent('filterMbti', { mbti });
  };
  const handleSelectSojuCapacity = (sojuCapacity: string) => {
    addQueryParamsToUrl({ sojuCapacity });
    logClickEvent('filterSojuCapacity', { sojuCapacity });
  };
  const handleSelectOrderBy = (orderBy: string) => {
    addQueryParamsToUrl({ orderBy });
    logClickEvent('filterOrderBy', { orderBy });
  };
  const handleSearch = (searchQuery: string) => {
    addQueryParamsToUrl({ name: searchQuery });
    logSubmitEvent('searchMember', { content: 'searchQuery' });
  };
  const handleClickCard = (profile: Profile) => {
    logClickEvent('memberCard', { id: profile.id, name: profile.name });
  };

  if (!memberProfileData) {
    return null;
  }

  return (
    <StyledContainer>
      {banner}
      <div
        css={css`
          padding: 0 20px;
          width: 100%;
        `}
      >
        <Responsive only='mobile'>
          <StyledMemberSearch placeholder='멤버 검색' value={name} onChange={setName} onSearch={handleSearch} />
          <StyledMobileFilterWrapper {...horizontalScrollProps}>
            <StyledMobileFilter
              value={generation}
              onChange={handleSelectGeneration}
              options={GENERATION_OPTIONS}
              defaultOption={GENERATION_DEFAULT_OPTION}
              placeholder='기수'
              trigger={(placeholder) => (
                <MobileFilterTrigger>
                  {placeholder}
                  <IconExpand />
                </MobileFilterTrigger>
              )}
            />
            <StyledMobileFilter
              placeholder='파트'
              value={part}
              onChange={handleSelectPart}
              options={PART_OPTIONS}
              trigger={(placeholder) => (
                <MobileFilterTrigger>
                  {placeholder}
                  <IconExpand />
                </MobileFilterTrigger>
              )}
            />
            <StyledMobileFilter
              options={TEAM_OPTIONS}
              value={team}
              onChange={handleSelectTeam}
              defaultOption={FILTER_DEFAULT_OPTION}
              placeholder='활동'
              trigger={(placeholder) => (
                <MobileFilterTrigger>
                  {placeholder}
                  <IconExpand />
                </MobileFilterTrigger>
              )}
            />
            <StyledMobileFilter
              placeholder='MBTI'
              defaultOption={FILTER_DEFAULT_OPTION}
              options={MBTI_OPTIONS}
              value={mbti}
              onChange={handleSelectMbti}
              trigger={(placeholder) => (
                <MobileFilterTrigger>
                  {placeholder}
                  <IconExpand />
                </MobileFilterTrigger>
              )}
            />
            <StyledMobileFilter
              placeholder='주량'
              defaultOption={FILTER_DEFAULT_OPTION}
              options={SOJU_CAPACITY_OPTIONS}
              value={sojuCapacity}
              onChange={handleSelectSojuCapacity}
              trigger={(placeholder) => (
                <MobileFilterTrigger>
                  {placeholder}
                  <IconExpand />
                </MobileFilterTrigger>
              )}
            />
          </StyledMobileFilterWrapper>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              margin-top: 30px;
            `}
          >
            <Text>{`전체 ${memberProfileData.pages[0].totalMembersCount}명`}</Text>
            <StyledMobileFilter
              placeholder=''
              options={ORDER_OPTIONS}
              value={orderBy}
              onChange={handleSelectOrderBy}
              trigger={(placeholder) => (
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                  `}
                >
                  <IconArrowUpDown />
                  <Text typography='SUIT_12_M' color={colors.gray80}>
                    {placeholder}
                  </Text>
                </div>
              )}
            />
          </div>
        </Responsive>
      </div>
      <StyledMain>
        <StyledRightWrapper>
          <Responsive only='desktop'>
            <StyledTopWrapper>
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  @media ${DESKTOP_TWO_MEDIA_QUERY} {
                    display: grid;
                    grid:
                      [row1-start] 'search' [row1-end]
                      [row2-start] 'filter' [row2-end]
                      [row3-start] 'orderBy' [row3-end]
                      / 1fr;
                  }
                `}
              >
                <StyledFilterWrapper>
                  <MemberListFilter
                    placeholder='기수'
                    defaultOption={GENERATION_DEFAULT_OPTION}
                    options={GENERATION_OPTIONS}
                    value={generation}
                    onChange={handleSelectGeneration}
                  />
                  <MemberListFilter
                    placeholder='파트'
                    value={part}
                    onChange={handleSelectPart}
                    options={PART_OPTIONS}
                  />
                  <MemberListFilter
                    placeholder='활동'
                    options={TEAM_OPTIONS}
                    value={team}
                    onChange={handleSelectTeam}
                    defaultOption={FILTER_DEFAULT_OPTION}
                  >
                    <Link href={playgroundLink.makers()}>
                      <StyledMakersLink>
                        메이커스
                        <IconDiagonalArrow />
                      </StyledMakersLink>
                    </Link>
                  </MemberListFilter>
                  <MemberListFilter
                    placeholder='MBTI'
                    defaultOption={FILTER_DEFAULT_OPTION}
                    options={MBTI_OPTIONS}
                    value={mbti}
                    onChange={handleSelectMbti}
                  />
                  <MemberListFilter
                    placeholder='주량'
                    defaultOption={FILTER_DEFAULT_OPTION}
                    options={SOJU_CAPACITY_OPTIONS}
                    value={sojuCapacity}
                    onChange={handleSelectSojuCapacity}
                  />
                </StyledFilterWrapper>
                <StyledMemberSearch placeholder='멤버 검색' value={name} onChange={setName} onSearch={handleSearch} />
              </div>
              <div
                css={css`
                  display: flex;
                  grid-area: 'orderBy';
                  justify-content: space-between;
                  order: 3;
                  margin-top: 30px;
                `}
              >
                <Text typography='SUIT_18_M'>{`전체 ${memberProfileData.pages[0].totalMembersCount}명`}</Text>
                <OrderBySelect value={orderBy} onChange={handleSelectOrderBy} options={ORDER_OPTIONS} />
              </div>
            </StyledTopWrapper>
          </Responsive>

          <StyledCardWrapper>
            {profiles?.map((profiles, index) => (
              <React.Fragment key={index}>
                {profiles.map((profile) => {
                  const sorted = [...profile.activities].sort((a, b) => b.generation - a.generation);
                  const badges = sorted.map((activity) => ({
                    content: `${activity.generation}기 ${activity.part}`,
                    isActive: activity.generation === LATEST_GENERATION,
                  }));

                  const belongs = profile.careers.find((career) => career.isCurrent)?.companyName ?? profile.university;

                  return (
                    <Link
                      key={profile.id}
                      href={playgroundLink.memberDetail(profile.id)}
                      onClick={() => handleClickCard(profile)}
                    >
                      <MemberCard
                        name={profile.name}
                        belongs={belongs}
                        badges={badges}
                        intro={profile.introduction}
                        imageUrl={profile.profileImage}
                        onMessage={(e) => {
                          e.preventDefault();
                          setMessageModalState({
                            show: true,
                            data: {
                              targetId: `${profile.id}`,
                              name: profile.name,
                              profileUrl: profile.profileImage,
                            },
                          });
                        }}
                      />
                      <Responsive only='mobile'>
                        <HLine />
                      </Responsive>
                    </Link>
                  );
                })}
              </React.Fragment>
            ))}
          </StyledCardWrapper>
        </StyledRightWrapper>
      </StyledMain>
      <Target ref={ref} />
      {messageModalState.show && (
        <MessageModal
          receiverId={messageModalState.data.targetId}
          name={messageModalState.data.name}
          profileImageUrl={messageModalState.data.profileUrl}
          onClose={() => setMessageModalState({ show: false })}
        />
      )}
    </StyledContainer>
  );
};

export default MemberList;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
  overflow-y: scroll;
`;

const StyledMain = styled.main`
  display: flex;
  position: relative;
  column-gap: 30px;
  margin-top: 90px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 0;
    padding: 0 20px;
    width: 100%;
  }
`;

const StyledRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledMobileFilterWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 17px;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

  /* to disable scroll bar */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const StyledTopWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledFilterWrapper = styled.div`
  display: flex;
  column-gap: 10px;

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    grid-area: 'filter';
    order: 2;
    margin-top: 35px;
  }
`;

const StyledMakersLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: color 0.2s background-color 0.2s;
  outline: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 5px 10px;
  color: ${colors.gray40};

  &:hover {
    outline: none;
    background-color: ${colors.black40};
    color: ${colors.white};
  }
`;

const StyledMemberSearch = styled(MemberSearch)`
  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    grid-area: 'search';
    order: 1;
    max-width: 100%;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 16px;
    width: 100%;
  }
`;

const StyledCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(auto, 303px));
  gap: 30px;
  align-items: center;
  justify-items: stretch;
  margin-top: 28px;

  @media ${DESKTOP_ONE_MEDIA_QUERY} {
    grid-template-columns: repeat(3, minmax(auto, 303px));
  }

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    grid-template-columns: repeat(2, minmax(auto, 303px));
  }

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: repeat(1, 1fr);
    gap: 0 8px;
    justify-items: stretch;

    & > div {
      width: 100%;
    }
  }
`;

const HLine = styled.hr`
  margin: 0;
  border: 0;
  border-bottom: 1px solid ${colors.black80};
  padding: 0;
`;

const Target = styled.div`
  width: 100%;
  height: 40px;
`;

const StyledMobileFilter = styled(MemberListFilterSheet)`
  flex: none;
`;

const MobileFilterTrigger = styled.button`
  display: flex;
  flex: none;
  align-items: center;
  justify-content: space-between;
  border-radius: 20.5px;
  background: ${colors.black60};
  padding: 8px 12px;
  min-width: 76px;
  height: 32px;
  color: ${colors.gray40};

  ${textStyles.SUIT_13_M};
`;
