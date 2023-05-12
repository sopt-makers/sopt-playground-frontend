import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { PropsWithChildren, ReactNode } from 'react';

import Select from '@/components/members/common/select/Select';
import { colors } from '@/styles/colors';
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
      {defaultOption && <Select.Item value={defaultOption?.value}>{defaultOption?.label}</Select.Item>}
      {options.map((option) => (
        <Select.Item key={option.value} value={option.value}>
          {option.label}
        </Select.Item>
      ))}
      {children}
    </StyledSelect>
  );
}

export default MemberListFilter;

const StyledSelect = styled(Select)<{ selected: boolean }>`
  transition: background-color 0.2s;
  border-radius: 20px;
  padding: 9px 26px 9px 22px;
  min-width: 110px;

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${colors.purple100};
      color: ${colors.white};
    `};

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 14px;
    padding: 18px;

    &[data-placeholder] {
      ${textStyles.SUIT_16_B};
    }
  }
`;
