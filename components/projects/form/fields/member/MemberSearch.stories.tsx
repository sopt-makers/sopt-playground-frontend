import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FC, PropsWithChildren, useState } from 'react';

import { Member, MemberSearchContext } from '@/components/projects/form/fields/member/MemberSearchContext';

import MemberSearch from './MemberSearch';

const dummyData: Member[] = [
  {
    generation: 18,
    id: '1',
    name: '이지은',
    profileImage: '',
  },
  {
    generation: 29,
    id: '2',
    name: '김예진',
    profileImage: '',
  },
  {
    generation: 14,
    id: '3',
    name: '박채원',
    profileImage: '',
  },
  {
    generation: 26,
    id: '4',
    name: '한민지',
    profileImage: '',
  },
  {
    generation: 22,
    id: '5',
    name: '조현아',
    profileImage: '',
  },
  {
    generation: 16,
    id: '6',
    name: '송예슬',
    profileImage: '',
  },
  {
    generation: 32,
    id: '7',
    name: '강서연',
    profileImage: '',
  },
  {
    generation: 12,
    id: '8',
    name: '이수진',
    profileImage: '',
  },
  {
    generation: 25,
    id: '9',
    name: '임정은',
    profileImage: '',
  },
  {
    generation: 20,
    id: '10',
    name: '박서연',
    profileImage: '',
  },
];

const DummyMemberSeacrhProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <MemberSearchContext.Provider
      value={{
        getMemberById: async (id) => dummyData.find((data) => data.id === id),
        searchMember: async (name) => dummyData.filter((data) => data.name.includes(name)),
      }}
    >
      {children}
    </MemberSearchContext.Provider>
  );
};

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
  id: '1',
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
