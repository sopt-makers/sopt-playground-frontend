import { ComponentMeta, ComponentStory } from '@storybook/react';

import ProfileButton from '@/components/common/Header/ProfileButton';

export default {
  component: ProfileButton,
} as ComponentMeta<typeof ProfileButton>;

const Template: ComponentStory<typeof ProfileButton> = (args) => <ProfileButton {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  name: '박건영',
};

export const WithImage = Template.bind({});
WithImage.args = {
  name: '유예린',
  profileImage: 'https://user-images.githubusercontent.com/26808056/198195477-82df28fe-acb7-46b4-be0f-0610c62a8a72.png',
};
