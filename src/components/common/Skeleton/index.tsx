import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

interface SkeletonProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  color?: string;
}

const Skeleton = ({ width, height, borderRadius, color }: SkeletonProps) => {
  return <StyledSkeleton width={width} height={height} borderRadius={borderRadius} color={color} />;
};

export default Skeleton;

const StyledSkeleton = styled.div<{ width?: number; height?: number; borderRadius?: number; color?: string }>`
  border-radius: ${({ borderRadius }) => borderRadius && `${borderRadius}%`};
  background-color: ${({ color }) => color ?? colors.gray900};
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? `${height}px` : '100%')};
`;
