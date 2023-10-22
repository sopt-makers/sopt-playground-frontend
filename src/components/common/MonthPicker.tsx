import 'react-datepicker/dist/react-datepicker.css';

import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import DatePicker from 'react-datepicker';

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
  border: 1.5px solid ${colors.black60};
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 14px 20px;
  width: 100%;
  color: ${colors.gray10};
  ${textStyles.SUIT_16_M};

  &::placeholder {
    color: ${colors.gray100};
  }

  &:focus {
    outline: none;
    border-color: ${colors.gray40};
    background-color: ${colors.black80};
  }
`;
