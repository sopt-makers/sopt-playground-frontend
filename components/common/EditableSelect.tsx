import styled from '@emotion/styled';
import { ChangeEvent, forwardRef, ReactElement, useState } from 'react';

import { InputProps } from '@/components/common/Input';
import Select from '@/components/common/Select';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface EditableSelectProps extends Omit<InputProps, 'value' | 'onChange'> {
  onChangeSelect: (value: string) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const EditableSelect = forwardRef<HTMLInputElement, EditableSelectProps>(
  (
    {
      width = 200,
      height = 50,
      disabled = false,
      children,
      error,
      onChange: onChangeInput,
      className,
      placeholder,
      onChangeSelect,
      ...props
    },
    ref,
  ) => {
    const [isEditable, setIsEditable] = useState(false);

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
      const editableOptionIndex = (children as ReactElement).props.options.length + 1;
      if (e.target.selectedIndex === editableOptionIndex) {
        onChangeSelect('');
      } else {
        onChangeSelect(e.target.value);
      }
      setIsEditable(e.target.selectedIndex === editableOptionIndex);
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeSelect(e.target.value);
      onChangeInput(e);
    };

    return (
      <StyledContainer width={width} height={height} className={className}>
        <StyledSelect width={width} className={className} onChange={handleSelect} disabled={disabled} error={error}>
          {children}
          <option label='직접입력' />
        </StyledSelect>
        <StyledInput
          onChange={handleInput}
          placeholder={isEditable ? '직접입력' : placeholder}
          readOnly={!isEditable}
          ref={ref}
          {...props}
        />
      </StyledContainer>
    );
  },
);

export default EditableSelect;

const StyledContainer = styled.div<{ width: number | string; height: number | string }>`
  position: relative;

  ${({ width }) => `width: ${width}${typeof width === 'number' ? 'px' : ''};`}
  ${({ height }) => `height: ${height}${typeof height === 'number' ? 'px' : ''};`}
`;

const StyledSelect = styled(Select)`
  position: absolute;
  top: 0;
  left: 0;
  color: transparent;
`;

const StyledInput = styled.input`
  position: absolute;
  top: 50%;
  left: 1.5px;
  transform: translateY(-50%);
  border: none;
  background-color: transparent;
  width: calc(100% - 42px);
  height: calc(100% - 3px);
  color: ${colors.gray30};

  ${textStyles.SUIT_16_M};
`;
