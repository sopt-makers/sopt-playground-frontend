import styled from '@emotion/styled';
import { FC } from 'react';

import { legacyColors } from '@/styles/colors';

interface DividerProps {
  className?: string;
  color?: string;
}
const Divider: FC<DividerProps> = ({ color = legacyColors.black60, className }) => {
  return <StyledDivider className={className} color={color} />;
};

export default Divider;

const StyledDivider = styled.hr<Pick<DividerProps, 'color'>>`
  border: none;
  background-color: ${({ color }) => color};
  width: 100%;
  height: 1.5px;
`;
