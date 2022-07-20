export enum ServiceType {
  WEB = '웹',
  APP = '앱',
}

export enum Category {
  APPJAM = '앱잼',
  SOPKATHON = '솝커톤',
  SOPTERM = '솝텀',
  STUDY = '스터디',
  JOINTSEMINAR = '합동세미나',
  ETC = '기타',
}

export enum Role {
  MAINPM = 'MAINPM',
  PM = 'PM',
  DESIGN = 'DESIGN',
  IOS = 'IOS',
  ANDROID = 'ANDROID',
  WEB = 'WEB',
  SERVER = 'SERVER',
}

export interface Link {
  title: string;
  url: string;
}

export interface User {
  user_id: number;
  description: string;
  role: Role;
  is_team_member: boolean;
}

export interface ProjectInput {
  name: string;
  generation?: number;
  category: Category;
  service_type: ServiceType[];
  start_at: Date;
  end_at?: Date;
  is_available?: boolean;
  is_founding?: boolean;
  summary: string;
  detail: string;
  thumbnail_image: string;
  images: string[];
  links: Link[];
  users: User[];
}

type ResponseOmitTypes = 'links' | 'users';
export type ProjectResponse = Omit<ProjectInput, ResponseOmitTypes> & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  links: (Link & { project_id: number; id: number })[];
  users: (User & { project_id: number })[];
};
