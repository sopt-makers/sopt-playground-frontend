import { ComponentMeta, ComponentStory } from '@storybook/react';

import HelpCard from './HelpCard';

export default {
  component: HelpCard,
  parameters: {},
  decorators: [],
} as ComponentMeta<typeof HelpCard>;

const Template: ComponentStory<typeof HelpCard> = (args) => <HelpCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: '제목제목',
  content: '내용내용',
  highlight: false,
};

export const Highlight = Template.bind({});
Highlight.args = {
  title: '제목제목',
  content: '내용내용',
  highlight: true,
};
