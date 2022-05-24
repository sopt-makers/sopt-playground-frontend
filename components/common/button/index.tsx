import styled from '@emotion/styled';
import { buttonSize, ButtonSize, ButtonStyle, buttonStyles } from 'components/common/button/style';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonStyle;
  size?: ButtonSize;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'medium', children, ...props }, ref) => {
    return (
      <StyledButton variant={variant} size={size} {...props} ref={ref}>
        {children}
      </StyledButton>
    );
  },
);

export default Button;

type StyledButtonProps = Required<Pick<ButtonProps, 'variant' | 'size'>>;

const StyledButton = styled.button<StyledButtonProps>`
  border-radius: 100px;
  cursor: pointer;
  line-height: 22px;
  font-size: 20px;
  font-weight: 500;
  ${({ variant, size }) => [buttonStyles[variant], buttonSize[size]]};
`;
