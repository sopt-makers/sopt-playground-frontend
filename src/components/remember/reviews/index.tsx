import { getReviews } from '@/api/endpoint/remember/getReviews';
import Loading from '@/components/common/Loading';
import Responsive from '@/components/common/Responsive';
import ReviewCard from '@/components/remember/reviews/ReviewCard';
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

export default function Reviews() {
  const { data: reviewData, isFetching } = useQuery({
    queryKey: ['getReviews'],
    queryFn: () => getReviews.request(),
  });

  const renderedReviewData =
    reviewData &&
    reviewData.length > 0 &&
    reviewData.map(({ id, content }) => {
      return <ReviewCard key={id} id={id} content={content} />;
    });

  return (
    <Container>
      {isFetching ? (
        <Loading />
      ) : (
        <>
          <Responsive only='mobile'>
            <ReviewCardMobileWrapper>{renderedReviewData}</ReviewCardMobileWrapper>
          </Responsive>
          <Responsive only='desktop'>
            <MasonryInfiniteGrid align='center' gap={16} column={3}>
              {renderedReviewData}
            </MasonryInfiniteGrid>
          </Responsive>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const ReviewCardMobileWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const ReviewCardDesktopWrapper = styled(MasonryInfiniteGrid)``;
