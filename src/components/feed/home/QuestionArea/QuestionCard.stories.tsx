import type { Meta, StoryObj } from '@storybook/react';

import { WaitingQuestion } from '@/api/endpoint/feed/getWaitingQuestions';

import QuestionCard from './QuestionCard';

const meta: Meta<typeof QuestionCard> = {
  component: QuestionCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof QuestionCard>;

const basicMock: WaitingQuestion = {
  id: 1,
  title: '리액트에서 상태 관리를 어떤 기준으로 분리하나요?',
  content: '전역 상태와 지역 상태를 구분하는 기준이 헷갈려요. 상태를 어떻게 나누는 게 좋을까요?',
  createdAt: '1시간 전',
  likeCount: 12,
  commentCount: 5,
  isAnswered: false,
};

const basicMock2: WaitingQuestion = {
  id: 1,
  title: '',
  content: '네트워킹 안하면 앱잼 팀빌딩 힘들까요?',
  createdAt: '23시간 전',
  likeCount: 23,
  commentCount: 1,
  isAnswered: true,
};

const basicMock3: WaitingQuestion = {
  id: 1,
  title: '메이커스는 어떻게 들어가나요? 궁금해요궁금해요궁금해요궁금해요~~~~',
  content: '메이커스 들어가면 많이 시간을 써야할까요? 메이커스는 어떤 곳인가요? 궁금해요궁금해요궁금해요',
  createdAt: '23시간 전',
  likeCount: 0,
  commentCount: 0,
  isAnswered: false,
};

export const 기본: Story = {
  args: {
    question: basicMock,
  },
};

export const 제목없음_본문만있는카드: Story = {
  args: {
    question: basicMock2,
  },
};

export const 제목본문_길이가긴카드: Story = {
  args: {
    question: basicMock3,
  },
};
