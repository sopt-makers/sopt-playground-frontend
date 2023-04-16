import { useQuery } from '@tanstack/react-query';
import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';

export type Member = {
  generation: number;
  id: number;
  name: string;
  profileImage: string;
};

interface MemberSearchContextType {
  searchMember: (name: string) => Promise<Member[]>;
  // for edit
  getMemberById: (id: number) => Promise<Member | undefined>;
}

export const MemberSearchContext = createContext(
  new Proxy({} as MemberSearchContextType, {
    get() {
      throw new Error('MemberSearchProvider가 필요합니다.');
    },
  }),
);

const dummyData: Member[] = [
  {
    generation: 18,
    id: 1,
    name: '이지은',
    profileImage: '',
  },
  {
    generation: 29,
    id: 2,
    name: '김예진',
    profileImage: '',
  },
  {
    generation: 14,
    id: 3,
    name: '박채원',
    profileImage: '',
  },
  {
    generation: 26,
    id: 4,
    name: '한민지',
    profileImage: '',
  },
  {
    generation: 22,
    id: 5,
    name: '조현아',
    profileImage: '',
  },
  {
    generation: 16,
    id: 6,
    name: '송예슬',
    profileImage: '',
  },
  {
    generation: 32,
    id: 7,
    name: '강서연',
    profileImage: '',
  },
  {
    generation: 12,
    id: 8,
    name: '이수진',
    profileImage: '',
  },
  {
    generation: 25,
    id: 9,
    name: '임정은',
    profileImage: '',
  },
  {
    generation: 20,
    id: 10,
    name: '박서연',
    profileImage: '',
  },
];

export const DummyMemberSeacrhProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
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

export function useMemberSearch() {
  const [name, setName] = useState<string>('');
  const { searchMember, getMemberById } = useContext(MemberSearchContext);

  // TODO: debounce
  const { data: searchedMemberData } = useQuery(
    ['searchMember', name],
    async () => {
      const data = await searchMember(name);
      return data;
    },
    {
      enabled: !!name,
    },
  );

  return {
    name,
    onValueChange: setName,
    searchedMemberList: searchedMemberData,
    getMemberById,
  };
}
