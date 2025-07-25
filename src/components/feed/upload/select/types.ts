export interface MeetingInfo {
  id: number;
  title: string;
  contents: string;
  imageUrl: string;
  category: string;
}

export interface SelectMeetingOptionItemProps {
  meetingInfo: MeetingInfo;
  isSelected: boolean;
  onClick: (meetingInfo: MeetingInfo) => void;
}
