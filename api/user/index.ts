import { axiosInstance } from '@/api';
import { User } from '@/api/user/types';

const getUsersByName = (name: string) => {
  return axiosInstance.request<User[]>({
    method: 'GET',
    url: `api/v1/users/search?name=${name}`,
  });
};

export const user = {
  getUsersByName,
};
