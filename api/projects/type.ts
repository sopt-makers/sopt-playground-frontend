export type Project = {
  id: number;
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

export type ProjectInput = Omit<Project, 'id' | 'links'> & {
  links: Omit<ProjectLink, 'linkId'>[];
};

export type ProjectMember = {
  memberId: number;
  memberRole: string;
  memberDescription: string;
  isTeamMember: boolean;
};

export type ProjectLink = {
  linkId: number;
  linkTitle: string;
  linkUrl: string;
};
