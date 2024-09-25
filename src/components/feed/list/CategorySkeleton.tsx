import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Skeleton from '@/components/common/Skeleton';

const CategorySkeleton = () => {
  return (
    <CategorySkeletonWrapper>
      <Skeleton width={28} height={20} borderRadius={8} color={colors.gray700} />
      <Skeleton width={28} height={20} borderRadius={8} color={colors.gray700} />
      <Skeleton width={28} height={20} borderRadius={8} color={colors.gray700} />
      <Skeleton width={72} height={20} borderRadius={8} color={colors.gray700} />
      <Skeleton width={28} height={20} borderRadius={8} color={colors.gray700} />
      <Skeleton width={64} height={20} borderRadius={8} color={colors.gray700} />
    </CategorySkeletonWrapper>
  );
};

export default CategorySkeleton;

const CategorySkeletonWrapper = styled.div`
  display: flex;
  gap: 16px;
  border-bottom: 1px solid ${colors.gray800};
  padding: 14px 16px;
  width: 100%;
  height: 100%;
`;
