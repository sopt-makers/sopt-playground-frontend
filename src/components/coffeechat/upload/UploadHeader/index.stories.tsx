import { Meta } from '@storybook/react';

import UploadHeader from '@/components/coffeechat/upload/UploadHeader';

export default {
  component: UploadHeader,
} as Meta<typeof UploadHeader>;

export const Default = {
  args: { uploadType: '오픈' },
  name: '커피챗 헤더',
};
