import { Meta } from '@storybook/react';

import MentoringCard from '@/components/mentoring/MentoringListSection/MentoringCard';

export default {
  component: MentoringCard,
} as Meta<typeof MentoringCard>;

export const Default = {
  args: {
    mentor: { name: '남주영', career: '나사' },
    keywords: ['별자리 찾기', '우주의 탄생 과정에 대해 알아보기'],
    title: '정우와 함께하는 CGP Review',
    isOpened: true,
  },

  name: '기본',
};

export const LongData = {
  args: {
    mentor: { name: '송정우', career: 'AWS' },
    keywords: ['코드 리뷰', '아무거나 물어보세용', '취업 준비 과정에서 우선 순위 정하기'],
    title: '하둘셋넷다여일여아열하둘셋넷다여일여아열하둘셋넷다여일여아열',
    isOpened: true,
  },

  name: '긴 제목, 키워드',
};

export const Closed = {
  args: {
    mentor: { name: '송정우', career: 'AWS' },
    keywords: ['코드 리뷰', '아무거나 물어보세용', '취업 준비 과정에서 우선 순위 정하기'],
    title: '하둘셋넷다여일여아열하둘셋넷다여일여아열하둘셋넷다여일여아열',
    isOpened: false,
  },

  name: '긴 제목, 키워드',
};
