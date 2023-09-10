import { Meta } from '@storybook/react';

import MentoringDetail from '@/components/mentoring/MentoringDetail';

export default {
  component: MentoringDetail,
} as Meta<typeof MentoringDetail>;

export const Default = {
  args: { mentorId: 1 },
  name: '기본',
};
