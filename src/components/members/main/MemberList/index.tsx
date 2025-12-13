import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconSwitchVertical } from '@sopt-makers/icons';
import { SearchField } from '@sopt-makers/ui';
import { debounce, uniq } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FC, ReactNode, useEffect, useMemo, useState } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { Profile } from '@/api/endpoint_LEGACY/members/type';
import BottomSheetSelect from '@/components/coffeechat/upload/CoffeechatForm/BottomSheetSelect';
import EmptyView from '@/components/common/EmptyView';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import MessageModal, { MessageCategory } from '@/components/members/detail/MessageSection/MessageModal';
import { DESKTOP_ONE_MEDIA_QUERY, DESKTOP_TWO_MEDIA_QUERY } from '@/components/members/main/contants';
import { useMemberProfileQuery } from '@/components/members/main/hooks/useMemberProfileQuery';
import MemberCard from '@/components/members/main/MemberCard';
import {
  EMPLOYED_OPTIONS,
  FILTER_DEFAULT_OPTION,
  GENERATION_DEFAULT_OPTION,
  GENERATION_OPTIONS,
  MBTI_OPTIONS,
  Option,
  ORDER_OPTIONS,
  PART_DEFAULT_OPTION,
  PART_OPTIONS,
  TEAM_OPTIONS,
  TEAM_VALUE,
} from '@/components/members/main/MemberList/filters/constants';
import MemberListFilter from '@/components/members/main/MemberList/filters/MemberListFilter';
import { MemberListOrder } from '@/components/members/main/MemberList/filters/MemberListOrder';
import WorkPreferenceMatchedMemberList from '@/components/members/main/MemberList/WorkPreferenceMatchedMemberList';
import { LATEST_GENERATION } from '@/constants/generation';
import { playgroundLink } from '@/constants/links';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { usePageQueryParams } from '@/hooks/usePageQueryParams';
import { useRunOnce } from '@/hooks/useRunOnce';
import IconDiagonalArrow from '@/public/icons/icon-diagonal-arrow.svg';
import { MB_BIG_MEDIA_QUERY } from '@/styles/mediaQuery';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const PAGE_LIMIT = 24;

interface MemberListProps {
  banner: ReactNode;
}

export type MessageModalState =
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
  const [generation, setGeneration] = useState<Option | null | undefined>(null);
  const [part, setPart] = useState<Option | null | undefined>(null);
  const [employed, setEmployed] = useState<Option | null | undefined>(null);
  const [team, setTeam] = useState<Option | null | undefined>(null);
  const [mbti, setMbti] = useState<Option | null | undefined>(null);
  const [orderBy, setOrderBy] = useState<Option>(ORDER_OPTIONS[0]);
  const [search, setSearch] = useState<string | undefined>('');
  const [messageModalState, setMessageModalState] = useState<MessageModalState>({ show: false });
  const [isHydrated, setIsHydrated] = useState(false);

  const router = useRouter();
  const { logClickEvent, logSubmitEvent, logPageViewEvent } = useEventLogger();
  const { ref, isVisible } = useIntersectionObserver();
  const {
    data: memberProfileData,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useMemberProfileQuery({
    limit: PAGE_LIMIT,
    queryKey: [router.query],
  });
  const { addQueryParamsToUrl } = usePageQueryParams({
    skipNull: true,
  });
  const { data: memberOfMeData } = useGetMemberOfMe();

  const isEmpty = memberProfileData?.pages[0].members.length === 0;
  const canViewWorkPreference = memberOfMeData?.generation === LATEST_GENERATION;
  const profiles = useMemo(
    () =>
      memberProfileData?.pages.map((page) =>
        page.members.map((member) => ({
          ...member,
          activities: member.activities || [],
          isActive: (member.activities || []).map(({ generation }) => generation).includes(LATEST_GENERATION),
          part: uniq((member.activities || []).map(({ part }) => part)).join(' / '),
        })),
      ),
    [memberProfileData],
  );

  useRunOnce(() => {
    logPageViewEvent('memberPageList');
  }, []);

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible, fetchNextPage]);

  useEffect(() => {
    if (router.isReady) {
      const { generation, filter, search, employed, team, mbti, orderBy } = router.query;
      if (typeof generation === 'string' || generation === undefined || null) {
        const generationOption = GENERATION_OPTIONS.find((option) => option.value === generation);
        setGeneration(generationOption as Option);
      }
      if (typeof filter === 'string' || filter === undefined || null) {
        const filterOption = PART_OPTIONS.find((option) => option.value === filter);
        setPart(filterOption as Option);
      }
      if (typeof search === 'string') {
        setSearch(search);
      }
      if (typeof team === 'string' || team === undefined || null) {
        const teamOption = TEAM_OPTIONS.find((option) => option.value === team);
        setTeam(teamOption);
      }
      if (typeof mbti === 'string' || mbti === undefined || null) {
        const mbtiOption = MBTI_OPTIONS.find((option) => option.value === mbti);
        setMbti(mbtiOption);
      }
      if (typeof employed === 'string' || employed === undefined || null) {
        const employedOption = EMPLOYED_OPTIONS.find((option) => option.value === employed);
        setEmployed(employedOption as Option);
      }
      if (typeof orderBy === 'string') {
        const orderByOption = ORDER_OPTIONS.find((option) => option.value === orderBy);
        setOrderBy(orderByOption as Option);
      }
    }
  }, [router.isReady, router.query, router]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    if (value === '') {
      addQueryParamsToUrl({ search: undefined });
    }
  };

  const handleSearchReset = () => {
    setSearch('');
    addQueryParamsToUrl({ search: '' });
  };

  const createTypeSafeHandler =
    <T extends string>(handler: (value: T) => void) =>
    (value: string | number | boolean) => {
      if (typeof value === 'string') {
        handler(value as T);
      }
    };

  const handleSelectPart = createTypeSafeHandler<string>((filter: string) => {
    addQueryParamsToUrl({ filter });
    logClickEvent('filterPart', { part: filter || 'all' });
  });

  const handleSelectGeneration = createTypeSafeHandler<string>((generation: string) => {
    addQueryParamsToUrl({ generation });
    logClickEvent('filterGeneration', { generation: generation || 'all' });
  });

  type TeamKey = keyof typeof TEAM_VALUE;
  const handleSelectTeam = createTypeSafeHandler<TeamKey>((team: TeamKey) => {
    const teamValue = TEAM_VALUE[team];
    addQueryParamsToUrl({ team: teamValue });
    logClickEvent('filterTeam', { team: team || 'all' });
  });

  const handleSelectMbti = createTypeSafeHandler<string>((mbti: string) => {
    addQueryParamsToUrl({ mbti });
    logClickEvent('filterMbti', { mbti: mbti || 'all' });
  });

  const handleSelectEmployed = createTypeSafeHandler<string>((employed: string) => {
    addQueryParamsToUrl({ employed });
    logClickEvent('filterEmployed', { employed: employed || 'all' });
  });

  const handleSelectOrderBy = createTypeSafeHandler<string>((orderBy: string) => {
    addQueryParamsToUrl({ orderBy: orderBy === '0' ? undefined : orderBy });
    logClickEvent('filterOrderBy', { orderBy });
  });

  const handleSearchSubmit = debounce((searchQuery: string) => {
    addQueryParamsToUrl({ search: searchQuery });
    logSubmitEvent('searchMember', { content: searchQuery });

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, 0);

  const handleClickCard = (profile: Profile) => {
    logClickEvent('memberCard', { id: profile.id, name: profile.name });
  };

  return (
    <>
      {isHydrated && (
        <StyledContainer>
          <div
            css={css`
              padding: 0 20px;
              width: 100%;
            `}
          >
            <Responsive only='mobile'>{banner}</Responsive>

            <Responsive only='mobile' css={{ marginTop: '20px' }}>
              <StyledMemberSearch
                placeholder='이름, 학교, 회사를 검색해보세요!'
                value={search || ''}
                onChange={handleSearchChange}
                onSubmit={() => handleSearchSubmit(search as string)}
                onReset={handleSearchReset}
              />

              <BannerWrapper>
                <Banner
                  src={'/icons/img/banner_TL_list_tablet.png'}
                  alt='TL List Link'
                  onClick={() => router.push(playgroundLink.teamLeaderList())}
                />
                <OnlyMobileBanner
                  src={'/icons/img/banner_TL_list_mobile.png'}
                  alt='TL List Link'
                  onClick={() => router.push(playgroundLink.teamLeaderList())}
                />
              </BannerWrapper>

              {canViewWorkPreference && (
                <Responsive only='mobile'>
                  <WorkPreferenceMatchedMemberList />
                </Responsive>
              )}
              <StyledMobileFilterWrapper>
                <BottomSheetSelect
                  options={GENERATION_OPTIONS}
                  defaultOption={GENERATION_DEFAULT_OPTION}
                  value={generation?.value}
                  placeholder='기수'
                  onChange={handleSelectGeneration}
                />
                <BottomSheetSelect
                  options={PART_OPTIONS}
                  defaultOption={PART_DEFAULT_OPTION}
                  value={part?.value}
                  placeholder='파트'
                  onChange={handleSelectPart}
                />
                <BottomSheetSelect
                  options={TEAM_OPTIONS}
                  defaultOption={FILTER_DEFAULT_OPTION}
                  value={team?.value}
                  placeholder='활동'
                  onChange={handleSelectTeam}
                />
                <BottomSheetSelect
                  options={MBTI_OPTIONS}
                  defaultOption={FILTER_DEFAULT_OPTION}
                  value={mbti?.value}
                  placeholder='MBTI'
                  onChange={handleSelectMbti}
                />
                <BottomSheetSelect
                  options={EMPLOYED_OPTIONS}
                  defaultOption={FILTER_DEFAULT_OPTION}
                  value={employed?.value}
                  placeholder='재직 상태'
                  onChange={handleSelectEmployed}
                />
              </StyledMobileFilterWrapper>
              {isLoading && (
                <div
                  css={css`
                    margin-top: 30px;
                    height: 48px;
                  `}
                ></div>
              )}
              {memberProfileData && (
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 20px;
                    height: 48px;
                  `}
                >
                  <Text typography='SUIT_14_M'>{`전체 ${memberProfileData.pages[0].totalMembersCount}명`}</Text>
                  <StyledBottomSheetSelect
                    options={ORDER_OPTIONS}
                    value={orderBy.value}
                    placeholder=''
                    onChange={handleSelectOrderBy}
                    icon={<StyledSwitchVertical />}
                  />
                </div>
              )}
            </Responsive>
          </div>
          <Responsive asChild only='desktop'>
            <BannerWrapper>
              <Banner
                src={'/icons/img/banner_TL_list_desktop.png'}
                alt='TL List Link'
                onClick={() => router.push(playgroundLink.teamLeaderList())}
              />
            </BannerWrapper>
          </Responsive>
          <StyledMain>
            {canViewWorkPreference && (
              <Responsive only='desktop'>
                <WorkPreferenceMatchedMemberList />
              </Responsive>
            )}
            {banner && (
              <Responsive
                only='desktop'
                css={css`
                  margin-top: 64px;
                  width: 100%;
                `}
              >
                {banner}
              </Responsive>
            )}

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
                        onChange={handleSelectGeneration}
                        value={generation ?? undefined}
                        onDefaultClick={() => setGeneration(undefined)}
                      />
                      <MemberListFilter
                        placeholder='파트'
                        onChange={handleSelectPart}
                        defaultOption={PART_DEFAULT_OPTION}
                        options={PART_OPTIONS}
                        value={part ?? undefined}
                        onDefaultClick={() => setPart(undefined)}
                      />
                      <MemberListFilter
                        placeholder='활동'
                        options={TEAM_OPTIONS}
                        onChange={handleSelectTeam}
                        defaultOption={FILTER_DEFAULT_OPTION}
                        value={team ?? undefined}
                        onDefaultClick={() => setTeam(undefined)}
                      >
                        <Link href={playgroundLink.makers()}>
                          <div>
                            <StyledMakersLink typography='SUIT_16_M'>
                              메이커스
                              <IconDiagonalArrow />
                            </StyledMakersLink>
                          </div>
                        </Link>
                      </MemberListFilter>
                      <MemberListFilter
                        placeholder='MBTI'
                        defaultOption={FILTER_DEFAULT_OPTION}
                        options={MBTI_OPTIONS}
                        onChange={handleSelectMbti}
                        value={mbti ?? undefined}
                        onDefaultClick={() => setMbti(undefined)}
                      />
                      <MemberListFilter
                        placeholder='재직 상태'
                        defaultOption={FILTER_DEFAULT_OPTION}
                        options={EMPLOYED_OPTIONS}
                        onChange={handleSelectEmployed}
                        value={employed ?? undefined}
                        onDefaultClick={() => setEmployed(undefined)}
                      />
                    </StyledFilterWrapper>
                    <StyledMemberSearch
                      placeholder='이름, 학교, 회사를 검색해보세요!'
                      value={search || ''}
                      onChange={handleSearchChange}
                      onSubmit={() => handleSearchSubmit(search as string)}
                      onReset={handleSearchReset}
                    />
                  </div>
                  {isLoading && (
                    <div
                      css={css`
                        margin-top: 30px;
                        height: 48px;
                      `}
                    ></div>
                  )}
                  {memberProfileData && (
                    <div
                      css={css`
                        display: flex;
                        grid-area: 'orderBy';
                        align-items: center;
                        justify-content: space-between;
                        order: 3;
                        margin-top: 30px;
                      `}
                    >
                      <Text typography='SUIT_18_M'>{`전체 ${memberProfileData.pages[0].totalMembersCount}명`}</Text>
                      <MemberListOrder value={orderBy} options={ORDER_OPTIONS} onChange={handleSelectOrderBy} />
                    </div>
                  )}
                </StyledTopWrapper>
              </Responsive>
              {isEmpty && <EmptyView />}
              <StyledCardWrapper>
                {isLoading
                  ? Array.from({ length: PAGE_LIMIT }).map((_, idx) => (
                      <MemberCard
                        key={idx}
                        memberId={0}
                        name={''}
                        belongs={''}
                        intro={''}
                        badges={[]}
                        isCoffeeChatActivate={false}
                        isLoading={isLoading}
                      />
                    ))
                  : profiles?.map((profileList, index) => (
                      <React.Fragment key={index}>
                        {profileList.map((profile) => {
                          const sorted = profile.activities.sort((a, b) => b.generation - a.generation);
                          const badges = sorted
                            .filter((activity) => activity.generation && activity.part)
                            .map((activity) => ({
                              content: `${activity.generation}기 ${activity.part}`,
                              isActive: activity.generation === LATEST_GENERATION,
                            }));

                          const belongs =
                            profile.careers.find((career) => career.isCurrent)?.companyName ?? profile.university;

                          return (
                            <StyledLink
                              key={profile.id}
                              href={playgroundLink.memberDetail(profile.id)}
                              onClick={() => handleClickCard(profile)}
                            >
                              <MemberCard
                                memberId={profile.id}
                                name={profile.name}
                                belongs={belongs}
                                badges={badges}
                                intro={profile.introduction}
                                imageUrl={profile.profileImage}
                                isCoffeeChatActivate={profile.isCoffeeChatActivate}
                                email={profile.email}
                                onMessage={(e) => {
                                  e.preventDefault();
                                  logClickEvent('messageBadge');
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
                            </StyledLink>
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
              defaultCategory={MessageCategory.NETWORK}
              onLog={(options) =>
                logSubmitEvent('sendMessage', {
                  category: options?.category?.toString() ?? '',
                  receiverId: +messageModalState.data.targetId,
                  referral: 'memberList',
                })
              }
            />
          )}
          {isFetchingNextPage && (
            <StyledMain>
              <StyledRightWrapper>
                <StyledCardWrapper>
                  {Array.from({ length: PAGE_LIMIT }).map((_, idx) => (
                    <MemberCard
                      key={idx}
                      memberId={0}
                      name={''}
                      belongs={''}
                      intro={''}
                      badges={[]}
                      isCoffeeChatActivate={false}
                      isLoading={isFetchingNextPage}
                    />
                  ))}
                </StyledCardWrapper>
              </StyledRightWrapper>
            </StyledMain>
          )}
        </StyledContainer>
      )}
    </>
  );
};

export default MemberList;

const Banner = styled.img`
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 10px;
  }
  @media ${MB_BIG_MEDIA_QUERY} {
    display: none;
  }
`;

const OnlyMobileBanner = styled(Banner)`
  display: none;
  @media ${MB_BIG_MEDIA_QUERY} {
    display: block;
  }
`;
const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 168px;
  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 20px;
    border-radius: 10px;
    height: 192px;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 0;
  }
`;

const StyledMain = styled.main`
  display: flex;
  position: relative;
  flex: 1;
  flex-direction: column;
  column-gap: 30px;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0 20px;
    width: 100%;
  }
`;

const StyledRightWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 68px;
  width: 100%;
`;

const StyledTopWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledFilterWrapper = styled.div`
  display: flex;
  column-gap: 10px;

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    display: flex;
    grid-area: 'filter';
    gap: 10px;
    align-items: center;
    order: 2;
    margin-top: 17px;
  }
`;

const StyledMakersLink = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: color 0.2s background-color 0.2s;
  outline: none;
  border-radius: 6px;
  padding: 8px 12px;

  &:hover {
    background-color: ${colors.gray700};
  }
`;

const StyledMemberSearch = styled(SearchField)`
  border-radius: 10px;
  background-color: ${colors.gray800};
  padding-left: 16px;
  min-width: 335px;
  height: 48px;

  & > input {
    width: 100%;
    height: 100%;
  }

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    grid-area: 'search';
    order: 1;
    max-width: 100%;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    order: none;
    width: 100%;
  }
`;

const StyledCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(10px, 310px));
  gap: 24px;
  align-items: center;
  justify-items: stretch;
  margin-top: 28px;

  @media ${DESKTOP_ONE_MEDIA_QUERY} {
    grid-template-columns: repeat(3, minmax(10px, 310px));
  }

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    grid-template-columns: repeat(2, minmax(10px, 310px));
  }

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: repeat(1, 1fr);
    gap: 0 8px;
    justify-items: stretch;
    margin-top: 0;

    & > div {
      width: 100%;
    }
  }
`;

const HLine = styled.hr`
  position: absolute;
  bottom: 0;
  left: -20px;
  margin: 0;
  border: 0;
  border-bottom: 1px solid ${colors.gray800};
  padding: 0;
  width: 100dvw;
`;

const Target = styled.div`
  width: 100%;
  height: 0;
`;

const StyledLink = styled(Link)`
  position: relative;
`;

const StyledMobileFilterWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
  margin-right: -20px;
  padding-right: 20px;
  overflow-x: auto;

  /* to disable scroll bar */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  & > div {
    flex-shrink: 0;
  }
`;

const StyledSwitchVertical = styled(IconSwitchVertical)`
  width: 20px;
  height: 20px;
  color: ${colors.gray300};
`;

const StyledBottomSheetSelect = styled(BottomSheetSelect)`
  background-color: transparent;
  color: ${colors.gray300};
`;
