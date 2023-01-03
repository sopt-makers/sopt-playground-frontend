import { ComponentMeta, ComponentStory } from '@storybook/react';

import Loading from '.';

export default {
  component: Loading,
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => <Loading {...args} />;

export const Default = Template.bind({});

export const FullPage = Template.bind({});
FullPage.args = {
  type: 'fullPage',
};
