import styled from '@emotion/styled';
import { SelectV2 } from '@sopt-makers/ui';
import { PropsWithChildren } from 'react';

import { Option } from '@/components/members/main/MemberList/filters/constants';

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
  defaultOption,
  placeholder,
  options,
  onChange,
  children,
}: PropsWithChildren<MemberListFilterProps<T>>) {
  return (
    <SelectV2.Root className={className} type='text' onChange={onChange}>
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
    </SelectV2.Root>
  );
}

export default MemberListFilter;

const StyledSelectTrigger = styled(SelectV2.TriggerContent)`
  width: fit-content;
`;
