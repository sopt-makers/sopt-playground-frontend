import { Meta, StoryObj } from '@storybook/react';

import ProjectCard from './ProjectCard';

const meta = {
  component: ProjectCard,
} satisfies Meta<typeof ProjectCard>;
export default meta;

type Story = StoryObj<typeof meta>;

const 프로젝트_이미지 = {
  타투어:
    'https://github.com/sopt-makers/sopt-playground-frontend/assets/26808056/392e5423-06b0-4b50-ac39-6cd51449536a',
};

export const Default = {
  args: {
    image: 프로젝트_이미지.타투어,
    title: 'TATTOUR (타투어)',
    serviceType: ['APP', 'WEB'],
    summary:
      '후회없는 선택의 여정을 함께, 커스텀 타투 체험 서비스 TATTOUR\n 후회없는 선택의 여정을 함께, 커스텀 타투 체험 서비스 TATTOUR 후회없는 선택의 여정을 함께, 커스텀 타투 체험 서비스 TATTOUR \n후회없는 선택의 여정을 함께, 커스텀 타투 체험 서비스 TATTOUR',
    memberList: [
      {
        id: 1,
        profileImage: 프로젝트_이미지.타투어,
      },
      {
        id: 2,
        profileImage: 프로젝트_이미지.타투어,
      },
      {
        id: 3,
        profileImage: 프로젝트_이미지.타투어,
      },
    ],
  },
} satisfies Story;

export const 창업_및_이용가능 = {
  args: {
    ...Default.args,
    isAvailable: true,
    isFounding: true,
  },
} satisfies Story;

export const 멤버_적을때 = {
  args: {
    ...Default.args,
    isAvailable: true,
    isFounding: true,
    memberList: [
      {
        id: 1,
        profileImage: 프로젝트_이미지.타투어,
      },
    ],
  },
} satisfies Story;
