import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as Select from '@radix-ui/react-select';
import { FC, PropsWithChildren } from 'react';

import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import { buildCSSWithLength, CSSValueWithLength } from '@/utils';

interface SelectProps extends Select.SelectProps {
  placeholder?: string;
  width?: CSSValueWithLength;
  error?: boolean;
}

const SelectRoot: FC<PropsWithChildren<SelectProps>> = ({ width = 200, placeholder, children, error, ...props }) => {
  return (
    <Select.Root {...props}>
      <StyledTrigger width={width} error={error}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <img
            width={12}
            height={14}
            src="data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.42387 11.6742C9.18956 11.9086 8.80966 11.9086 8.57535 11.6742L3.70034 6.79924C3.46603 6.56492 3.46603 6.18503 3.70034 5.95071C3.93466 5.7164 4.31456 5.7164 4.54887 5.95071L8.99961 10.4014L13.4503 5.95071C13.6847 5.7164 14.0646 5.7164 14.2989 5.95071C14.5332 6.18503 14.5332 6.56492 14.2989 6.79924L9.42387 11.6742Z' fill='%23646464'/%3E%3C/svg%3E%0A"
            alt='select-arrow-icon'
          />
        </Select.Icon>
      </StyledTrigger>
      <Select.Portal>
        <StyledContent>
          <Select.ScrollUpButton />
          <Select.Viewport>{children}</Select.Viewport>
          <Select.ScrollDownButton />
        </StyledContent>
      </Select.Portal>
    </Select.Root>
  );
};

const StyledTrigger = styled(Select.Trigger)<Pick<SelectProps, 'width' | 'error'>>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: ${colors.black60};
  padding: 14px 20px;

  ${({ width }) => width && buildCSSWithLength('width', width)}
  ${({ error }) =>
    error &&
    css`
      border-color: ${colors.red100};

      &:focus {
        outline: none;
        border-color: ${colors.red100};
      }
    `}

  &[data-placeholder] {
    color: ${colors.gray80};
    ${textStyles.SUIT_16_M};
  }
`;

const StyledContent = styled(Select.Content)`
  border-radius: 12px;
  background: ${colors.black60};
  padding: 8px;
`;

interface SelectItemProps {
  value: string;
  disabled?: boolean;
}
const SelectItem: FC<PropsWithChildren<SelectItemProps>> = ({ value, children, disabled }) => {
  return (
    <StyledItem value={value} disabled={disabled}>
      <Select.ItemText>{children}</Select.ItemText>
    </StyledItem>
  );
};

const StyledItem = styled(Select.Item)`
  transition: color 0.2s background-color 0.2s;
  outline: none;
  border-radius: 6px;
  padding: 5px 10px;
  width: 100%;
  color: ${colors.gray80};

  &[data-highlighted] {
    outline: none;
    background-color: ${colors.black40};
    color: ${colors.white};
  }

  /* &[data-disabled] {
    disabled style을 추가해주세요
  } */
`;

const _Select = Object.assign(SelectRoot, {
  Item: SelectItem,
});

export default _Select;
