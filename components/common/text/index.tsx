import styled from '@emotion/styled';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { colors } from 'styles/common/colors';
import { baseTextStyles, textStyles, Typography } from 'styles/common/typography';

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  typography?: Typography;
  color?: string;
}

const Text: FC<PropsWithChildren<TextProps>> = ({
  typography = 'SUIT_14_M',
  color = '#fcfcfc',
  children,
  ...props
}) => {
  return (
    <StyledText typography={typography} color={color} {...props}>
      {children}
    </StyledText>
  );
};

export default Text;

const StyledText = styled.span<Required<Pick<TextProps, 'typography' | 'color'>>>`
  ${baseTextStyles};
  ${({ typography }) => textStyles[typography]}
  ${({ color }) => `color: ${color}`};
`;
