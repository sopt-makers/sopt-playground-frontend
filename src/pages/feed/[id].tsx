import styled from '@emotion/styled';
import Link from 'next/link';

import AuthRequired from '@/components/auth/AuthRequired';
import Responsive from '@/components/common/Responsive';
import FeedDetail from '@/components/feed/detail/FeedDetail';
import { layoutCSSVariable } from '@/components/layout/utils';
import { playgroundLink } from '@/constants/links';
import useStringRouterQuery from '@/hooks/useStringRouterQuery';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

const FeedDetailPage = () => {
  const { query, status } = useStringRouterQuery(['id'] as const);

  return (
    <AuthRequired>
      {(status === 'loading' || status === 'error') && null}
      {status === 'success' ? (
        <Container>
          <DetailSlot>
            <FeedDetail
              postId={query.id}
              renderBackLink={({ children }) => <Link href={playgroundLink.feedList()}>{children}</Link>}
              renderCategoryLink={({ children, categoryId }) => (
                <>
                  <Responsive only='desktop' asChild>
                    <Link
                      href={{
                        pathname: playgroundLink.feedList(),
                        query: {
                          category: categoryId,
                          feed: query.id,
                        },
                      }}
                    >
                      {children}
                    </Link>
                  </Responsive>
                  <Responsive only='mobile' asChild>
                    <Link href={playgroundLink.feedList()}>{children}</Link>
                  </Responsive>
                </>
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
