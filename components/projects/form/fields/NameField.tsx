import { FC } from 'react';

import Input from '@/components/common/Input';

interface NameFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const NameField: FC<NameFieldProps> = ({ value, onChange, error }) => {
  return (
    <div>
      <Input type='text' value={value} onChange={(e) => onChange(e.target.value)} />
      {error}
    </div>
  );
};

export default NameField;
