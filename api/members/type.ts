export type Profile = {
  name: string;
  profileImage: string;
  birthday: string;
  phone: string;
  email: string;
  address: string;
  university: string;
  major: string;
  introduction: string;
  skill: string;
  activities: Activity[];
  links: Link[];
  openToWork: boolean;
  openToSideProject: boolean;
  allowOfficial: boolean;
};

type Activity = {
  id: number;
  generation: number;
  part: string;
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
