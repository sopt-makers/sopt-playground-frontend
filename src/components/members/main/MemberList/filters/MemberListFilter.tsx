import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { PropsWithChildren, ReactNode } from 'react';

import Select from '@/components/members/common/select/Select';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface Option<T> {
  value: T;
  label: ReactNode;
}

interface MemberListFilterProps<T> {
  className?: string;
  value?: string;
  defaultOption?: Option<T>;
  placeholder?: string;
  options: Option<T>[];
  onChange?: (value: string) => void;
}
export function MemberListFilter<T extends string>({
  className,
  value,
  defaultOption,
  placeholder,
  options,
  onChange,
  children,
}: PropsWithChildren<MemberListFilterProps<T>>) {
  return (
    <StyledSelect className={className} placeholder={placeholder} value={value} onChange={onChange} selected={!!value}>
      {defaultOption && <StyledSelectItem value={defaultOption?.value}>{defaultOption?.label}</StyledSelectItem>}
      {options.map((option) => (
        <StyledSelectItem key={option.value} value={option.value}>
          {option.label}
        </StyledSelectItem>
      ))}
      {children}
    </StyledSelect>
  );
}

export default MemberListFilter;

const StyledSelect = styled(Select)<{ selected: boolean }>`
  ${({ selected }) =>
    selected &&
    css`
      gap: 12px;
      border-color: ${colors.gray400};
      background-color: ${colors.gray800};
      color: ${colors.white};
    `};

  transition: background-color 0.2s;
  border-radius: 20px;
  padding: 9px 26px 9px 22px;
  min-width: 110px;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 14px;
    padding: 18px;

    &[data-placeholder] {
      ${textStyles.SUIT_16_B};
    }
  }
`;

const StyledSelectItem = styled(Select.Item)`
  color: ${colors.gray200};
`;
