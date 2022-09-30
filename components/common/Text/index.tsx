import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';

import { baseTextStyles, textStyles, Typography } from '@/styles/typography';

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  typography?: Typography;
  color?: string;
  type?: 'default' | 'error';
}

const Text: FC<PropsWithChildren<TextProps>> = ({
  typography = 'SUIT_14_M',
  color,
  type = 'default',
  children,
  ...props
}) => {
  return (
    <StyledText typography={typography} color={color} type={type} {...props}>
      {children}
    </StyledText>
  );
};

export default Text;

const StyledText = styled.span<Pick<TextProps, 'typography' | 'color' | 'type'>>`
  ${baseTextStyles};
  ${({ typography }) => (typography ? textStyles[typography] : '')}
  ${({ color }) => (color ? `color: ${color}` : '')};

  ${({ type }) =>
    type === 'error' &&
    css`
      ${textStyles.SUIT_12_M}

      color: red;
    `}
`;
