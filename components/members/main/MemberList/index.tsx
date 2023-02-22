import styled from '@emotion/styled';
import { uniq } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useMemo } from 'react';

import { useGetMemberOfMe } from '@/api/hooks';
import { Profile } from '@/api/members/type';
import Responsive from '@/components/common/Responsive';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { useMemberProfileQuery } from '@/components/members/main/hooks/useMemberProfileQuery';
import MemberCard from '@/components/members/main/MemberCard';
import MemberSearch from '@/components/members/main/MemberList/MemberSearch';
import OnBoardingBanner from '@/components/members/main/MemberList/OnBoardingBanner';
import MemberRoleMenu, { MenuValue } from '@/components/members/main/MemberRoleMenu';
import MemberRoleDropdown from '@/components/members/main/MemberRoleMenu/MemberRoleDropdown';
import useMemberRoleMenu from '@/components/members/main/MemberRoleMenu/useMemberRoleMenu';
import { LATEST_GENERATION } from '@/constants/generation';
import { playgroundLink } from '@/constants/links';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { usePageQueryParams } from '@/hooks/usePageQueryParams';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const PAGE_LIMIT = 30;

const MemberList: FC = () => {
  const { logClickEvent } = useEventLogger();
  const { menuValue: filter, onSelect } = useMemberRoleMenu();
  const { data: memberOfMeData } = useGetMemberOfMe();
  const router = useRouter();
  const { ref, isVisible } = useIntersectionObserver();
  const { data: memberProfileData, fetchNextPage } = useMemberProfileQuery({
    limit: PAGE_LIMIT,
    queryKey: router.asPath,
  });
  const { addQueryParamsToUrl } = usePageQueryParams({
    skipNull: true,
  });

  const profiles = useMemo(
    () =>
      memberProfileData?.pages.map((members) =>
        members.map((member) => ({
          ...member,
          isActive: member.activities.map(({ generation }) => generation).includes(LATEST_GENERATION),
          part: uniq(member.activities.map(({ part }) => part)).join(' / '),
        })),
      ),
    [memberProfileData],
  );

  const hasProfile = !!memberOfMeData?.hasProfile;

  const handleSelect = (value: MenuValue) => {
    onSelect(value);
    addQueryParamsToUrl({ filter: value.toString() });
  };

  const handleSearch = (searchQuery: string) => {
    addQueryParamsToUrl({ name: searchQuery });
  };

  const handleClickCard = (profile: Profile) => {
    logClickEvent('memberCard', { id: profile.id, name: profile.name });
  };

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible, fetchNextPage]);

  return (
    <StyledContainer>
      <StyledContent>
        {memberOfMeData && !hasProfile && <StyledOnBoardingBanner name={memberOfMeData.name ?? ''} />}

        <StyledMain>
          {!hasProfile && <StyledDivider />}
          <Responsive only='desktop'>
            <StyledMemberRoleMenu value={filter} onSelect={handleSelect} />
          </Responsive>
          <Responsive only='mobile'>
            <StyledMemberRoleDropdown value={filter} onSelect={handleSelect} />
          </Responsive>
          <StyledRightWrapper>
            <StyledMemberSearch placeholder='멤버 검색' onSearch={handleSearch} />
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
              <Target ref={ref} />
            </StyledCardWrapper>
          </StyledRightWrapper>
        </StyledMain>
      </StyledContent>
    </StyledContainer>
  );
};

export default MemberList;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 101vh;
`;

const StyledContent = styled.div`
  width: 100%;
  max-width: 1000px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
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

const StyledMemberSearch = styled(MemberSearch)`
  align-self: flex-end;
  max-width: 330px;

  @media ${MOBILE_MEDIA_QUERY} {
    align-self: stretch;
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

const StyledMemberRoleDropdown = styled(MemberRoleDropdown)`
  margin-bottom: 16px;
  max-width: 505px;
`;

const Target = styled.div`
  height: 40px;
`;
