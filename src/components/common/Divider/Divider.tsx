import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC } from 'react';

interface DividerProps {
  className?: string;
  color?: string;
}
const Divider: FC<DividerProps> = ({ color = colors.gray700, className }) => {
  return <StyledDivider className={className} color={color} />;
};

export default Divider;

const StyledDivider = styled.hr<Pick<DividerProps, 'color'>>`
  border: none;
  background-color: ${({ color }) => color};
  width: 100%;
  height: 1.5px;
  min-height: 1.5px;;
`;
