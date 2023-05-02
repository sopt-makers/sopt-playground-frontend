import { ComponentMeta, ComponentStory } from '@storybook/react';

import { linkTitles } from '@/components/projects/form/constants';

import LinkField from './LinkField';

export default {
  component: LinkField,
} as ComponentMeta<typeof LinkField>;

const Template: ComponentStory<typeof LinkField> = (args) => <LinkField {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: {
    linkTitle: linkTitles[0],
    linkUrl: '',
  },
  onChange: () => {
    //
  },
};
Default.storyName = '기본';
