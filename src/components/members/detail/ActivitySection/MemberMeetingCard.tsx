import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import Link from 'next/link';
import { FC } from 'react';

import ContentsCard from '@/components/common/ContentsCard';
import { playgroundLink } from '@/constants/links';
import { dateIntoPeriod } from '@/utils/parseDate';

interface MemberMeetingCardProps {
  id: number;
  title: string;
  category: string | null;
  isMeetingLeader: boolean;
  isActiveMeeting: boolean;
  mstartDate: string;
  mendDate: string;
  imageUrl: string | null;
  userName?: string;
}

const MemberMeetingCard: FC<MemberMeetingCardProps> = ({
  id,
  title,
  category,
  isMeetingLeader,
  isActiveMeeting,
  mstartDate,
  mendDate,
  imageUrl,
  userName,
}) => {
  const meetingCategory = (
    <MeetingCategory>
      {category}
      {isMeetingLeader && (
        <>
          <div>|</div>
          <div>{userName}님이 만든 모임</div>
        </>
      )}
    </MeetingCategory>
  );

  const meetingDate = (
    <MeetingDate>
      <MeetingStatus $isActiveMeeting={isActiveMeeting} />
      <div>{dateIntoPeriod(mstartDate, mendDate)}</div>
    </MeetingDate>
  );

  return (
    <Link href={playgroundLink.groupDetail(id)}>
      <ContentsCard thumbnail={imageUrl ? imageUrl : ''} title={title} top={meetingCategory} bottom={meetingDate} />
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
