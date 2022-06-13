import styled from '@emotion/styled';
import { forwardRef, SelectHTMLAttributes } from 'react';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  width?: number;
  disabled?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ width = 200, disabled = false, children, placeholder = '', ...props }, ref) => {
    return (
      <StyledSelect width={width} ref={ref} disabled={disabled} {...props}>
        <option value='' selected disabled hidden>
          {placeholder}
        </option>
        {children}
      </StyledSelect>
    );
  },
);

export default Select;

const StyledSelect = styled.select<Pick<SelectProps, 'width'>>`
  border: 1px solid transparent;
  border-radius: 6px;
  background: top 12px right 14px ${colors.black60} no-repeat
    url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.42387 11.6742C9.18956 11.9086 8.80966 11.9086 8.57535 11.6742L3.70034 6.79924C3.46603 6.56492 3.46603 6.18503 3.70034 5.95071C3.93466 5.7164 4.31456 5.7164 4.54887 5.95071L8.99961 10.4014L13.4503 5.95071C13.6847 5.7164 14.0646 5.7164 14.2989 5.95071C14.5332 6.18503 14.5332 6.56492 14.2989 6.79924L9.42387 11.6742Z' fill='%23646464'/%3E%3C/svg%3E%0A");
  padding: 14px 20px;
  color: ${colors.gray100};
  ${textStyles.SUIT_16_M};
  ${({ width }) => `width: ${width}px`};

  &:focus {
    border-color: ${colors.purple100};
  }
`;
