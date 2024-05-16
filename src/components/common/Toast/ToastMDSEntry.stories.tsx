import { Meta } from '@storybook/react';

import ToastMDSEntry from '@/components/common/Toast/ToastMDSEntry';

export default {
  component: ToastMDSEntry,
} as Meta<typeof ToastMDSEntry>;

export const Default = {
  args: {
    message: '프로젝트를 하면서 배우고 느낀 점을 SOPT 회원들에게 공유해보세요.',
    isMds: true,
    buttonText: '공유하러 가기',
    linkUrl: '',
    status: 'success',
  },
};
