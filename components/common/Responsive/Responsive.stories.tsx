import { ComponentMeta, ComponentStory } from '@storybook/react';

import Responsive from '@/components/common/Responsive/Responsive';
import ResponsiveProvider from '@/components/common/Responsive/ResponsiveProvider';

export default {
  component: Responsive,
  decorators: [
    (Story) => {
      return (
        <ResponsiveProvider>
          <Story />
        </ResponsiveProvider>
      );
    },
  ],
} as ComponentMeta<typeof Responsive>;

const Template: ComponentStory<typeof Responsive> = (args) => <Responsive {...args} />;

export const Desktop = Template.bind({});
Desktop.args = {
  children: 'Only Desktop',
  only: 'desktop',
};

export const Mobile = Template.bind({});
Mobile.args = {
  children: 'Only Mobile',
  only: 'mobile',
};
