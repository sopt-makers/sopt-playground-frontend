import { FocusEvent, InputHTMLAttributes, useState } from 'react';

import Input from '@/components/common/Input';

export interface MonthInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function MonthInput({ onFocus, onBlur, ...props }: MonthInputProps) {
  const [type, setType] = useState('text');

  const handleFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
    onFocus?.(e);
    setType('month');
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    onBlur?.(e);
    setType('text');
  };

  return <Input {...props} type={type} onFocus={handleFocus} onBlur={handleBlur} />;
}
