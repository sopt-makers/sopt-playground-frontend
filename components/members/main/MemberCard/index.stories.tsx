import { ComponentMeta, ComponentStory } from '@storybook/react';

import Card from './index';

export default {
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

const yerinImage =
  'https://user-images.githubusercontent.com/26808056/198195477-82df28fe-acb7-46b4-be0f-0610c62a8a72.png';

export const Default = Template.bind({});
Default.args = {
  name: '유예린',
  part: '디자인 / 기획',
  introduction: '인왕산 야간등산을 좋아해요. 그러다 도루리 집을 멤돌았다는건 안 비밀^^',
  isActiveGeneration: true,
};
Default.storyName = '기본';

export const Active = Template.bind({});
Active.args = {
  name: '유예린',
  part: '디자인 / 기획',
  introduction: '인왕산 야간등산을 좋아해요. 그러다 도루리 집을 멤돌았다는건 안 비밀^^',
  image: yerinImage,
  isActiveGeneration: false,
};
Active.storyName = '활동 기수';
