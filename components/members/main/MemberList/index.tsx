import styled from '@emotion/styled';
import { uniq } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react';

import { Profile } from '@/api/endpoint_LEGACY/members/type';
import Responsive from '@/components/common/Responsive';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import MessageModal from '@/components/members/detail/MessageSection/MessageModal';
import { useMemberProfileQuery } from '@/components/members/main/hooks/useMemberProfileQuery';
import MemberCard from '@/components/members/main/MemberCard';
import GenerationSelect from '@/components/members/main/MemberList/GenerationSelect';
import { MemberRoleMenu, MemberRoleSelect, menuValue } from '@/components/members/main/MemberList/MemberRoleMenu';
import MemberSearch from '@/components/members/main/MemberList/MemberSearch';
import { LATEST_GENERATION } from '@/constants/generation';
import { playgroundLink } from '@/constants/links';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { usePageQueryParams } from '@/hooks/usePageQueryParams';
import { useRunOnce } from '@/hooks/useRunOnce';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const PAGE_LIMIT = 30;
const DESKTOP_ONE_MEDIA_QUERY = 'screen and (max-width: 1542px)';
const DESKTOP_TWO_MEDIA_QUERY = 'screen and (max-width: 1200px)';

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
  const [filter, setFilter] = useState<string>(menuValue.ALL);
  const [name, setName] = useState<string>('');
  const [messageModalState, setMessageModalState] = useState<MessageModalState>({ show: false });

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
    logClickEvent('filterPart', { part: filter });
  };
  const handleSelectGeneration = (generation: string | undefined) => {
    addQueryParamsToUrl({ generation });
    logClickEvent('filterGeneration', { generation: generation ?? 'all' });
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
      {banner}
      <StyledMain>
        <Responsive only='mobile'>
          <StyledMobileFilterWrapper>
            <StyledMemberRoleSelect value={filter} onChange={handleSelectFilter} />
            <GenerationSelect value={generation} onChange={handleSelectGeneration} />
          </StyledMobileFilterWrapper>
          <StyledMemberSearch placeholder='멤버 검색' value={name} onChange={setName} onSearch={handleSearch} />
        </Responsive>
        <StyledRightWrapper>
          <Responsive only='desktop'>
            <StyledTopWrapper>
              <StyledFilterWrapper>
                <GenerationSelect value={generation} onChange={handleSelectGeneration} />
              </StyledFilterWrapper>
              <StyledMemberSearch placeholder='멤버 검색' value={name} onChange={setName} onSearch={handleSearch} />
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
  overflow: scroll;
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

const StyledTopWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${DESKTOP_TWO_MEDIA_QUERY} {
    display: grid;
    grid:
      [row1-start] 'search' [row1-end]
      [row2-start] 'filter' [row2-end]
      / 1fr;
  }
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

const StyledMemberSearch = styled(MemberSearch)`
  max-width: 330px;

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

const StyledMemberRoleSelect = styled(MemberRoleSelect)`
  flex: 1;
  width: 100%;
  min-width: 0;
`;

const Target = styled.div`
  width: 100%;
  height: 40px;
`;
