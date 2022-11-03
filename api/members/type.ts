export type Profile = {
  name: string;
  isMine: boolean;
  profileImage: string;
  birthday: string;
  phone: string;
  email: string;
  address: string;
  university: string;
  major: string;
  introduction: string;
  skill: string;
  activities: {
    cardinalActivities: Activity[];
    cardinalInfo: string;
  }[];
  links: Link[];
  openToWork: boolean;
  openToSideProject: boolean;
  allowOfficial: boolean;
  projects: [];
};

export type Activity = {
  id: number;
  generation: number;
  isProject: string;
  team: string;
};

type Link = {
  id: number;
  title: string;
  url: string;
};

export type Member = {
  id: number;
  name: string;
  generation: number;
};
