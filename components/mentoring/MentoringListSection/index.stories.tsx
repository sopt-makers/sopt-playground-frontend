import { Meta, StoryObj } from '@storybook/react';

import MentoringSection from '@/components/mentoring/MentoringListSection';

export default {
  component: MentoringSection,
} as Meta<typeof MentoringSection>;

export const Default: StoryObj = {
  render: () => <MentoringSection />,
  name: '기본',
};
