import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconChevronDown } from '@sopt-makers/icons';
import { ReactNode } from 'react';

import SelectMeetingOptionItem from './SelectMeetingOptionItem';
import { MeetingInfo } from './types';

interface SelectDesktopRootProps {
  isSelectOpen: boolean;
  selectedMeetingInfo: MeetingInfo | null;
  onSelectItemClick: (meetingInfo: MeetingInfo) => void;
  children: ReactNode;
}

interface SelectDesktopTriggerProps {
  placeholder?: string;
}

interface SelectDesktopContentProps {
  isSelectOpen: boolean;
  meetingList: MeetingInfo[];
  selectedMeetingInfo: MeetingInfo | null;
  onSelectItemClick: (meetingInfo: MeetingInfo) => void;
}

// Root 컴포넌트
export function SelectDesktopRoot({ isSelectOpen, children }: SelectDesktopRootProps) {
  return <SelectDesktopContainer isSelectOpen={isSelectOpen}>{children}</SelectDesktopContainer>;
}

// Trigger 컴포넌트
export function SelectDesktopTrigger({ placeholder = '모임을 선택해주세요' }: SelectDesktopTriggerProps) {
  return (
    <SelectDesktopTriggerButton>
      <SelectDesktopTriggerText>{placeholder}</SelectDesktopTriggerText>
      <SelectDesktopTriggerIcon />
    </SelectDesktopTriggerButton>
  );
}

// Content 컴포넌트
export function SelectDesktopContent({
  isSelectOpen,
  meetingList,
  selectedMeetingInfo,
  onSelectItemClick,
}: SelectDesktopContentProps) {
  return (
    <SelectDesktopDropdown isSelectOpen={isSelectOpen}>
      <SelectDesktopDropdownContent>
        {meetingList.map((meetingInfo) => (
          <SelectMeetingOptionItem
            key={meetingInfo.id}
            meetingInfo={meetingInfo}
            isSelected={selectedMeetingInfo?.id === meetingInfo.id}
            onClick={onSelectItemClick}
          />
        ))}
      </SelectDesktopDropdownContent>
    </SelectDesktopDropdown>
  );
}

// Styled Components
const SelectDesktopContainer = styled.div<{ isSelectOpen: boolean }>`
  position: relative;
  width: 100%;
`;

const SelectDesktopTriggerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 11px 16px;
  background-color: ${colors.gray800};
  border-radius: 10px;

  &:hover {
    background-color: ${colors.gray600};
  }
`;

const SelectDesktopTriggerText = styled.span`
  ${fonts.BODY_16_M};

  color: ${colors.white};
  &::placeholder {
    color: ${colors.gray300};
  }
`;

const SelectDesktopTriggerIcon = styled(IconChevronDown)`
  width: 20px;
  height: 20px;
`;

const SelectDesktopDropdown = styled.div<{ isSelectOpen: boolean }>`
  position: absolute;
  top: 120%;
  left: 0;
  max-width: 500px;
  width: 100%;
  background-color: ${colors.gray800};
  border-radius: 16px;
  z-index: 3;
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 0.3s ease-in-out;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${colors.gray800};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.gray500};
    border-radius: 6px;
  }

  ${({ isSelectOpen }) =>
    isSelectOpen
      ? `
          height: 344px;
          padding: 8px;
        `
      : `
          height: 0px;
          padding: 0;
        `}

  @media (max-width: 768px) {
    display: none;
  }
`;

const SelectDesktopDropdownContent = styled.div`
  padding: 8px;
`;
