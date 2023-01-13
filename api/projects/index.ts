import { axiosInstance } from '@/api';
import { Project, ProjectInput } from '@/api/projects/type';

// project id로 조회
export const getProjectById = async (id: string) => {
  const { data } = await axiosInstance.request<Project>({
    method: 'GET',
    url: `api/v1/projects/${id}`,
  });

  return data;
};

// project 전체 조회
export const getProjects = async () => {
  const { data } = await axiosInstance.request<Project[]>({
    method: 'GET',
    url: 'api/v1/projects',
  });

  return data;
};

// project 생성
export const postProject = (input: ProjectInput) => {
  return axiosInstance.request({
    method: 'POST',
    url: 'api/v1/projects',
    data: input,
  });
};

// project 수정
export const putProject = ({ id, data }: { id: number; data: ProjectInput }) => {
  return axiosInstance.request({
    method: 'PUT',
    url: `api/v1/projects/${id}`,
    data,
  });
};

// project 삭제
export const deleteProject = (id: number) => {
  return axiosInstance.request({
    method: 'DELETE',
    url: `api/v1/projects/${id}`,
  });
};
