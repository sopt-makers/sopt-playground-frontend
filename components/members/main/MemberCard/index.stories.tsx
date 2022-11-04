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
  introduction: '행복을 찾는 UIUX 디자이너^^',
  isActiveGeneration: true,
};
Default.storyName = '기본';

export const Active = Template.bind({});
Active.args = {
  name: '유예린',
  part: '디자인 / 기획',
  introduction: '행복을 찾는 UIUX 디자이너^^',
  image: yerinImage,
  isActiveGeneration: false,
};
Active.storyName = '활동 기수';
