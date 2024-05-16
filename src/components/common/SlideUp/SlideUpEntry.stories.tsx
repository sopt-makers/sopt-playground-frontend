import { Meta } from '@storybook/react';

import SlideUpEntry from '@/components/common/SlideUp/SlideUpEntry';

export default {
  component: SlideUpEntry,
} as Meta<typeof SlideUpEntry>;

export const Default = {
  args: {
    message: '프로젝트를 하면서 배우고 느낀 점을 SOPT 회원들에게 공유해보세요.',
    buttonText: '공유하러 가기',
    linkUrl: '',
    status: 'success',
  },
};
