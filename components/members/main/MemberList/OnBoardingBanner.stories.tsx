import { ComponentMeta, ComponentStory } from '@storybook/react';

import OnBoardingBanner from '@/components/members/main/MemberList/OnBoardingBanner';

export default {
  component: OnBoardingBanner,
} as ComponentMeta<typeof OnBoardingBanner>;

const Template: ComponentStory<typeof OnBoardingBanner> = (args) => <OnBoardingBanner {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  name: '박건영',
};
Basic.storyName = '기본';
