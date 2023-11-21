import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

import AuthRequired from '@/components/auth/AuthRequired';
import FeedDetail from '@/components/feed/detail/FeedDetail';
import { layoutCSSVariable } from '@/components/layout/utils';
import { playgroundLink } from '@/constants/links';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const FeedDetailPage = () => {
  const { query, status } = useStringRouterQuery(['id'] as const);
  const router = useRouter();
  // TODO: 이게 동작 잘 안함 고쳐야함
  const is뒤로가기스택있을경우 =
    typeof window !== undefined ? window.history.state && window.history.state.idx > 0 : false;

  return (
    <AuthRequired>
      {(status === 'loading' || status === 'error') && null}
      {status === 'success' ? (
        <Container>
          <DetailSlot>
            <FeedDetail
              postId={query.id}
              renderBackLink={({ children }) =>
                is뒤로가기스택있을경우 ? (
                  <button onClick={() => router.back()}>{children}</button>
                ) : (
                  <Link href={playgroundLink.feedList()}>{children}</Link>
                )
              }
              renderCategoryLink={({ children, categoryId }) => (
                <Link
                  href={{
                    pathname: playgroundLink.feedList(),
                    query: {
                      category: categoryId,
                    },
                  }}
                >
                  {children}
                </Link>
              )}
            />
          </DetailSlot>
        </Container>
      ) : null}
    </AuthRequired>
  );
};

setLayout(FeedDetailPage, 'header');

export default FeedDetailPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const DetailSlot = styled.div`
  min-width: 560px;
  height: ${layoutCSSVariable.contentAreaHeight};
  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    min-width: auto;
  }
`;
