import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Text from '@/components/common/Text';

import SelectMeetingOptionItem from './SelectMeetingOptionItem';
import { MeetingInfo } from './types';

interface SelectMobileProps {
  isSelectOpen: boolean;
  meetingList: MeetingInfo[];
  selectedMeetingInfo: MeetingInfo | null;
  onSelectItemClick: (meetingInfo: MeetingInfo) => void;
}

export default function SelectMobile({
  isSelectOpen,
  meetingList,
  selectedMeetingInfo,
  onSelectItemClick,
}: SelectMobileProps) {
  return (
    <SelectMobileLayout isSelectOpen={isSelectOpen}>
      <SelectMobileTitle>어떤 모임의 피드를 작성할까요?</SelectMobileTitle>
      <SelectMobileListWrapper>
        {meetingList.map((meetingInfo) => (
          <SelectMeetingOptionItem
            key={meetingInfo.id}
            meetingInfo={meetingInfo}
            isSelected={selectedMeetingInfo?.id === meetingInfo.id}
            onClick={onSelectItemClick}
          />
        ))}
      </SelectMobileListWrapper>
    </SelectMobileLayout>
  );
}

const SelectMobileLayout = styled.div<{ isSelectOpen: boolean }>`
  position: absolute;
  top: 120%;
  left: 0;
  width: 100%;
  background-color: ${colors.gray700};
  border-radius: 8px;
  z-index: 3;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  ${({ isSelectOpen }) =>
    isSelectOpen
      ? css`
          height: auto;
          max-height: 400px;
          padding: 16px;
        `
      : css`
          height: 0px;
          padding: 0;
        `}

  @media (min-width: 769px) {
    display: none;
  }
`;

const SelectMobileTitle = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.white};
  margin-bottom: 16px;
  line-height: 1.4;
`;

const SelectMobileListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
`;
