import { Meta } from '@storybook/react';

import { FORM_ITEMS } from '@/components/projects/upload/constants';
import UploadStatus from '@/components/projects/upload/FormStatus';

export default {
  component: UploadStatus,
} as Meta<typeof UploadStatus>;

export const Default = {
  args: {
    formItems: FORM_ITEMS.map((item) => ({
      ...item,
      isDirty: true,
    })),
  },

  name: '기본',
};
