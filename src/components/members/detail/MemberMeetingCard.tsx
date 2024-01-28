import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import dayjs from 'dayjs';
import Link from 'next/link';

import ContentsCard from '@/components/common/ContentsCard';
import { playgroundLink } from '@/constants/links';

interface Meeting {
  id: number;
  isMeetingLeader: boolean;
  title: string;
  category: string;
  imageUrl: string;
  isActiveMeeting: boolean;
  mstartDate: string;
  mendDate: string;
}

interface MeetingProps extends Meeting {
  userName: string;
}

export default function MemberMeetingCard({
  id,
  isMeetingLeader,
  title,
  category,
  imageUrl,
  mstartDate,
  mendDate,
  isActiveMeeting,
  userName,
}: MeetingProps) {
  const meetingCategory = isMeetingLeader ? `${category} | ${userName}님이 만든 모임` : category;
  const startDate = dayjs(mstartDate).format('YYYY.MM.DD');
  const endDate = dayjs(mendDate).format('YYYY.MM.DD');
  const date = startDate === endDate ? startDate : `${startDate} - ${endDate}`;

  return (
    <Link href={playgroundLink.groupDetail(id)}>
      <ContentsCard
        thumbnail={imageUrl}
        title={title}
        top={meetingCategory}
        bottom={
          <Bottom>
            <Circle isActiveMeeting={isActiveMeeting} />
            {date}
          </Bottom>
        }
      />
    </Link>
  );
}

const Circle = styled.div<{ isActiveMeeting: boolean }>`
  border-radius: 50%;
  background-color: ${({ isActiveMeeting }) => (isActiveMeeting ? '#CDF47C' : colors.gray300)};
  width: 6px;
  height: 6px;
`;

const Bottom = styled.footer`
  display: flex;
  gap: 8px;
  align-items: center;
`;
