import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Select from '@radix-ui/react-select';
import dynamic from 'next/dynamic';
import { FC, PropsWithChildren, ReactNode, useEffect, useState } from 'react';

import { SelectContext, useSelectContext } from '@/components/members/common/select/context';
import { Overlay } from '@/components/members/common/select/Overlay';
import IconClear from '@/public/icons/icon-search-clear.svg';
import IconSelectArrow from '@/public/icons/icon-select-arrow.svg';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

const SelectPortal = dynamic<Select.SelectPortalProps>(
  () => import('@radix-ui/react-select').then((r) => r.SelectPortal),
  {
    ssr: false,
  },
);

interface SelectProps extends Omit<Select.SelectProps, 'onValueChange'> {
  allowClear?: boolean;
  className?: string;
  placeholder?: string;
  error?: boolean;
  onChange?: Select.SelectProps['onValueChange'];
  onClear?: () => void;
}

const SelectRoot: FC<PropsWithChildren<SelectProps>> = ({
  allowClear = false,
  className,
  children,
  placeholder,
  onChange,
  onClear,
  error,
  ...props
}) => {
  const hasValue = !!props.value;
  const [label, onChangeLabel] = useState<ReactNode>();
  const [open, onOpenChange] = useState<boolean>(false);

  return (
    <SelectContext.Provider
      value={{
        value: props.value,
        label,
        onChangeLabel,
      }}
    >
      <Select.Root onValueChange={onChange} {...props} open={open} onOpenChange={onOpenChange}>
        <StyledWrapper allowClear={allowClear && hasValue}>
          <Select.Trigger className={className} asChild>
            <StyledTrigger error={error}>
              {props.value === undefined ? placeholder : label}
              <StyledIconArrow className='icon-arrow'>
                <IconSelectArrow width={18} height={18} alt='select-arrow-icon' />
              </StyledIconArrow>
            </StyledTrigger>
          </Select.Trigger>
          {allowClear && hasValue && (
            <StyledIconClear
              className='icon-clear'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClear?.();
              }}
            >
              <IconClear width={18} height={18} alt='clear-icon' />
            </StyledIconClear>
          )}
        </StyledWrapper>
        <SelectPortal>
          <>
            <Overlay open={open} />
            <ScrollArea.Root>
              <StyledContent position='popper'>
                <StyledScrollUpButton>
                  <IconSelectArrow width={18} height={18} alt='select-arrow-up' />
                </StyledScrollUpButton>
                <Select.Viewport asChild>
                  <ScrollArea.Viewport>{children}</ScrollArea.Viewport>
                </Select.Viewport>
                <StyledScrollDownButton>
                  <IconSelectArrow width={18} height={18} alt='select-arrow-down' />
                </StyledScrollDownButton>

                <StyledScrollbar orientation='vertical'>
                  <StyledThumb />
                </StyledScrollbar>
              </StyledContent>
            </ScrollArea.Root>
          </>
        </SelectPortal>
      </Select.Root>
    </SelectContext.Provider>
  );
};

const StyledWrapper = styled.div<{ allowClear: boolean }>`
  display: inline-block;
  position: relative;

  &:hover {
    ${({ allowClear }) =>
      allowClear &&
      css`
        & .icon-arrow {
          opacity: 0;
        }

        & .icon-clear {
          opacity: 1;
        }
      `}
  }
`;

const StyledTrigger = styled.div<Pick<SelectProps, 'error'>>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: ${colors.black60};
  cursor: pointer;
  padding: 14px 20px;
  width: 100%;
  color: ${colors.gray40};

  ${({ error }) =>
    error &&
    css`
      border-color: ${colors.red100};

      &:focus {
        outline: none;
        border-color: ${colors.red100};
      }
    `};

  &[data-placeholder] {
    ${textStyles.SUIT_16_M};
  }

  & .icon-arrow {
    transition: transform 0.3s;
  }

  &[data-state='open'] {
    .icon-arrow {
      transform: rotate(-180deg);
    }
  }
`;

const StyledContent = styled(Select.Content)`
  margin-top: 4px;
  border-radius: 12px;
  background: ${colors.black60};
  padding: 7px;
  width: var(--radix-select-trigger-width);
  max-height: 262px;
  overflow: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledIconArrow = styled(Select.Icon)`
  display: flex;
  align-items: center;
`;

const StyledIconClear = styled(Select.Icon)`
  display: flex;
  position: absolute;
  right: 20px;
  bottom: 50%;
  align-items: center;
  justify-content: center;
  transform: translateY(50%);
  transition: opacity 0.2s;
  opacity: 0;
  cursor: pointer;
`;

const StyledScrollUpButton = styled(Select.ScrollUpButton)`
  display: flex;
  justify-content: center;
  transform: rotate(180deg);
`;
const StyledScrollDownButton = styled(Select.ScrollDownButton)`
  display: flex;
  justify-content: center;
`;

const StyledScrollbar = styled(ScrollArea.Scrollbar)`
  display: flex;
  user-select: none;
  touch-action: none;
  padding: 8px 0;

  &[data-orientation='vertical'] {
    width: 4px;
  }
`;

const StyledThumb = styled(ScrollArea.Thumb)`
  position: relative;
  right: 8px;
  flex: 1;
  border-radius: 4px;
  background-color: ${colors.gray80};

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate('-50%', '-50%');
    width: 100%;
    min-width: 44;
    height: 100%;
    min-height: 56px;
    content: '';
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
      <Select.ItemText>{children}</Select.ItemText>
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
  color: ${colors.gray40};

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
