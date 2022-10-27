import { ComponentMeta, ComponentStory } from '@storybook/react';

import Card from './index';

export default {
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: '유예린',
  role: '디자인 / 기획',
  description: '행복을 찾는 UIUX 디자이너^^',
  generation: 30,
};
Default.storyName = '기본';
