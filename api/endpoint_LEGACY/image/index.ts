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
    url: `api/v1/presigned-url?filename=${encodeURIComponent(filename)}${type ? `&type=${type}` : ''}`,
  });

  return data;
};
