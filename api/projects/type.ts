export type Project = {
  id: number;
  name: string;
  writerId: number;
  generation: number;
  category: string;
  startAt: string;
  endAt?: string;
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

type ProjectInputOmitType = 'id' | 'links' | 'generation';
export type ProjectInput = Omit<Project, ProjectInputOmitType> & {
  links: Omit<ProjectLink, 'linkId'>[];
  generation?: number;
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
