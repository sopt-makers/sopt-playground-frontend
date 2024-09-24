import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Skeleton from '@/components/common/Skeleton';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const WordchainSkeleton = () => {
  return (
    <SkeletonWrapper borderRadius={14} height={60}>
      <Skeleton1 width={28} height={28} borderRadius={8} color={colors.gray700} margin='0 8px 0 0' />
      <MiddleWrapper>
        <Skeleton2 width={47} height={20} borderRadius={8} color={colors.gray700} margin='0 16px 0 0' />
        <Skeleton3 width={286} height={20} borderRadius={8} color={colors.gray700} />
      </MiddleWrapper>
      <Skeleton4 width={28} height={28} borderRadius={8} color={colors.gray700} margin='0 0 0 115px' />
    </SkeletonWrapper>
  );
};

export default WordchainSkeleton;

const SkeletonWrapper = styled(Skeleton)`
  display: flex;
  align-items: center;
  padding: 16px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 20px 16px;
    height: 80px;
  }
`;

const MiddleWrapper = styled.div`
  display: flex;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 8px;
  }
`;

const Skeleton1 = styled(Skeleton)`
  @media ${MOBILE_MEDIA_QUERY} {
    width: 80px;
  }
`;

const Skeleton2 = styled(Skeleton)`
  @media ${MOBILE_MEDIA_QUERY} {
    margin-left: 16px;
    width: 193px;
    height: 16px;
  }
`;
const Skeleton3 = styled(Skeleton)`
  @media ${MOBILE_MEDIA_QUERY} {
    margin-left: 16px;
    width: 150px;
    height: 16px;
  }
`;

const Skeleton4 = styled(Skeleton)`
  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;
