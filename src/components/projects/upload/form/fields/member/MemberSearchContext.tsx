import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash-es';
import { createContext, useContext, useState } from 'react';

export type Member = {
  generation: number;
  id: string;
  name: string;
  profileImage: string | null;
};

interface MemberSearchContextType {
  memberId?: string;
  searchMember: (name: string) => Promise<Member[]>;
  getMemberById: (id: string) => Promise<Member | undefined>;
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
  const { memberId, searchMember, getMemberById } = useContext(MemberSearchContext);

  const { data: searchedMemberData } = useQuery({
    queryKey: ['searchMember', searchQuery],

    queryFn: async () => {
      const data = await searchMember(searchQuery);
      return data;
    },
    enabled: Boolean(searchQuery),
  });

  const { data: defaultValue } = useQuery({
    queryKey: ['getMemberById', memberId],
    queryFn: async () => {
      if (!memberId) return;
      const data = await getMemberById(memberId);
      return data;
    },
    enabled: Boolean(memberId),
  });

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
    defaultValue,
  };
}
