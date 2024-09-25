import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ReactNode } from 'react';

interface SkeletonProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  margin?: string;
  color?: string;
  children?: ReactNode;
}

const Skeleton = ({ width, height, borderRadius, color, margin, children, ...props }: SkeletonProps) => {
  return (
    <StyledSkeleton width={width} height={height} borderRadius={borderRadius} margin={margin} color={color} {...props}>
      {children}
    </StyledSkeleton>
  );
};

export default Skeleton;

const StyledSkeleton = styled.div<{
  width?: number;
  height?: number;
  borderRadius?: number;
  margin?: string;
  color?: string;
}>`
  margin: ${({ margin }) => margin && margin};
  border-radius: ${({ borderRadius }) => borderRadius && `${borderRadius}px`};
  background-color: ${({ color }) => color ?? colors.gray900};
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? `${height}px` : '100%')};
`;
