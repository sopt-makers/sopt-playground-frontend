import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconChevronDown } from '@sopt-makers/icons';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';

import { BottomSheet } from '@/components/common/BottomSheet';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import { textStyles } from '@/styles/typography';

import SelectMeetingOptionItem from './SelectMeetingOptionItem';
import { MeetingInfo } from './types';

export interface SelectContextType {
  isSelectOpen: boolean;
  selectedMeetingInfo: MeetingInfo | null;
  toggleSelect: () => void;
  selectMeeting: (meetingInfo: MeetingInfo) => void;
  closeSelect: () => void;
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

export function useSelect() {
  const context = useContext(SelectContext);
  if (context === undefined) {
    throw new Error('useSelect must be used within a SelectProvider');
  }
  return context;
}

interface SelectProps {
  children: ReactNode;
  isDefaultOpen?: boolean;
  onOptionClick?: (meetingInfo: MeetingInfo) => void;
}

interface SelectTriggerProps {
  placeholder?: string;
}

interface SelectContentProps {
  meetingList: MeetingInfo[];
}

export function Select({ children, isDefaultOpen = false, onOptionClick }: SelectProps) {
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
    onOptionClick?.(meetingInfo);
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

  const value: SelectContextType = {
    isSelectOpen,
    selectedMeetingInfo,
    toggleSelect,
    selectMeeting,
    closeSelect,
  };

  return (
    <SelectContext.Provider value={value}>
      <SelectContainer ref={containerRef}>{children}</SelectContainer>
    </SelectContext.Provider>
  );
}

// Trigger
export function SelectTrigger({ placeholder = '모임을 선택해주세요' }: SelectTriggerProps) {
  const { toggleSelect, selectedMeetingInfo } = useSelect();

  return (
    <SelectTriggerButton onClick={toggleSelect}>
      <SelectTriggerText>{selectedMeetingInfo ? selectedMeetingInfo.title : placeholder}</SelectTriggerText>
      <SelectTriggerIcon />
    </SelectTriggerButton>
  );
}

// Content
export function SelectContent({ meetingList }: SelectContentProps) {
  const { isSelectOpen, selectMeeting, closeSelect } = useSelect();

  return (
    <>
      {/* Desktop */}
      <Responsive only='desktop'>
        <SelectDropdown isSelectOpen={isSelectOpen}>
          {meetingList.map((meetingInfo) => (
            <SelectMeetingOptionItem key={meetingInfo.id} meetingInfo={meetingInfo} onClick={selectMeeting} />
          ))}
        </SelectDropdown>
      </Responsive>

      {/* Mobile */}
      <Responsive only='mobile'>
        <BottomSheet
          isOpen={isSelectOpen}
          onClose={closeSelect}
          className='select-dropdown'
          header={<SelectMobileTitle>어떤 모임의 피드를 작성할까요?</SelectMobileTitle>}
        >
          <SelectMobileListWrapper>
            {meetingList.map((meetingInfo) => (
              <SelectMeetingOptionItem key={meetingInfo.id} meetingInfo={meetingInfo} onClick={selectMeeting} />
            ))}
          </SelectMobileListWrapper>
        </BottomSheet>
      </Responsive>
    </>
  );
}

// Styled Components
const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectTriggerButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 20px;
  background-color: ${colors.gray800};
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.gray600};
  }
`;

const SelectTriggerText = styled(Text)`
  ${textStyles.SUIT_16_M}
  color: ${colors.white};
`;

const SelectTriggerIcon = styled(IconChevronDown)`
  width: 20px;
  height: 20px;
  color: ${colors.white};
`;

const SelectDropdown = styled.div<{ isSelectOpen: boolean }>`
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

const SelectMobileTitle = styled.header`
  display: flex;
  gap: 12px;
  align-items: center;
  ${textStyles.SUIT_20_B}
  color: ${colors.white};
  padding: 0 20px 12px;
`;

const SelectMobileListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 400px;
  overflow-y: auto;
  padding: 0 20px 20px;
`;
