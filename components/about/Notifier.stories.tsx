import { ComponentMeta, ComponentStory } from '@storybook/react';

import Notifier from '@/components/about/Notifier';

export default {
  component: Notifier,
} as ComponentMeta<typeof Notifier>;

const Template: ComponentStory<typeof Notifier> = (args) => <Notifier {...args} />;

export const Basic = Template.bind({});
Basic.storyName = '기본';
