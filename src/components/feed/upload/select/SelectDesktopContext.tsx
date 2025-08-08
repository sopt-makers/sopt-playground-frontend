import { createContext, ReactNode, useContext, useState } from 'react';

import { MeetingInfo } from './types';

interface SelectDesktopContextType {
  isSelectOpen: boolean;
  selectedMeetingInfo: MeetingInfo | null;
  toggleSelect: () => void;
  closeSelect: () => void;
  openSelect: () => void;
  selectMeeting: (meetingInfo: MeetingInfo) => void;
  clearSelection: () => void;
  setGroupClickHandler: (handler: (title: string) => void) => void;
}

const SelectDesktopContext = createContext<SelectDesktopContextType | undefined>(undefined);

interface SelectDesktopProviderProps {
  children: ReactNode;
}

export function SelectDesktopProvider({ children }: SelectDesktopProviderProps) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedMeetingInfo, setSelectedMeetingInfo] = useState<MeetingInfo | null>(null);
  const [groupClickHandler, setGroupClickHandler] = useState<((title: string) => void) | null>(null);

  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const closeSelect = () => {
    setIsSelectOpen(false);
  };

  const openSelect = () => {
    setIsSelectOpen(true);
  };

  const selectMeeting = (meetingInfo: MeetingInfo) => {
    setSelectedMeetingInfo(meetingInfo);
    setIsSelectOpen(false);
    if (groupClickHandler) {
      groupClickHandler(meetingInfo.title);
    }
  };

  const clearSelection = () => {
    setSelectedMeetingInfo(null);
    setIsSelectOpen(false);
  };

  const setGroupClickHandlerFn = (handler: (title: string) => void) => {
    setGroupClickHandler(() => handler);
  };

  const value: SelectDesktopContextType = {
    isSelectOpen,
    selectedMeetingInfo,
    toggleSelect,
    closeSelect,
    openSelect,
    selectMeeting,
    clearSelection,
    setGroupClickHandler: setGroupClickHandlerFn,
  };

  return <SelectDesktopContext.Provider value={value}>{children}</SelectDesktopContext.Provider>;
}

export function useSelectDesktop() {
  const context = useContext(SelectDesktopContext);
  if (context === undefined) {
    throw new Error('useSelectDesktop must be used within a SelectDesktopProvider');
  }
  return context;
}
