import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import axios from 'axios';
import Link from 'next/link';
import { useCallback, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { ProfileDetail } from '@/api/endpoint_LEGACY/members/type';
import ResizedImage from '@/components/common/ResizedImage';
import Text from '@/components/common/Text';
import MemberMeetingCard from '@/components/members/detail/ActivitySection/MemberMeetingCard';
import EmptyProfile from '@/components/members/detail/EmptyProfile';
import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { useMemberMeetingList } from '@/api/crew/getMeetingList';
import Loading from '@/components/common/Loading';

interface GroupSectionProps {
  profile: ProfileDetail;
  meId?: number | undefined;
  memberId: string;
}

const GroupSection = ({ profile, meId, memberId }: GroupSectionProps) => {
  const { data: meetingData, isPending, error: crewError } = useMemberMeetingList(memberId);

  const parentRef = useRef<HTMLDivElement>(null);

  if (axios.isAxiosError(crewError) && crewError.response?.status === 400) {
    return <EmptyProfile />;
  }
  const meetingList = meetingData?.userAppliedMeetings ?? []; // 데이터를 안전하게 추출
  const ITEMS_PER_ROW = 2;
  const ROW_COUNT = Math.ceil(meetingList.length / ITEMS_PER_ROW);

  const rowVirtualizer = useVirtualizer({
    count: ROW_COUNT,
    getScrollElement: () => parentRef.current,
    overscan: 6,
    estimateSize: useCallback(() => 136, []),
  });

  if (isPending || !profile || !meetingData)
    return (
      <Container>
        <Loading />
      </Container>
    );

  return (
    <>
      {meetingList.length > 0 ? (
        <Container>
          <ActivityTitle>
            {profile.name}님이 참여한 {meetingList.length}개의 모임이에요!
          </ActivityTitle>
          <ActivityDisplay
            ref={parentRef}
            style={{
              height: '800px',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                position: 'relative',
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const startIndex = virtualRow.index * ITEMS_PER_ROW;
                const endIndex = Math.min(startIndex + ITEMS_PER_ROW, meetingList.length);
                const itemsInRow = meetingList.slice(startIndex, endIndex);

                return (
                  <MemberMeetingCardWrapper
                    data-index={virtualRow.index}
                    style={{
                      transform: `translateY(${virtualRow.start}px)`,
                      height: `${virtualRow.size}px`,
                    }}
                  >
                    {itemsInRow.map((meeting) => (
                      <MemberMeetingCard
                        key={meeting.meetingId}
                        {...meeting}
                        {...(meeting.isLeader && { userName: profile.name })}
                      />
                    ))}
                    {itemsInRow.length === 1 && <div />}
                  </MemberMeetingCardWrapper>
                );
              })}
            </div>
          </ActivityDisplay>
        </Container>
      ) : (
        <>
          {String(meId) === memberId && (
            <Container>
              <ActivityTitle>아직 참여한 모임이 없어요</ActivityTitle>
              <ActivityUploadNudge>
                <NudgeSubText typography='SUIT_16_M' style={{ textAlign: 'center', lineHeight: '24px' }}>
                  모임을 참여하여 <br />
                  SOPT 구성원들과의 추억을 쌓아보세요!
                </NudgeSubText>
                <ActivityUploadButton href={playgroundLink.groupList()}>
                  <Text typography='SUIT_15_SB'>모임 둘러보러 가기</Text>
                </ActivityUploadButton>
                <ActivityUploadMaskImg src='/icons/img/meeting-mask.png' alt='meeting-mask-image' height={134} />
              </ActivityUploadNudge>
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default GroupSection;

const Container = styled.section`
  margin-top: 80px;
`;

const ActivityTitle = styled.div`
  ${fonts.HEADING_28_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.HEADING_20_B};
  }
`;

const ActivityDisplay = styled.div`
  margin-top: 32px;
`;

const MemberMeetingCardWrapper = styled.div`
  display: grid;
  position: absolute;
  top: 0;
  left: 0;
  grid-template-columns: repeat(2, minmax(10px, 1fr));
  column-gap: 29px;
  padding-bottom: 20px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-bottom: 0;
  }
`;
const ActivityUploadNudge = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  border-radius: 30px;
  background-color: ${colors.gray800};
  height: 317px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 20px;
    height: 212px;
  }
`;

const ActivityUploadMaskImg = styled(ResizedImage)`
  position: absolute;
  max-height: 317px;
  object-fit: cover;

  @media ${MOBILE_MEDIA_QUERY} {
    top: 0;
    max-height: 134px;
  }
`;

const ActivityUploadButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  margin-top: 24px;
  border-radius: 14px;
  background-color: ${colors.gray10};
  padding: 14px 48px;
  color: ${colors.gray800};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 50px;
    width: 100%;
  }
`;

const Target = styled.div`
  width: 100%;
`;

const NudgeSubText = styled(Text)`
  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 14px;
  }
`;
