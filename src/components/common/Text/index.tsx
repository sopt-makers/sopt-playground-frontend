import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { CSSProperties, FC, HTMLAttributes, PropsWithChildren } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { space, SpaceProps } from '@/styles/spacing';
import { baseTextStyles, textStyles, Typography } from '@/styles/typography';
const TEXT_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'b', 'small', 'i', 'span', 'del', 'em', 'blockquote'] as const;
type As = keyof Pick<JSX.IntrinsicElements, (typeof TEXT_TAGS)[number]>;
interface TextProps extends HTMLAttributes<HTMLSpanElement>, SpaceProps {
  align?: CSSProperties['textAlign'];
  as?: As;
  color?: string;
  typography?: Typography;
  mobileTypography?: Typography;
  type?: 'default' | 'error';
  lineHeight?: number;
}

const Text: FC<PropsWithChildren<TextProps>> = ({
  align,
  as,
  typography = 'SUIT_14_M',
  mobileTypography,
  color,
  type = 'default',
  children,
  ...props
}) => {
  return (
    <StyledText
      as={as}
      align={align}
      typography={typography}
      mobileTypography={mobileTypography}
      color={color}
      type={type}
      {...props}
    >
      {children}
    </StyledText>
  );
};

export default Text;

const StyledText = styled.span<TextProps>`
  ${baseTextStyles};
  ${({ align }) => align && `text-align: ${align}`};
  ${({ typography }) => (typography ? textStyles[typography] : '')};
  ${({ color }) => (color ? `color: ${color}` : '')};
  ${({ lineHeight }) => lineHeight && `line-height: ${lineHeight}px`};
  ${({ type }) =>
    type === 'error' &&
    css`
      ${textStyles.SUIT_12_M}

      color: ${colors.error};
    `}
  @media ${MOBILE_MEDIA_QUERY} {
    ${({ mobileTypography }) => (mobileTypography ? textStyles[mobileTypography] : '')};
  }
  ${space};
`;
