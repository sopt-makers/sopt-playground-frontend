import { ComponentMeta, ComponentStory } from '@storybook/react';

import PartItem from './PartItem';

export default {
  component: PartItem,
  parameters: {},
  decorators: [],
} as ComponentMeta<typeof PartItem>;

const Template: ComponentStory<typeof PartItem> = (args) => <PartItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  generation: 29,
  part: '웹',
  activities: [{ type: '앱잼', name: '팀블', href: 'https://playground.sopt.org' }],
  teams: ['운영팀'],
};
Default.storyName = '기본';
