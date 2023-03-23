import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Select from '@radix-ui/react-select';
import { FC, PropsWithChildren, useState } from 'react';

import IconClear from '@/public/icons/icon-search-clear.svg';
import IconSelectArrow from '@/public/icons/icon-select-arrow.svg';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import { buildCSSWithLength, CSSValueWithLength } from '@/utils';

interface SelectProps extends Omit<Select.SelectProps, 'onValueChange'> {
  allowClear?: boolean;
  className?: string;
  placeholder?: string;
  width?: CSSValueWithLength;
  error?: boolean;
  onChange?: Select.SelectProps['onValueChange'];
  onClear?: () => void;
}

const SelectRoot: FC<PropsWithChildren<SelectProps>> = ({
  allowClear = false,
  className,
  children,
  width = 200,
  placeholder,
  onChange,
  onClear,
  error,
  ...props
}) => {
  const hasValue = !!props.value;
  const [resetKey, setResetKey] = useState(+new Date());

  return (
    <Select.Root key={resetKey} onValueChange={onChange} {...props}>
      <StyledWrapper allowClear={allowClear && hasValue}>
        <StyledTrigger className={className} width={width} error={error}>
          <Select.Value placeholder={placeholder} />
          <Select.Icon className='icon-arrow'>
            <IconSelectArrow width={18} height={18} alt='select-arrow-icon' />
          </Select.Icon>
        </StyledTrigger>
        {allowClear && hasValue && (
          <StyledIconClear
            className='icon-clear'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClear?.();
              setResetKey(+new Date());
            }}
          >
            <IconClear width={18} height={18} alt='clear-icon' />
          </StyledIconClear>
        )}
      </StyledWrapper>
      <Select.Portal>
        <ScrollArea.Root>
          <StyledContent position='popper' width={width}>
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
      </Select.Portal>
    </Select.Root>
  );
};

const StyledWrapper = styled.div<{ allowClear: boolean }>`
  display: inline-block;
  position: relative;

  &:hover {
    ${({ allowClear }) =>
      allowClear &&
      css`
        .icon-arrow {
          opacity: 0;
        }

        .icon-clear {
          opacity: 1;
        }
      `}
  }
`;

const StyledTrigger = styled(Select.Trigger)<Pick<SelectProps, 'width' | 'error'>>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: ${colors.black60};
  padding: 14px 20px;
  color: ${colors.gray80};

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
    ${textStyles.SUIT_16_M};
  }
`;

const StyledContent = styled(Select.Content)<Pick<SelectProps, 'width'>>`
  margin-top: 4px;
  border-radius: 12px;
  background: ${colors.black60};
  padding: 8px;
  max-height: 262px;
  overflow: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ width }) => width && buildCSSWithLength('width', width)}
`;

const StyledIconClear = styled(Select.Icon)`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
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
