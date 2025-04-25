import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { z } from 'zod';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { uploadSopticle } from '@/api/endpoint/sopticles/uploadSopticle';
import AuthRequired from '@/components/auth/AuthRequired';
import UploadBlog from '@/components/blog/UploadBlog';
import { playgroundLink } from '@/constants/links';
import { setLayout } from '@/utils/layout';

const SopticlePage: FC = () => {
  const router = useRouter();
  const { data } = useGetMemberOfMe();
  const { mutate, status, error } = useMutation({
    mutationFn: async (url: string) => {
      if (!data) {
        throw new Error('로그인 정보를 찾을 수 없습니다.');
      }
      if (!url.match(/^https*:\/\//)) {
        throw new Error('올바른 링크를 입력해주세요.');
      }
      return uploadSopticle.request(url, [data.id]);
    },
    onSuccess() {
      router.push(playgroundLink.blogSuccess());
    },
  });

  const errorMessage = (() => {
    if (axios.isAxiosError(error)) {
      const parsed = z.object({ code: z.string() }).safeParse(error.response?.data);

      if (parsed.success) {
        return parsed.data.code;
      }
    }
    return `${error}`;
  })();

  return (
    <AuthRequired>
      <StyledSopticlePage>
        <UploadBlog state={status} errorMessage={errorMessage} onSubmit={(url) => mutate(url)} />
      </StyledSopticlePage>
    </AuthRequired>
  );
};

export default SopticlePage;

setLayout(SopticlePage, 'header');

const StyledSopticlePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 20px 0;
`;
