import { Meta } from '@storybook/react';

import MemberProjectCard from '@/components/members/detail/ActivitySection/MemberProjectCard';

export default {
  component: MemberProjectCard,
} as Meta<typeof MemberProjectCard>;

export const Default = {
  args: {
    id: 1,
    name: '프로젝트',
    category: 'APPJAM',
    generation: 33,
    serviceType: ['WEB'],
    summary: '프로젝트 설명입니다.',
    thumbnailImage:
      'https://wsrv.nl/?url=https%3A%2F%2Fs3.ap-northeast-2.amazonaws.com%2Fsopt-makers-internal%2F%2Fprod%2Fimage%2Fproject%2F825e15cb-5cc0-4265-9cee-6a44012c33ca-%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF2.png&w=760&output=webp',
    logoImage:
      'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/45e0e482-c6d0-4f20-b9a3-776dc2db4939-%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png',
  },
  name: '기본',
};
