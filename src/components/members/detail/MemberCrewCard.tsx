import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import dayjs from 'dayjs';
import Link from 'next/link';
import { FC } from 'react';

import ContentsCard from '@/components/common/ContentsCard';
import { playgroundLink } from '@/constants/links';

interface MemberCrewCardProps {
  id: number;
  title: string;
  category: string;
  isMeetingLeader: boolean;
  isActiveMeeting: boolean;
  mstartDate: string;
  mendDate: string;
  imageUrl: string;
  userName?: string;
}

const MemberCrewCard: FC<MemberCrewCardProps> = ({
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
  const crewCategory = (
    <CrewCategory>
      {category}
      {isMeetingLeader && (
        <>
          <div>|</div>
          <div>{userName}님이 만든 모임</div>
        </>
      )}
    </CrewCategory>
  );

  const crewDate = (
    <CrewDate>
      <CrewStatus $isActiveMeeting={isActiveMeeting} />
      <div>{`${dayjs(mstartDate).format('YYYY.MM.DD')}${
        mstartDate === mendDate ? '' : `${' - '}${dayjs(mendDate).format('YYYY.MM.DD')}`
      }`}</div>
    </CrewDate>
  );

  return (
    <Link href={playgroundLink.groupDetail(id)}>
      <ContentsCard thumbnail={imageUrl} title={title} top={crewCategory} bottom={crewDate} />
    </Link>
  );
};

const CrewCategory = styled.span`
  display: flex;
  gap: 4px;
`;

const CrewDate = styled.span`
  display: flex;
  gap: 8px;
  align-items: center;
  ${fonts.LABEL_12_SB};

  color: ${colors.gray30};
`;

const CrewStatus = styled.span<{ $isActiveMeeting: boolean }>`
  border-radius: 50%;
  background-color: ${({ $isActiveMeeting }) => ($isActiveMeeting ? '#CDF47C' : colors.gray100)};
  width: 6px;
  height: 6px;
`;

export default MemberCrewCard;
