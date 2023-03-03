import { ComponentMeta, ComponentStory } from '@storybook/react';

import { DummyMemberSeacrhProvider } from '@/components/projects/form/fields/member/MemberSearchContext';

import NewMemberSearch from './NewMemberSearch';

export default {
  component: NewMemberSearch,
  decorators: [
    (Story) => (
      <DummyMemberSeacrhProvider>
        <Story />
      </DummyMemberSeacrhProvider>
    ),
  ],
} as ComponentMeta<typeof NewMemberSearch>;

const Template: ComponentStory<typeof NewMemberSearch> = (args) => <NewMemberSearch {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';
