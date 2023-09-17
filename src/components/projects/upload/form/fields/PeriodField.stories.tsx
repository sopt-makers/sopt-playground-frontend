import { Meta } from '@storybook/react';

import PeriodField from '@/components/projects/upload/form/fields/PeriodField';

export default {
  component: PeriodField,
} as Meta<typeof PeriodField>;

export const Basic = {
  args: {
    value: {
      startAt: '2022-10',
      endAt: '2023-01',
    },
  },
};
