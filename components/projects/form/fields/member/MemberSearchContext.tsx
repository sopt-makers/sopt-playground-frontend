import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash-es';
import { createContext, useContext, useState } from 'react';

export type Member = {
  generation: number;
  id: number;
  name: string;
  profileImage: string | null;
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

export function useMemberSearch() {
  const [name, setName] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { searchMember, getMemberById } = useContext(MemberSearchContext);

  const { data: searchedMemberData } = useQuery(
    ['searchMember', searchQuery],
    async () => {
      const data = await searchMember(searchQuery);
      return data;
    },
    {
      enabled: !!searchQuery,
    },
  );

  const onValueChange = (value: string) => {
    setName(value);
    debounce((value: string) => {
      setSearchQuery(value);
    }, 300)(value);
  };

  const onValueClear = () => {
    setName('');
    setSearchQuery('');
  };

  return {
    name,
    onValueChange,
    onValueClear,
    searchedMemberList: searchedMemberData,
    getMemberById,
  };
}
