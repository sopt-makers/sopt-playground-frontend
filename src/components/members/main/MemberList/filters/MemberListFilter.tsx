import styled from '@emotion/styled';
import { SelectV2 } from '@sopt-makers/ui';
import { PropsWithChildren } from 'react';

import { Option } from '@/components/members/main/MemberList/filters/constants';

interface MemberListFilterProps<T> {
  className?: string;
  value?: Option<T>;
  defaultOption?: Option<T>;
  placeholder?: string;
  options: Option<T>[];
  onChange?: (value: string | number | boolean) => void;
}
export function MemberListFilter<T extends string>({
  className,
  defaultOption,
  placeholder,
  options,
  value,
  onChange,
  children,
}: PropsWithChildren<MemberListFilterProps<T>>) {
  return (
    <StyledSelectRoot key={value?.value} className={className} type='text' onChange={onChange} defaultValue={value}>
      <SelectV2.Trigger>
        <StyledSelectTrigger placeholder={placeholder} />
      </SelectV2.Trigger>
      <SelectV2.Menu>
        {defaultOption && <SelectV2.MenuItem option={defaultOption} />}
        {options.map((option) => (
          <SelectV2.MenuItem key={option.value} option={option} />
        ))}
        {children}
      </SelectV2.Menu>
    </StyledSelectRoot>
  );
}

export default MemberListFilter;

const StyledSelectRoot = styled(SelectV2.Root)`
  position: unset;
`;

const StyledSelectTrigger = styled(SelectV2.TriggerContent)`
  width: max-content;
  min-width: fit-content;
`;
