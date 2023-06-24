import { Meta } from '@storybook/react';
import { useState } from 'react';

import ServiceTypeField, { serviceType } from './ServiceTypeField';

export default {
  component: ServiceTypeField,
} as Meta<typeof ServiceTypeField>;

export const Default = {
  args: {
    value: [serviceType.APP],
    onChange: () => {
      //
    },
  },

  name: '기본',
};

export const WithState = () => {
  const [value, onChange] = useState<string[]>([]);

  return <ServiceTypeField value={value} onChange={onChange} />;
};
