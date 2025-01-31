import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconSwitchVertical } from '@sopt-makers/icons';
import { SelectV2 } from '@sopt-makers/ui';

import { Option } from '@/components/members/main/MemberList/filters/constants';

interface MemberListOrderProps<T> {
  className?: string;
  value?: Option<T>;
  options: Option<T>[];
  onChange?: (value: string) => void;
}

export function MemberListOrder<T extends string>({ className, value, options, onChange }: MemberListOrderProps<T>) {
  return (
    <SelectV2.Root className={className} type='text' onChange={onChange} defaultValue={value}>
      <SelectV2.Trigger>
        <StyledTriggerContent icon={<StyledIconSwitchVertical />} />
      </SelectV2.Trigger>
      <SelectV2.Menu>
        {options.map((option) => (
          <SelectV2.MenuItem key={option.value} option={option} />
        ))}
      </SelectV2.Menu>
    </SelectV2.Root>
  );
}

const StyledIconSwitchVertical = styled(IconSwitchVertical)`
  width: 20px;
  height: 20px;
  color: ${colors.gray300};
`;

const StyledTriggerContent = styled(SelectV2.TriggerContent)`
  background-color: transparent;

  & > p {
    color: ${colors.gray300};
  }
`;
