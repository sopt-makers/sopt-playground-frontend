import styled from '@emotion/styled';
import { fonts } from '@sopt-makers/fonts';
import React from 'react';

interface LabelProps {
  required?: boolean;
  children?: React.ReactNode;
  size?: 'small';
}

const Label = ({ required, children, size }: LabelProps) => {
  return (
    <SLabel required={required} size={size}>
      {children}
    </SLabel>
  );
};

export default Label;

const SLabel = styled.label<{ required?: boolean; size?: 'small' }>`
  margin-bottom: 8px;
  display: inline-block;
  width: 100%;
  color: ${({ size }) => (size === 'small' ? '#9E9E9E' : '#1A1A1A')}; /* $gray50 / $gray10 */
  ${fonts.LABEL_14_SB};

  ${({ required }) =>
    required &&
    `
    &::after {
      content: ' *';
      margin-left: 1px;
      color: #FF6B6B; /* $secondary */
    }
  `}
`;
