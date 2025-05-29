import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Skeleton from '@/components/common/Skeleton';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface FeedSkeletonProps {
  count?: number;
}

const FeedSkeleton = ({ count = 4 }: FeedSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <FeedSkeletonWrapper key={index}>
          <SkeletonResponsive1 width={32} height={32} borderRadius={16} color={colors.gray700} />
          <RightWrapper>
            <Skeleton width={184} height={16} borderRadius={8} color={colors.gray700} margin='0 0 24px 0' />
            <Skeleton height={20} borderRadius={8} color={colors.gray700} margin='0 0 8px 0' />
            <SkeletonResponsive2 width={307} height={20} borderRadius={8} color={colors.gray700} margin='0 0 28px 0' />
            <BottomWrapper>
              <Skeleton width={74} height={20} borderRadius={8} color={colors.gray700} margin='0 0 28px 0' />
              <Skeleton width={48} height={20} borderRadius={8} color={colors.gray700} margin='0 0 28px 0' />
            </BottomWrapper>
          </RightWrapper>
        </FeedSkeletonWrapper>
      ))}
    </>
  );
};

export default FeedSkeleton;

const FeedSkeletonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  width: 100%;
  height: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 12px;
    justify-content: flex-start;
  }
`;
const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  margin-right: 24px;
  width: 100%;
  max-width: 460px;
`;
const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SkeletonResponsive1 = styled(Skeleton)`
  @media ${MOBILE_MEDIA_QUERY} {
    flex-shrink: 0;
  }
`;

const SkeletonResponsive2 = styled(Skeleton)`
  @media ${MOBILE_MEDIA_QUERY} {
    width: 184px;
  }
`;
