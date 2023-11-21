import styled from '@emotion/styled';
import Link from 'next/link';

import AuthRequired from '@/components/auth/AuthRequired';
import FeedDetail from '@/components/feed/detail/FeedDetail';
import { layoutCSSVariable } from '@/components/layout/utils';
import { playgroundLink } from '@/constants/links';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { setLayout } from '@/utils/layout';

const FeedDetailPage = () => {
  const { query, status } = useStringRouterQuery(['id'] as const);

  return (
    <AuthRequired>
      {(status === 'loading' || status === 'error') && null}
      {status === 'success' ? (
        <Container>
          <DetailSlot>
            {/* TODO: 링크 바뀌면 뒤로가기 시 링크 반영 */}
            <FeedDetail
              postId={query.id}
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
  flex-basis: 560px;
  justify-content: center;
  width: 100%;
`;

const DetailSlot = styled.div`
  height: ${layoutCSSVariable.contentAreaHeight};
`;
