import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import Link from 'next/link';
import { FC } from 'react';

import ContentsCard from '@/components/common/ContentsCard';
import { playgroundLink } from '@/constants/links';
import { dateIntoPeriod, isTodayInPeriod } from '@/utils/parseDate';

interface MemberMeetingCardProps {
  meetingId: number;
  meetingTitle: string;
  meetingCategory: string | null;
  isLeader: boolean;
  mStartTime: string | null;
  mEndTime: string | null;
  imgUrl: string | null;
  userName?: string;
}

const MemberMeetingCard: FC<MemberMeetingCardProps> = ({
  meetingId,
  meetingTitle,
  meetingCategory,
  isLeader,
  mStartTime,
  mEndTime,
  imgUrl,
  userName,
}) => {
  const category = (
    <MeetingCategory>
      {meetingCategory}
      {isLeader && (
        <>
          <div>|</div>
          <div>{userName}님이 만든 모임</div>
        </>
      )}
    </MeetingCategory>
  );

  const meetingDate =
    mStartTime && mEndTime ? (
      <MeetingDate>
        <MeetingStatus $isActiveMeeting={isTodayInPeriod(mStartTime, mEndTime)} />
        <div>{dateIntoPeriod(mStartTime, mEndTime)}</div>
      </MeetingDate>
    ) : null;

  return (
    <Link href={playgroundLink.groupDetail(meetingId)}>
      <ContentsCard thumbnail={imgUrl || ''} title={meetingTitle} top={category} bottom={meetingDate} />
    </Link>
  );
};

const MeetingCategory = styled.span`
  display: flex;
  gap: 4px;
`;

const MeetingDate = styled.span`
  display: flex;
  gap: 8px;
  align-items: center;
  ${fonts.LABEL_12_SB};

  color: ${colors.gray30};
`;

const MeetingStatus = styled.span<{ $isActiveMeeting: boolean }>`
  border-radius: 50%;
  background-color: ${({ $isActiveMeeting }) => ($isActiveMeeting ? '#CDF47C' : colors.gray100)};
  width: 6px;
  height: 6px;
`;

export default MemberMeetingCard;
