import { FC } from 'react';

import Checkbox from '@/components/common/Checkbox';
import Input from '@/components/common/Input';

interface PeriodFieldProps {
  value: Value;
  onChange: (v: Value) => void;
  error?: string;
}

type Value = { startAt: string; endAt: string | null };

const PeriodField: FC<PeriodFieldProps> = ({ value, onChange, error }) => {
  const handleChange =
    <K extends keyof Value>(key: K) =>
    (e: { target: { value: string } }) => {
      onChange({ ...value, [key]: e.target.value });
    };

  const handleOngoingChange = (newValue: boolean) => {
    if (newValue) {
      onChange({ ...value, endAt: null });
    } else {
      onChange({ ...value, endAt: '' });
    }
  };

  return (
    <div>
      <Input placeholder='from' value={value.startAt} onChange={handleChange('startAt')} />
      {value.endAt !== null && <Input placeholder='to' value={value.endAt} onChange={handleChange('endAt')} />}
      <Checkbox checked={value.endAt === null} onChange={(e) => handleOngoingChange(e.target.checked)} />
      error: {error}
    </div>
  );
};

export default PeriodField;
