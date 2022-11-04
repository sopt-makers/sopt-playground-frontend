import { axiosInstance } from '@/api';

export const getPresignedUrl = async ({
  filename,
  type,
}: {
  filename: string;
  type?: string;
}): Promise<{ filename: string; signedUrl: string }> => {
  const { data } = await axiosInstance.request<{ filename: string; signedUrl: string }>({
    method: 'GET',
    url: type ? `api/v1/presigned-url?filename=${filename}&type=${type}` : `api/v1/presigned-url?filename=${filename}`,
  });

  return data;
};
