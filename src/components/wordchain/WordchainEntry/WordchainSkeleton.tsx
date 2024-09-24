import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Skeleton from '@/components/common/Skeleton';

const WordchainSkeletonDesktop = () => {
  return (
    <SkeletonWrapperDesktop borderRadius={14} height={60}>
      <LeftWrapper>
        <Skeleton width={28} height={28} borderRadius={8} color={colors.gray700} margin='0 8px 0 0' />
        <Skeleton width={47} height={20} borderRadius={8} color={colors.gray700} margin='0 16px 0 0' />
        <Skeleton width={286} height={20} borderRadius={8} color={colors.gray700} />
      </LeftWrapper>
      <Skeleton width={28} height={28} borderRadius={8} color={colors.gray700} />
    </SkeletonWrapperDesktop>
  );
};

const WordchainSkeletonMobile = () => {
  return (
    <SkeletonWrapperMobile borderRadius={14} height={80}>
      <Skeleton width={80} height={28} borderRadius={8} color={colors.gray700} margin='0 16px 0 0' />
      <RightWrapper>
        <Skeleton width={193} height={16} borderRadius={8} color={colors.gray700} />
        <Skeleton width={150} height={16} borderRadius={8} color={colors.gray700} />
      </RightWrapper>
    </SkeletonWrapperMobile>
  );
};

export { WordchainSkeletonDesktop, WordchainSkeletonMobile };

const SkeletonWrapperDesktop = styled(Skeleton)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const SkeletonWrapperMobile = styled(Skeleton)`
  display: flex;
  align-items: center;
  padding: 26px 16px;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
