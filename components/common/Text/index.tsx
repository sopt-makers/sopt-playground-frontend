import styled from '@emotion/styled';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { colors } from '@/styles/colors';
import { baseTextStyles, textStyles, Typography } from '@/styles/typography';
import { css } from '@emotion/react';

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  typography?: Typography;
  color?: string;
  type?: 'default' | 'error';
}

const Text: FC<PropsWithChildren<TextProps>> = ({
  typography = 'SUIT_14_M',
  color = '#fcfcfc',
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

const StyledText = styled.span<Required<Pick<TextProps, 'typography' | 'color' | 'type'>>>`
  ${baseTextStyles};
  ${({ typography }) => textStyles[typography]}
  ${({ color }) => `color: ${color}`};

  ${({ type }) =>
    type === 'error' &&
    css`
      ${textStyles.SUIT_12_M}

      color: red;
    `}
`;
