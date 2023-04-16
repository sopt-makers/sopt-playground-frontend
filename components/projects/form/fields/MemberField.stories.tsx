import { ComponentMeta } from '@storybook/react';
import { useState } from 'react';

import MemberField, { Value } from './MemberField';

export default {
  component: MemberField,
} as ComponentMeta<typeof MemberField>;

export const WithState = () => {
  const [value, onChange] = useState<Value>({ memberId: undefined, memberDescription: '', memberRole: undefined });
  console.log('[value]: ', value);

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
