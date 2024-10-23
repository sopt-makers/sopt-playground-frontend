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
  onDefaultClick?: () => void;
}
export function MemberListFilter<T extends string>({
  className,
  defaultOption,
  placeholder,
  options,
  value,
  onChange,
  children,
  onDefaultClick,
}: PropsWithChildren<MemberListFilterProps<T>>) {
  return (
    <SelectV2.Root key={value?.value} className={className} type='text' onChange={onChange} defaultValue={value}>
      <SelectV2.Trigger>
        <StyledSelectTrigger placeholder={placeholder} />
      </SelectV2.Trigger>
      <SelectV2.Menu>
        {defaultOption && <SelectV2.MenuItem onClick={onDefaultClick} option={defaultOption} />}
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
  width: max-content;
  min-width: fit-content;
`;
