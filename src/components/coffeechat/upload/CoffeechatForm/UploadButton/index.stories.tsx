import { Meta } from '@storybook/react';

import UploadButton from '@/components/coffeechat/upload/CoffeechatForm/UploadButton';

export default {
  component: UploadButton,
} as Meta<typeof UploadButton>;

export const Default = {
  args: {},
  name: '커피챗 업로드 버튼',
};
