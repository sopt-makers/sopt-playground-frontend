import { ComponentMeta, ComponentStory } from '@storybook/react';

import MemberCardSkeleton from './MemberCardSkeleton';

export default {
  component: MemberCardSkeleton,
  decorators: [],
} as ComponentMeta<typeof MemberCardSkeleton>;

const Template: ComponentStory<typeof MemberCardSkeleton> = (args) => <MemberCardSkeleton {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
