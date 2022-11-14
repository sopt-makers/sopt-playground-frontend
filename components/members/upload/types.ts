export interface MemberUploadForm {
  profileImage: string;
  name: string;
  birthday: Birthday;
  phone: string;
  email: string;
  address: string;
  university: string;
  major: string;
  introduction: string;
  skill: string;
  links: Link[];
  activities: SoptActivity[];
  openToWork: boolean;
  openToSideProject: boolean;
  allowOfficial: boolean;
}

interface SoptActivity {
  generation: string;
  part: string;
  team: string;
}

export interface Link {
  title: string;
  url: string;
}

export interface Birthday {
  year: string;
  month: string;
  day: string;
}
