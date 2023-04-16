import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { DummyMemberSeacrhProvider } from '@/components/projects/form/fields/member/MemberSearchContext';

import type { Value } from '../MemberField';
import MemberSearch from './MemberSearch';

export default {
  component: MemberSearch,
  decorators: [
    (Story) => (
      <DummyMemberSeacrhProvider>
        <Story />
      </DummyMemberSeacrhProvider>
    ),
  ],
} as ComponentMeta<typeof MemberSearch>;

const Template: ComponentStory<typeof MemberSearch> = (args) => <MemberSearch {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.storyName = '기본';

export const WithState = () => {
  const [value, setValue] = useState<Value>({
    memberId: undefined,
    memberRole: undefined,
    memberDescription: undefined,
  });

  console.log('[value]: ', value);

  return <MemberSearch value={value} onChange={setValue} />;
};
