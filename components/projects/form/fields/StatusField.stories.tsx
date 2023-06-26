import { Meta } from '@storybook/react';
import { useState } from 'react';

import StatusField from './StatusField';

export default {
  component: StatusField,
} as Meta<typeof StatusField>;

export const Default = {
  args: {},
  name: '기본',
};

export const WithStatus = () => {
  const [value, setValue] = useState({ isAvailable: false, isFounding: false });

  return <StatusField value={value} onChange={setValue} />;
};
