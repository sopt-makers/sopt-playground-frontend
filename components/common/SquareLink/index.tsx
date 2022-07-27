import styled from '@emotion/styled';
import { buttonSize, ButtonSize, ButtonStyle, buttonStyles } from '@/components/common/SquareLink/style';
import { AnchorHTMLAttributes, forwardRef } from 'react';
import { textStyles } from '@/styles/typography';

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonStyle;
  size?: ButtonSize;
}

const SquareLink = forwardRef<HTMLAnchorElement, ButtonProps>(
  ({ variant = 'default', size = 'medium', children, ...props }, ref) => {
    return (
      <StyledSquareLink variant={variant} size={size} {...props} ref={ref}>
        {children}
      </StyledSquareLink>
    );
  },
);

export default SquareLink;

type StyledSquareLinkProps = Required<Pick<ButtonProps, 'variant' | 'size'>>;

const StyledSquareLink = styled.a<StyledSquareLinkProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  ${textStyles.SUIT_16_M};
  ${({ variant, size }) => [buttonStyles[variant], buttonSize[size]]};
`;
