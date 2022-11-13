import styled from '@emotion/styled';
import { ChangeEvent, forwardRef, ReactElement, useState } from 'react';

import { InputProps } from '@/components/common/Input';
import Select from '@/components/common/Select';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface EditableSelectProps extends Omit<InputProps, 'value' | 'onSelect'> {
  onSelect: (value: string) => void;
  value: string;
}

const EditableSelect = forwardRef<HTMLInputElement, EditableSelectProps>(
  (
    { width = 200, height = 50, disabled = false, children, error, className, placeholder, onSelect, ...props },
    ref,
  ) => {
    const [isEditable, setIsEditable] = useState(false);

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
      const editableOptionIndex = (children as ReactElement).props.options.length + 1;
      setIsEditable(e.target.selectedIndex === editableOptionIndex);
      onSelect(e.target.selectedIndex === editableOptionIndex ? '' : e.target.value);
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
      onSelect(e.target.value);
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
