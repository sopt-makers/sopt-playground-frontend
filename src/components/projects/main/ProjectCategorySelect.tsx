import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as Select from '@radix-ui/react-select';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import dynamic from 'next/dynamic';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';

import { SelectContext, useSelectContext } from '@/components/members/common/select/context';
import { Overlay } from '@/components/members/common/select/Overlay';
import IconClear from '@/public/icons/icon-search-clear.svg';

const SelectPortal = dynamic<Select.SelectPortalProps>(
  () => import('@radix-ui/react-select').then((r) => r.SelectPortal),
  {
    ssr: false,
  },
);

type Size = 'medium' | 'small';

interface ProjectCategorySelectProps extends Select.SelectProps {
  className?: string;
  placeholder: string;
  size?: Size;
  allowClear?: boolean;
  onClear?: () => void;
}

const ProjectCategorySelect = ({
  className,
  placeholder,
  size = 'medium',
  allowClear = false,
  onClear,
  children,
  ...props
}: PropsWithChildren<ProjectCategorySelectProps>) => {
  const hasValue = !!props.value;
  const [label, setLabel] = useState<ReactNode>();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <SelectContext.Provider
      value={{
        value: props.value,
        label,
        onChangeLabel: setLabel,
        size,
      }}
    >
      <Select.Root {...props} open={open} onOpenChange={setOpen}>
        <StyledWrapper allowClear={allowClear && hasValue}>
          <StyledTrigger
            className={className}
            css={[hasValue || open ? { background: colors.gray800 } : null, getTriggerStyle(size)]}
          >
            {props.value != null ? label : placeholder}
            <Select.Icon
              className='icon-arrow'
              css={[{ transition: 'transform 0.3s' }, open ? { transform: 'rotate(-180deg)' } : undefined]}
            >
              <IconArrowDown />
            </Select.Icon>
          </StyledTrigger>
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
            <StyledContent position='popper' align='center' css={getContentStyle(size)}>
              {children}
            </StyledContent>
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

const StyledIconClear = styled(Select.Icon)`
  display: flex;
  position: absolute;
  right: 12px;
  bottom: 50%;
  align-items: center;
  justify-content: center;
  transform: translateY(50%);
  transition: opacity 0.2s;
  opacity: 0;
  cursor: pointer;
`;

const getTriggerStyle = (size: Size) => {
  switch (size) {
    case 'medium':
      return css`
        padding: 10px 12px;
        width: 162px;
        ${fonts.LABEL_16_SB}
      `;
    case 'small':
      return css`
        padding: 10px 12px;
        width: 134px;
        ${fonts.LABEL_12_SB};
      `;
  }
};

const StyledTrigger = styled(Select.Trigger)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.3s;
  border-radius: 8px;
  background: ${colors.gray950};

  &:hover {
    background: ${colors.gray800};
  }
`;

const IconArrowDown = () => (
  <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M1.7109 4.3359C1.89315 4.15366 2.18862 4.15366 2.37087 4.3359L6.99922 8.96425L11.6276 4.3359C11.8098 4.15366 12.1053 4.15366 12.2875 4.3359C12.4698 4.51815 12.4698 4.81362 12.2875 4.99587L7.3292 9.9542C7.14696 10.1364 6.85148 10.1364 6.66924 9.9542L1.7109 4.99587C1.52866 4.81362 1.52866 4.51815 1.7109 4.3359Z'
      fill='#FCFCFC'
    />
  </svg>
);

const getContentStyle = (size: Size) => {
  switch (size) {
    case 'medium':
      return css`
        margin-top: 10px;
        width: 160px;
      `;
    case 'small':
      return css`
        margin-top: 12px;
        width: 125px;
      `;
  }
};

const StyledContent = styled(Select.Content)`
  gap: 10px;
  border-radius: 8px;
  background-color: ${colors.gray800};
  padding: 8px;
`;

interface SelectItemProps extends Select.SelectItemTextProps {
  value: string;
  disabled?: boolean;
}
const SelectItem = ({ value: valueProp, children, disabled, ...props }: PropsWithChildren<SelectItemProps>) => {
  const { value, onChangeLabel, size = 'medium' } = useSelectContext();

  useEffect(() => {
    if (value === valueProp) {
      onChangeLabel(children);
    }
  }, [value, valueProp, children, onChangeLabel]);

  return (
    <StyledItem
      css={getSelectItemStyle(size)}
      value={valueProp}
      disabled={disabled}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      <Select.ItemText>{children}</Select.ItemText>
    </StyledItem>
  );
};

const getSelectItemStyle = (size: Size) => {
  switch (size) {
    case 'medium':
      return css`
        padding: 10px 14px;
        ${fonts.BODY_16_M}
      `;
    case 'small':
      return css`
        padding: 12px 14px;
        ${fonts.LABEL_12_SB}
      `;
  }
};

const StyledItem = styled(Select.Item)`
  transition: color 0.3s background-color 0.3s;
  outline: none;
  border-radius: 8px;
  background-color: ${colors.gray800};
  cursor: pointer;
  width: 100%;

  &[data-highlighted] {
    outline: none;
    background-color: ${colors.gray700};
  }

  /* &[data-disabled] {
      disabled style을 추가해주세요
    } */
`;

export default Object.assign(ProjectCategorySelect, {
  Item: SelectItem,
});
