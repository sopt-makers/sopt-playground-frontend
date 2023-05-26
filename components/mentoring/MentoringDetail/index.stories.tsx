import { ComponentMeta, ComponentStory } from '@storybook/react';

import MentoringDetail from '@/components/mentoring/MentoringDetail';

export default {
  component: MentoringDetail,
} as ComponentMeta<typeof MentoringDetail>;

const Template: ComponentStory<typeof MentoringDetail> = (args) => <MentoringDetail {...args} />;

export const Default = Template.bind({});
Default.args = { mentorId: 1 };
Default.storyName = '기본';
