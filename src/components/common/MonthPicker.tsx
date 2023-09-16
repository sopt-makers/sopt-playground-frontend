import 'react-datepicker/dist/react-datepicker.css';

import styled from '@emotion/styled';
import DatePicker from 'react-datepicker';

import { legacyColors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

export interface MonthPickerProps {
  onChange: (date: Date) => void;
  value: Date | null;
  placeholder?: string;
}

export default function MonthPicker({ onChange, value, placeholder }: MonthPickerProps) {
  return (
    <StyledDatePicker
      selected={value}
      onChange={(date: Date) => onChange?.(date)}
      dateFormat='yyyy-MM'
      showMonthYearPicker
      preventOpenOnFocus
      placeholderText={placeholder}
    />
  );
}

const StyledDatePicker = styled(DatePicker)`
  box-sizing: border-box;
  transition: all 0.2s;
  border: 1.5px solid ${legacyColors.black60};
  border-radius: 6px;
  background-color: ${legacyColors.black60};
  padding: 14px 20px;
  width: 100%;
  color: ${legacyColors.white};
  ${textStyles.SUIT_16_M};

  &::placeholder {
    color: ${legacyColors.gray100};
  }

  &:focus {
    outline: none;
    border-color: ${legacyColors.purple100};
    background-color: ${legacyColors.black80};
  }
`;
