import { Meta, StoryObj } from '@storybook/react';

import MobileProjectCard from './MobileProjectCard';

const meta = {
  component: MobileProjectCard,
} satisfies Meta<typeof MobileProjectCard>;
export default meta;

type Story = StoryObj<typeof meta>;

const 프로젝트_썸네일 = {
  플레이스픽:
    'https://github.com/sopt-makers/sopt-playground-frontend/assets/26808056/4fade4ec-c0b4-4fa1-b53f-255428938430',
};

export const Default = {
  args: {
    thumbnailImage: 프로젝트_썸네일.플레이스픽,
    title: '플레이스픽',
    serviceType: ['WEB', 'APP'],
    memberList: [
      {
        id: '1',
        profileImage: 프로젝트_썸네일.플레이스픽,
      },
      {
        id: '2',
        profileImage: 프로젝트_썸네일.플레이스픽,
      },
      {
        id: '3',
        profileImage: 프로젝트_썸네일.플레이스픽,
      },
    ],
    summary: '모기 발생 현황과 예방 및 퇴치 정보를 제공하고 이를 평가하고 비교할 수 있는 서비스',
    isAvailable: true,
    isFounding: true,
  },
} satisfies Story;
