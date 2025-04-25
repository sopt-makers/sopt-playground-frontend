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
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const BlogPage: FC = () => {
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
    return `${error}`.replace(/^Error:\s*/, '');
  })();

  return (
    <AuthRequired>
      <StyledBlogPage>
        <UploadBlog state={status} errorMessage={errorMessage} onSubmit={(url) => mutate(url)} />
      </StyledBlogPage>
    </AuthRequired>
  );
};

export default BlogPage;

setLayout(BlogPage, 'header');

const StyledBlogPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px 0;

  @media ${MOBILE_MEDIA_QUERY} {
    padding-top: 36px;
  }
`;
