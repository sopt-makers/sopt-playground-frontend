import { axiosInstance } from '@/api';

export const getPresignedUrl = async ({ filename, type }: { filename: string; type: string }) => {
  const { data } = await axiosInstance.request<unknown>({
    method: 'GET',
    url: `api/v1/presigned-url?filename=${filename}&type=${type}`,
  });

  return data;
};
