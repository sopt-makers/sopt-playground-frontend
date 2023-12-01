import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useQuery } from '@tanstack/react-query';
import { ErrorBoundary } from '@toss/error-boundary';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

import { getCategory } from '@/api/endpoint/feed/getCategory';
import { LoggingPageView } from '@/components/eventLogger/components/LoggingPageView';
import { useCategoryParam } from '@/components/feed/common/queryParam';
import CategorySelect from '@/components/feed/list/CategorySelect';
import FeedListItems from '@/components/feed/list/FeedListItems';
import { layoutCSSVariable } from '@/components/layout/utils';
import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface FeedListProps {
  renderFeedDetailLink: (props: { children: ReactNode; feedId: string }) => ReactNode;
}

const FeedList: FC<FeedListProps> = ({ renderFeedDetailLink }) => {
  const [categoryId] = useCategoryParam({ defaultValue: '' });
  const { data: categoryData } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
  });

  const categories = categoryData?.map((category) => ({
    id: `${category.id}`,
    name: category.name,
    hasAllCategory: true,
    tags: category.children.map((item) => ({
      id: `${item.id}`,
      name: item.name,
    })),
  }));

  return (
    <LoggingPageView eventKey='feedList'>
      <Container>
        <CategoryArea>{categories && <CategorySelect categories={categories} />}</CategoryArea>
        <HeightSpacer>
          <ErrorBoundary
            renderFallback={(error) => (
              <div css={{ textAlign: 'center' }}>
                게시글을 보여주는데 문제가 발생했어요.
                <br />({error.error.message})
              </div>
            )}
          >
            <FeedListItems categoryId={categoryId} renderFeedDetailLink={renderFeedDetailLink} />
          </ErrorBoundary>
        </HeightSpacer>
        <UploadLink href={playgroundLink.feedUpload()}>
          <UploadIcon />
        </UploadLink>
      </Container>
    </LoggingPageView>
  );
};

export default FeedList;

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;

const CategoryArea = styled.div`
  position: sticky;
  top: ${layoutCSSVariable.globalHeaderHeight};
  z-index: 1; /* Virtuoso가 sticky 위에 와버리는 문제때문에 z-index로 제어 */
  background-color: ${colors.background};
`;

const HeightSpacer = styled.div`
  min-height: 80vh;
`;

const UploadLink = styled(Link)`
  display: flex;
  position: sticky;
  bottom: 32px;
  align-items: center;
  justify-content: center;
  z-index: 1; /* Virtuoso가 sticky 위에 와버리는 문제때문에 z-index로 제어 */
  margin-right: 32px;
  margin-left: auto;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 15%);
  background-color: ${colors.gray10};
  width: 48px;
  height: 48px;

  @media ${MOBILE_MEDIA_QUERY} {
    bottom: 16px;
    margin-right: 16px;
  }
`;

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M11.103 1.103a1.103 1.103 0 10-2.206 0v7.794H1.103a1.103 1.103 0 100 2.206h7.794v7.794a1.103 1.103 0 002.206 0v-7.794h7.794a1.103 1.103 0 100-2.206h-7.794V1.103z'
        fill='#0F0F12'
      />
    </svg>
  );
}
