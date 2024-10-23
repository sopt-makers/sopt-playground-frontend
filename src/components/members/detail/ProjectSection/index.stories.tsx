import { Meta } from '@storybook/react';

import ProjectSection from '@/components/members/detail/ProjectSection';

export default {
  component: ProjectSection,
} as Meta<typeof ProjectSection>;

export const Default = {
  args: {
    profile: {
      name: '홍길동',
      projects: [
        {
          id: 1,
          category: 'APPJAM',
          generation: 35,
          serviceType: ['WEB'],
          name: '프로젝트 이름1',
          summary: '프로젝트 요약1',
          thumbnailImage:
            'https://wsrv.nl/?url=https%3A%2F%2Fs3.ap-northeast-2.amazonaws.com%2Fsopt-makers-internal%2F%2Fdev%2Fimage%2Fproject%2F297aefa4-f06f-4aff-b017-3308c26cf534-3d_chunsik.png&h=168&output=webp',
        },
        {
          id: 2,
          category: 'SOPKATHON',
          generation: 34,
          serviceType: ['APP'],
          name: '프로젝트 이름2',
          summary: '프로젝트 요약2',
          thumbnailImage:
            'https://wsrv.nl/?url=https%3A%2F%2Fs3.ap-northeast-2.amazonaws.com%2Fsopt-makers-internal%2F%2Fdev%2Fimage%2Fproject%2F08e783ca-e3bd-4144-9b29-fcf543ab3b27-tossfeed-thumbnail.png&h=168&output=webp',
        },
      ],
    },
  },
  name: 'Default',
};
