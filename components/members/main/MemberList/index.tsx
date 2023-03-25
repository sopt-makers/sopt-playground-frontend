import styled from '@emotion/styled';
import { uniq } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useMemo, useState } from 'react';

import { useGetMemberOfMe } from '@/api/hooks';
import { Profile } from '@/api/members/type';
import Responsive from '@/components/common/Responsive';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { useMemberProfileQuery } from '@/components/members/main/hooks/useMemberProfileQuery';
import MemberCard from '@/components/members/main/MemberCard';
import GenerationSelect from '@/components/members/main/MemberList/GenerationSelect';
import { MemberRoleMenu, MemberRoleSelect, menuValue } from '@/components/members/main/MemberList/MemberRoleMenu';
import MemberSearch from '@/components/members/main/MemberList/MemberSearch';
import OnBoardingBanner from '@/components/members/main/MemberList/OnBoardingBanner';
import { LATEST_GENERATION } from '@/constants/generation';
import { playgroundLink } from '@/constants/links';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { usePageQueryParams } from '@/hooks/usePageQueryParams';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const PAGE_LIMIT = 30;

const MemberList: FC = () => {
  const [generation, setGeneration] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<string>(menuValue.ALL);
  const [name, setName] = useState<string>('');

  const router = useRouter();
  const { logClickEvent, logSubmitEvent } = useEventLogger();
  const { data: memberOfMeData } = useGetMemberOfMe();
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

  const hasProfile = !!memberOfMeData?.hasProfile;
  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible, fetchNextPage]);

  useEffect(() => {
    if (router.isReady) {
      const { generation, filter, name } = router.query;
      if (typeof generation === 'string' || generation === undefined) {
        setGeneration(generation);
      }
      if (typeof filter === 'string') {
        setFilter(filter);
      }
      if (typeof name === 'string') {
        setName(name);
      }
    }
  }, [router.isReady, router.query, router]);

  const handleSelectFilter = (filter: string) => {
    addQueryParamsToUrl({ filter });
  };
  const handleSelectGeneration = (generation: string | undefined) => {
    addQueryParamsToUrl({ generation });
  };
  const handleSearch = (searchQuery: string) => {
    addQueryParamsToUrl({ name: searchQuery });
    logSubmitEvent('searchMember', { content: 'searchQuery' });
  };
  const handleClickCard = (profile: Profile) => {
    logClickEvent('memberCard', { id: profile.id, name: profile.name });
  };

  return (
    <StyledContainer>
      <StyledContent>
        {memberOfMeData && !hasProfile && <StyledOnBoardingBanner name={memberOfMeData.name ?? ''} />}
        <StyledMain>
          {!hasProfile && <StyledDivider />}
          <Responsive only='desktop'>
            <StyledMemberRoleMenu value={filter} onSelect={handleSelectFilter} />
          </Responsive>
          <Responsive only='mobile'>
            <StyledMobileFilterWrapper>
              <StyledMemberRoleSelect value={filter} onChange={handleSelectFilter} />
              <GenerationSelect value={generation} onChange={handleSelectGeneration} />
            </StyledMobileFilterWrapper>
            <StyledMemberSearch placeholder='멤버 검색' value={name} onChange={setName} onSearch={handleSearch} />
          </Responsive>
          <StyledRightWrapper>
            <Responsive only='desktop'>
              <StyledFilterWrapper>
                <GenerationSelect value={generation} onChange={handleSelectGeneration} />
                <StyledMemberSearch placeholder='멤버 검색' value={name} onChange={setName} onSearch={handleSearch} />
              </StyledFilterWrapper>
            </Responsive>
            <StyledCardWrapper>
              {profiles?.map((profiles, index) => (
                <React.Fragment key={index}>
                  {profiles.map((profile) => (
                    <Link
                      key={profile.id}
                      href={playgroundLink.memberDetail(profile.id)}
                      onClick={() => handleClickCard(profile)}
                    >
                      <MemberCard
                        name={profile.name}
                        part={profile.part}
                        isActiveGeneration={profile.isActive}
                        introduction={profile.introduction}
                        image={profile.profileImage}
                      />
                    </Link>
                  ))}
                </React.Fragment>
              ))}
            </StyledCardWrapper>
          </StyledRightWrapper>
        </StyledMain>
      </StyledContent>
      <Target ref={ref} />
    </StyledContainer>
  );
};

export default MemberList;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
  min-height: 101vh;
`;

const StyledContent = styled.div`
  width: 100%;
  max-width: 1000px;
`;

const StyledOnBoardingBanner = styled(OnBoardingBanner)`
  margin-top: 120px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 45px;
  }
`;

const StyledMain = styled.main`
  display: flex;
  position: relative;
  column-gap: 30px;
  margin-top: 90px;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    margin-top: 56px;
    padding: 0 20px;
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
  height: 54px;

  & > * {
    flex: 1;
  }
`;

const StyledFilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledMemberSearch = styled(MemberSearch)`
  max-width: 330px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 16px;
    width: 100%;
    max-width: 100%;
  }
`;

const StyledDivider = styled.div`
  display: none;

  @media ${MOBILE_MEDIA_QUERY} {
    display: block;
    margin: 23.5px 0 32.5px;
    border: 0.5px solid ${colors.black80};
    width: 100%;
  }
`;

const IPHONE_XR = 414;
const StyledCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: start;
  justify-items: center;
  margin-top: 28px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 12px 8px;

    & > div {
      width: 100%;
    }
  }
  @media screen and (max-width: ${IPHONE_XR}px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledMemberRoleMenu = styled(MemberRoleMenu)`
  min-width: 225px;
`;

const StyledMemberRoleSelect = styled(MemberRoleSelect)`
  flex: 1;
  width: 100%;
  min-width: 0;

  /* height: 54px; */
`;

const Target = styled.div`
  width: 100%;
  height: 40px;
`;
