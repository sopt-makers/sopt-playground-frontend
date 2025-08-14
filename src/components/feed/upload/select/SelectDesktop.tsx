import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconChevronDown } from '@sopt-makers/icons';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';

import SelectMeetingOptionItem from './SelectMeetingOptionItem';
import { MeetingInfo, SelectDesktopContextType } from './types';

interface SelectDesktopProps {
  children: ReactNode;
  isDefaultOpen?: boolean;
}

interface SelectDesktopTriggerProps {
  placeholder?: string;
}

interface SelectDesktopContentProps {
  meetingList: MeetingInfo[];
}

const SelectDesktopContext = createContext<SelectDesktopContextType | undefined>(undefined);

export function useSelectDesktop() {
  const context = useContext(SelectDesktopContext);
  if (context === undefined) {
    throw new Error('useSelectDesktop must be used within a SelectDesktopProvider');
  }
  return context;
}

// SelectDesktopContext Provider
export function SelectDesktop({ children, isDefaultOpen = true }: SelectDesktopProps) {
  const [isSelectOpen, setIsSelectOpen] = useState(isDefaultOpen);
  const [selectedMeetingInfo, setSelectedMeetingInfo] = useState<MeetingInfo | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const closeSelect = () => {
    setIsSelectOpen(false);
  };

  const selectMeeting = (meetingInfo: MeetingInfo) => {
    setSelectedMeetingInfo(meetingInfo);
    closeSelect();
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeSelect();
      }
    };

    if (isSelectOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSelectOpen]);

  const value: SelectDesktopContextType = {
    isSelectOpen,
    selectedMeetingInfo,
    toggleSelect,
    selectMeeting,
  };
  return (
    <SelectDesktopContext.Provider value={value}>
      <SelectDesktopContainer ref={containerRef} isSelectOpen={isSelectOpen}>
        {children}
      </SelectDesktopContainer>
    </SelectDesktopContext.Provider>
  );
}

// Trigger
export function SelectDesktopTrigger({ placeholder = '모임을 선택해주세요' }: SelectDesktopTriggerProps) {
  const { toggleSelect, selectedMeetingInfo } = useSelectDesktop();

  return (
    <SelectDesktopTriggerButton onClick={toggleSelect}>
      <SelectDesktopTriggerText>
        {selectedMeetingInfo ? selectedMeetingInfo.title : placeholder}
      </SelectDesktopTriggerText>
      <SelectDesktopTriggerIcon />
    </SelectDesktopTriggerButton>
  );
}

// Content
export function SelectDesktopContent({ meetingList }: SelectDesktopContentProps) {
  const { isSelectOpen, selectMeeting } = useSelectDesktop();
  return (
    <SelectDesktopDropdown isSelectOpen={isSelectOpen}>
      {meetingList.map((meetingInfo) => (
        <SelectMeetingOptionItem key={meetingInfo.id} meetingInfo={meetingInfo} onClick={selectMeeting} />
      ))}
    </SelectDesktopDropdown>
  );
}

// Style
const SelectDesktopContainer = styled.div<{ isSelectOpen: boolean }>`
  position: relative;
  width: 100%;
`;

const SelectDesktopTriggerButton = styled.div`
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
  max-width: 780px;
  max-height: 512px;
  width: 100%;
  background-color: ${colors.gray800};
  border-radius: 16px;
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
          height: 500px;
        `
      : `
          height: 0px;
        `}

  @media (max-width: 768px) {
    display: none;
  }
`;
