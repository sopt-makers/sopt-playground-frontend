import { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';

import MissionProgress from '@/components/soulmate/view/MissionProgress';

const meta = {
  component: MissionProgress,
} satisfies Meta<typeof MissionProgress>;
export default meta;

type Story = StoryObj<typeof meta>;

const after3hrs = dayjs(new Date()).add(3, 'hours').toDate();

export const Running = {
  args: {
    missions: [
      { status: 'completed', name: '1차 미션' },
      { status: 'running', name: '2차 미션', endTimestamp: after3hrs },
      { status: 'waiting', name: '3차 미션' },
    ],
  },
} satisfies Story;

export const Waiting = {
  args: {
    missions: [
      { status: 'completed', name: '1차 미션' },
      { status: 'completed', name: '2차 미션' },
      { status: 'waiting', name: '3차 미션', startTimestamp: after3hrs },
    ],
  },
} satisfies Story;
