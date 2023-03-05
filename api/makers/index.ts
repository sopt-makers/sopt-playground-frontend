import { axiosInstance } from '@/api';
import { Maker } from '@/api/makers/types';

export const getMakersProfile = async () => {
  const { data } = await axiosInstance.request<Maker[]>({
    method: 'GET',
    url: `makers/profile`,
  });

  return data;
};
