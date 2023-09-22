import { Meta } from '@storybook/react';
import { useState } from 'react';

import { DEFAULT_MEMBER } from '@/components/projects/upload/form/constants';

import MemberField from './MemberField';

export default {
  component: MemberField,
} as Meta<typeof MemberField>;

export const WithState = () => {
  const [value, onChange] = useState(DEFAULT_MEMBER);

  return (
    <MemberField
      value={value}
      onChange={onChange}
      onRemove={() => {
        //
      }}
    />
  );
};
