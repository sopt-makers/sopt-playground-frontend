import { FC } from 'react';

import Checkbox from '@/components/common/Checkbox';
import Input from '@/components/common/Input';

interface PeriodFieldProps {
  value: Value;
  onChange: (v: Value) => void;
  error?: string;
}

type Value = { isOngoing: boolean; startAt: string; endAt?: string };

const PeriodField: FC<PeriodFieldProps> = ({ value, onChange }) => {
  const handleChange =
    <K extends keyof Value>(key: K) =>
    (e: { target: { value: string } }) => {
      onChange({ ...value, [key]: e.target.value });
    };

  const handleOngoingChange = (v: boolean) => {
    if (v) {
      onChange({ ...value, endAt: undefined, isOngoing: v });
    } else {
      onChange({ ...value, isOngoing: v });
    }
  };

  return (
    <div>
      <Input placeholder='from' value={value.startAt} onChange={handleChange('startAt')} />
      {!value.isOngoing && <Input placeholder='to' value={value.endAt} onChange={handleChange('endAt')} />}
      <Checkbox checked={value.isOngoing} onChange={(e) => handleOngoingChange(e.target.checked)} />
    </div>
  );
};

export default PeriodField;
