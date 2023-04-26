import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { DummyMemberSeacrhProvider } from '@/components/projects/form/fields/member/MemberSearchContext';
import { Member } from '@/components/projects/form/fields/member/MemberSearchContext';

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

const dummyMember = {
  generation: 18,
  id: 1,
  name: '이지은',
  profileImage: '',
};

export const WithState = () => {
  const [selectedMember, setSelectedMember] = useState<Member | undefined>();
  const onSelect = () => {
    setSelectedMember(dummyMember);
  };
  const onClear = () => {
    setSelectedMember(undefined);
  };

  return (
    <MemberSearch placeholder='SOPT 회원 검색' selectedMember={selectedMember} onSelect={onSelect} onClear={onClear} />
  );
};
