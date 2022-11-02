export type Project = {
  name: string;
  writerId: number;
  generation: number;
  category: string;
  startAt: string;
  endAt: string;
  serviceType: string[];
  isAvailable: boolean;
  isFounding: boolean;
  summary: string;
  detail: string;
  logoImage: string;
  thumbnailImage: string;
  images: string[];
  members: ProjectMember[];
  links: ProjectLink[];
};

type ProjectMember = {
  memberId: number;
  memberRole: string;
  memberDescription: string;
  isTeamMember: boolean;
};

type ProjectLink = {
  linkTitle: string;
  linkUrl: string;
};
