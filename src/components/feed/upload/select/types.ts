export interface MeetingInfo {
  id: number;
  title: string;
  contents: string;
  imageUrl: string;
  category: string;
}

export interface SelectMeetingOptionItemProps {
  meetingInfo: MeetingInfo;
  onClick: (meetingInfo: MeetingInfo) => void;
}

export interface SelectDesktopContextType {
  isSelectOpen: boolean;
  selectedMeetingInfo: MeetingInfo | null;
  toggleSelect: () => void;
  selectMeeting: (meetingInfo: MeetingInfo) => void;
}
