import { ComponentMeta, ComponentStory } from '@storybook/react';

import Footer from '@/components/common/Footer';

export default {
  component: Footer,
  parameters: {},
  decorators: [],
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Basic = Template.bind({});
Basic.args = {};
Basic.storyName = '기본';
