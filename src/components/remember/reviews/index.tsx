import { getReviews } from '@/api/endpoint/remember/getReviews';
import Loading from '@/components/common/Loading';
import ReviewCard from '@/components/remember/reviews/ReviewCard';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

export default function Reviews() {
  const { data: reviewData, isFetching } = useQuery({
    queryKey: ['getReviews'],
    queryFn: () => getReviews.request(),
  });

  return (
    <Container>
      {isFetching ? (
        <Loading />
      ) : (
        <ReviewCardWrapper>
          {reviewData &&
            reviewData.length > 0 &&
            reviewData.map(({ id, content }) => {
              return (
                <Card>
                  <ReviewCard key={id} id={id} content={content} />
                </Card>
              );
            })}
        </ReviewCardWrapper>
      )}
    </Container>
  );
}

const Card = styled.div``;

const Container = styled.div`
  padding: 0 242px;
`;

const ReviewCardWrapper = styled.section`
  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }
`;
