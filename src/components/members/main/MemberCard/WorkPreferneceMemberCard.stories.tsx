import { Meta, StoryObj } from '@storybook/react';

import WorkPreferneceMemberCard from './WorkPreferneceMemberCard';

export default {
  component: WorkPreferneceMemberCard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '335px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof WorkPreferneceMemberCard>;

type Story = StoryObj<typeof WorkPreferneceMemberCard>;

export const Default: Story = {
  args: {
    id: 123,
    name: '문성희',
    profileImage:
      'https://wsrv.nl/?url=https%3A%2F%2Fs3.ap-northeast-2.amazonaws.com%2Fsopt-makers-internal%2F%2Fdev%2Fimage%2Fproject%2Fa67e3b51-18df-4ec2-b6f0-5920100968a7-e2d9737e099300774dc58f45d8ba8433.jpg&h=342&output=webp',
    university: '솝트대학교',
    workPreference: {
      ideationStyle: '즉흥',
      workTime: '저녁',
      communicationStyle: '몰아서',
      workPlace: '카공',
      feedbackStyle: '직설적',
    },
    activity: {
      id: 1,
      generation: 37,
      part: '웹',
      team: null,
    },
  },
};

export const WithoutProfileImage: Story = {
  args: {
    id: 124,
    name: '김채현',
    profileImage: '',
    university: '솝트대학교',
    workPreference: {
      ideationStyle: '계획적',
      workTime: '저녁',
      communicationStyle: '수시로',
      workPlace: '집',
      feedbackStyle: '완곡한',
    },
    activity: {
      id: 2,
      generation: 37,
      part: '디자인',
      team: null,
    },
  },
};

export const MultipleActivities: Story = {
  args: {
    id: 125,
    name: '이재훈',
    profileImage:
      'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/45a0271c-895c-427b-9ff2-a2efb4daa7ce-1679161408215.jpg',
    university: '솝트대학교',
    workPreference: {
      ideationStyle: '계획적',
      workTime: '아침',
      communicationStyle: '몰아서',
      workPlace: '카공',
      feedbackStyle: '직설적',
    },
    activity: {
      id: 3,
      generation: 37,
      part: '서버',
      team: null,
    },
  },
};

export const OldGeneration: Story = {
  args: {
    id: 126,
    name: '남지우',
    profileImage:
      'https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal//prod/image/project/45a0271c-895c-427b-9ff2-a2efb4daa7ce-1679161408215.jpg',
    university: '솝트대학교',
    workPreference: {
      ideationStyle: '즉흥',
      workTime: '저녁',
      communicationStyle: '수시로',
      workPlace: '집',
      feedbackStyle: '완곡한',
    },
    activity: {
      id: 6,
      generation: 35,
      part: 'iOS',
      team: null,
    },
  },
};

export const Loading: Story = {
  args: {
    id: 0,
    name: '',
    profileImage: '',
    university: '',
    workPreference: {
      ideationStyle: '',
      workTime: '',
      communicationStyle: '',
      workPlace: '',
      feedbackStyle: '',
    },
    activity: {
      id: 0,
      generation: 0,
      part: '',
      team: null,
    },
    isLoading: true,
  },
};
