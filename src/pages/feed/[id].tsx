import styled from '@emotion/styled';

import AuthRequired from '@/components/auth/AuthRequired';
import FeedDetail from '@/components/feed/detail/FeedDetail';
import { layoutCSSVariable } from '@/components/layout/utils';
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
            <FeedDetail feedId={query.id} mode='detail' />
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
`;

const DetailSlot = styled.div`
  min-width: 560px;
  height: ${layoutCSSVariable.contentAreaHeight};

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    min-width: auto;
  }
`;
