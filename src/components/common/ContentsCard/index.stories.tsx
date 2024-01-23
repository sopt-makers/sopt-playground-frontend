import { Meta } from '@storybook/react';

import ContentsCard from '@/components/common/ContentsCard';

export default {
  component: ContentsCard,
} as Meta<typeof ContentsCard>;

export const Default = {
  args: {
    thumbnail:
      'https://makers-web-img.s3.ap-northeast-2.amazonaws.com/meeting/2024/01/08/213a1b06-35fd-4227-9029-3843f66622a3.png',
    title: '프로젝트 제목제목제목 제목입니다.',
    top: '프로젝트 유형 카테고리',
    bottom: '프로젝트 날짜 설명 이 프로젝트는 프로젝트입니다.',
    isCurrent: true,
  },

  name: 'Default',
};
