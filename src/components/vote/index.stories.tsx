import { Meta, StoryObj } from '@storybook/react';

import Vote from './index';

const meta = {
  component: Vote,
} satisfies Meta<typeof Vote>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Voted_MyPost_Multipe = {
  args: {
    postId: 1,
    categoryId: 1,
    isMultiple: true,
    isMine: true,
    hasVoted: true,
    totalParticipants: 10,
    options: [
      {
        id: 51,
        content: '치킨',
        voteCount: 6,
        votePercent: 60,
        isSelected: true,
      },
      {
        id: 52,
        content: '피자',
        voteCount: 4,
        votePercent: 40,
        isSelected: false,
      },
    ],
  },
} satisfies Story;

export const Voted_MyPost_Single = {
  args: {
    postId: 1,
    categoryId: 1,
    isMultiple: false,
    isMine: true,
    hasVoted: true,
    totalParticipants: 10,
    options: [
      {
        id: 51,
        content: '치킨',
        voteCount: 6,
        votePercent: 60,
        isSelected: true,
      },
      {
        id: 52,
        content: '피자',
        voteCount: 4,
        votePercent: 40,
        isSelected: false,
      },
    ],
  },
} satisfies Story;

export const Voted_OthersPost = {
  args: {
    postId: 1,
    categoryId: 1,
    isMultiple: true,
    isMine: false,
    hasVoted: true,
    totalParticipants: 10,
    options: [
      {
        id: 51,
        content: '치킨',
        voteCount: 6,
        votePercent: 60,
        isSelected: true,
      },
      {
        id: 52,
        content: '피자',
        voteCount: 4,
        votePercent: 40,
        isSelected: false,
      },
    ],
  },
} satisfies Story;

export const NotVoted_MyPost = {
  args: {
    postId: 1,
    categoryId: 1,
    isMultiple: true,
    isMine: true,
    hasVoted: false,
    totalParticipants: 10,
    options: [
      {
        id: 51,
        content: '치킨',
        voteCount: 6,
        votePercent: 60,
        isSelected: false,
      },
      {
        id: 52,
        content: '피자',
        voteCount: 4,
        votePercent: 40,
        isSelected: false,
      },
    ],
  },
} satisfies Story;

export const NotVoted_OtherPost = {
  args: {
    postId: 1,
    categoryId: 1,
    isMultiple: true,
    isMine: false,
    hasVoted: false,
    totalParticipants: 10,
    options: [
      {
        id: 51,
        content: '치킨',
        voteCount: 0,
        votePercent: 0,
        isSelected: false,
      },
      {
        id: 52,
        content: '피자',
        voteCount: 0,
        votePercent: 0,
        isSelected: false,
      },
    ],
  },
} satisfies Story;
