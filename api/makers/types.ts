export interface Maker {
  id: number;
  name: string;
  profileImage: string;
  activities: Activity[];
  careers: Career[];
}

interface Activity {
  id: number;
  generation: number;
  part: string;
  team: string;
}

interface Career {
  id: number;
  companyName: string;
  title: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}
