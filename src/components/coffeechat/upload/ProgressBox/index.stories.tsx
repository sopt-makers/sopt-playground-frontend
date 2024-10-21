import { Meta } from '@storybook/react';

import ProgressBox from '@/components/coffeechat/upload/ProgressBox';

export default {
  component: ProgressBox,
} as Meta<typeof ProgressBox>;

export const Default = {
  args: { uploadType: '오픈', myInfoInprogress: false, coffeechatInfoInprogress: false },
  name: 'progress 박스 default',
};

export const MyInfoInProgress = {
  args: { uploadType: '오픈', myInfoInprogress: true, coffeechatInfoInprogress: false },
  name: 'progress 박스 내 정보 입력',
};

export const CoffeeChatInProgress = {
  args: { uploadType: '수정', myInfoInprogress: false, coffeechatInfoInprogress: true },
  name: 'progress 박스 커피챗 정보 입력',
};
