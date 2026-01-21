import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Tag } from '@sopt-makers/ui';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { useGetUnansweredQuestionCount } from '@/api/endpoint/members/getUnansweredQuestionCount';
import { useGetMemberProfileById } from '@/api/endpoint_LEGACY/hooks';
import Loading from '@/components/common/Loading';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import AskTabContent from '@/components/members/detail/ActivitySection/AskTabContent';
import ProfileTabContent from '@/components/members/detail/ActivitySection/ProfileTabContent';
import ProfileSection from '@/components/members/detail/ProfileSection';
import { useRunOnce } from '@/hooks/useRunOnce';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { safeParseInt } from '@/utils';

interface MemberDetailProps {
  memberId: string;
}

type TabType = 'profile' | 'ask';

interface Tab {
  id: TabType;
  label: string;
}

const TABS: Tab[] = [
  { id: 'profile', label: '프로필' },
  { id: 'ask', label: '에스크' },
];

const MemberDetail: FC<MemberDetailProps> = ({ memberId }) => {
  const router = useRouter();
  const { logPageViewEvent, logClickEvent } = useEventLogger();

  const currentTab = (router.query.tab as TabType) || 'profile';

  const { data: profile, isLoading } = useGetMemberProfileById(safeParseInt(memberId) ?? undefined);

  const { data: me } = useGetMemberOfMe();

  const isMyProfile = me?.id !== undefined && String(me.id) === memberId;

  const { data: unansweredCountData } = useGetUnansweredQuestionCount({
    enabled: isMyProfile,
  });

  const sortedSoptActivities = useMemo(() => {
    if (!profile?.soptActivities) {
      return [];
    }
    const sorted = [...profile.soptActivities];
    sorted.sort((a, b) => b.generation - a.generation);
    return sorted;
  }, [profile?.soptActivities]);

  useRunOnce(() => {
    if (profile) {
      logPageViewEvent('memberCard', {
        id: Number(memberId),
        name: profile.name,
      });
    }
  }, [profile, memberId]);

  const handleTabChange = (tab: TabType) => {
    if (profile) {
      if (tab === 'ask') {
        logClickEvent('TabAsk', {
          id: Number(memberId),
          name: profile.name,
        });
      } else if (tab === 'profile') {
        logClickEvent('TabProfile', {
          id: Number(memberId),
          name: profile.name,
        });
      }
    }
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, tab },
      },
      undefined,
      { shallow: true },
    );
  };

  if (isLoading || !profile)
    return (
      <Container>
        <Loading />
      </Container>
    );

  return (
    <Container>
      <Wrapper>
        <ProfileSection profile={profile} memberId={memberId} />

        <TabNavigation>
          {TABS.map((tab) => (
            <TabButton key={tab.id} isActive={currentTab === tab.id} onClick={() => handleTabChange(tab.id)}>
              {tab.label}
              {tab.id === 'ask' && isMyProfile && (unansweredCountData?.count ?? 0) > 0 && (
                <TagWrapper>
                  <StyledTag size='sm' variant='primary' shape='pill'>
                    {unansweredCountData?.count}
                  </StyledTag>
                </TagWrapper>
              )}
            </TabButton>
          ))}
        </TabNavigation>

        {(() => {
          switch (currentTab) {
            case 'profile':
              return (
                <ProfileTabContent
                  profile={profile}
                  memberId={memberId}
                  meId={me?.id}
                  sortedSoptActivities={sortedSoptActivities}
                />
              );
            case 'ask':
              return (
                <AskTabContent
                  memberId={memberId}
                  memberName={profile.name}
                  meId={me?.id}
                  unansweredCount={unansweredCountData?.count}
                />
              );
            default:
              return (
                <ProfileTabContent
                  profile={profile}
                  memberId={memberId}
                  meId={me?.id}
                  sortedSoptActivities={sortedSoptActivities}
                />
              );
          }
        })()}
      </Wrapper>
    </Container>
  );
};

export default MemberDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120px 0 200px;
  @media ${MOBILE_MEDIA_QUERY} {
    padding: 16px 20px;
    padding-bottom: 100px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 790px;
  @media ${MOBILE_MEDIA_QUERY} {
    gap: 24px;
    width: 100%;
  }
`;

const TabNavigation = styled.div`
  display: flex;
  position: sticky;
  z-index: 10;
  border-bottom: 1px solid ${colors.gray700};
  background-color: ${colors.gray950};
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    top: 60px;
  }
`;

const TabButton = styled.button<{ isActive: boolean }>`
  display: flex;
  position: relative;
  flex: 1;
  gap: 8px;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border: none;
  background: transparent;
  cursor: pointer;
  height: 36px;
  color: ${({ isActive }) => (isActive ? colors.white : colors.gray600)};
  font-weight: ${({ isActive }) => (isActive ? '600' : '400')};
  ${fonts.HEADING_20_B}

  &::after {
    position: absolute;
    bottom: -2px;
    left: 0;
    transition: background 0.2s ease;
    background: ${({ isActive }) => (isActive ? colors.white : 'transparent')};
    width: 100%;
    height: 2px;
    content: '';
  }

  &:hover {
    color: #fff;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    height: 32px;
    ${fonts.HEADING_16_B}
  }
`;

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledTag = styled(Tag)`
  padding: 3px 8px;
`;
