import styled from '@emotion/styled';
import * as Select from '@radix-ui/react-select';
import { colors } from '@sopt-makers/colors';
import dynamic from 'next/dynamic';
import React, { FC, PropsWithChildren, ReactNode, useEffect, useState } from 'react';

import Text from '@/components/common/Text';
import { SelectContext, useSelectContext } from '@/components/members/common/select/context';
import { Overlay } from '@/components/members/common/select/Overlay';
import IconArrowUpDown from '@/public/icons/icon-arrow-up-down.svg';
import { textStyles } from '@/styles/typography';

const SelectPortal = dynamic<Select.SelectPortalProps>(
  () => import('@radix-ui/react-select').then((r) => r.SelectPortal),
  {
    ssr: false,
  },
);

interface OrderBySelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
  trigger?: ReactNode;
}

const OrderBySelect: FC<OrderBySelectProps> = ({ className, value, options, onChange, trigger }) => {
  return (
    <SelectComp className={className} value={value} onChange={onChange} trigger={trigger}>
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectComp>
  );
};

export default OrderBySelect;

interface SelectCompProps extends Omit<Select.SelectProps, 'onValueChange'> {
  className?: string;
  onChange?: Select.SelectProps['onValueChange'];
  trigger?: ReactNode;
}

const SelectComp: FC<PropsWithChildren<SelectCompProps>> = ({ onChange, children, trigger, ...props }) => {
  const [open, onOpenChange] = useState<boolean>(false);
  const [label, onChangeLabel] = useState<ReactNode>();

  return (
    <SelectContext.Provider
      value={{
        value: props.value,
        label,
        onChangeLabel,
      }}
    >
      <Select.Root onValueChange={onChange} {...props} open={open} onOpenChange={onOpenChange}>
        <StyledTrigger>{trigger}</StyledTrigger>
        <SelectPortal>
          <>
            <Overlay open={open} />
            <StyledContent position='popper'>{children}</StyledContent>
          </>
        </SelectPortal>
      </Select.Root>
    </SelectContext.Provider>
  );
};

const StyledTrigger = styled(Select.Trigger)`
  display: flex;
  align-items: center;

  :focus {
    outline: none;
  }
`;

const StyledContent = styled(Select.Content)`
  margin-top: 4px;
  border-radius: 12px;
  background: ${colors.gray700};
  padding: 7px;
  width: 100%;
  max-height: 262px;
  overflow: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface SelectItemProps extends Select.SelectItemTextProps {
  value: string;
  disabled?: boolean;
}
const SelectItem: FC<PropsWithChildren<SelectItemProps>> = ({ value: valueProp, children, disabled, ...props }) => {
  const { value, onChangeLabel } = useSelectContext();

  useEffect(() => {
    if (value === valueProp) {
      onChangeLabel(children);
    }
  }, [value, valueProp, children, onChangeLabel]);

  return (
    <StyledItem value={valueProp} disabled={disabled} onClick={(e) => e.stopPropagation()} {...props}>
      <StyledItemText>{children}</StyledItemText>
    </StyledItem>
  );
};

const StyledItem = styled(Select.Item)`
  transition: color 0.2s background-color 0.2s;
  outline: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 5px 10px;
  width: 100%;
  color: ${colors.gray200};

  &[data-highlighted] {
    outline: none;
    background-color: ${colors.gray600};
    color: ${colors.gray10};
  }

  /* &[data-disabled] {
    disabled style을 추가해주세요
  } */
`;

const StyledItemText = styled(Select.ItemText)`
  ${textStyles.SUIT_16_M};
`;
