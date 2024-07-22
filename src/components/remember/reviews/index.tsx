import { useGetReviewsInfiniteQuery } from '@/api/endpoint/remember/getReviews';
import Loading from '@/components/common/Loading';
import Responsive from '@/components/common/Responsive';
import ReviewCard from '@/components/remember/reviews/ReviewCard';
import { MasonryInfiniteGrid } from '@egjs/react-infinitegrid';
import styled from '@emotion/styled';

export default function Reviews() {
  const { data, isPending } = useGetReviewsInfiniteQuery();

  const reviewData = data?.pages.flatMap((page) => page) ?? [];

  const renderedReviewData =
    reviewData &&
    reviewData.length > 0 &&
    reviewData.map(({ id, content }) => {
      return <ReviewCard key={id} id={id} content={content} />;
    });

  return (
    <ReviewsContainer>
      {isPending ? (
        <Loading />
      ) : (
        <ReviewsWrapper>
          <Responsive only='mobile'>
            <ReviewCardMobileWrapper>{renderedReviewData}</ReviewCardMobileWrapper>
          </Responsive>
          <Responsive only='desktop'>
            <ReviewCardDesktopWrapper align='center' gap={16} column={3}>
              {renderedReviewData}
            </ReviewCardDesktopWrapper>
          </Responsive>
        </ReviewsWrapper>
      )}
    </ReviewsContainer>
  );
}

const ReviewsWrapper = styled.div`
  width: 100%;
`;

const ReviewsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ReviewCardMobileWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
  width: 100%;
`;

const ReviewCardDesktopWrapper = styled(MasonryInfiniteGrid)`
  margin-top: 48px;
`;
