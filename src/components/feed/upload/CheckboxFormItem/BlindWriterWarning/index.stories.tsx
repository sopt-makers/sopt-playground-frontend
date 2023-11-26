import { Meta } from '@storybook/react';

import BlindWriterWarning from '@/components/feed/upload/CheckboxFormItem/BlindWriterWarning';

export default {
  component: BlindWriterWarning,
} as Meta<typeof BlindWriterWarning>;

export const Default = {
  args: {},
  name: '익명 경고',
};
