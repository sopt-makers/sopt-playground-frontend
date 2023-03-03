import React, { createContext, FC, useContext } from 'react';

import { MemberSearchContext } from '@/components/projects/form/fields/member/MemberSearchContext';

type Member = {
  // sever
  generation: number;
  id: number;
  name: string;
  // ui
  profileImage: string;
};

type SelectedMemberData = { memberId: number; memberRole: string; memberDescription: string };

interface NewMemberSearchProps {
  value: SelectedMemberData;
  onChange: (selectedData: SelectedMemberData) => void;
  searchMember: (name: string) => Promise<Member[]>;
  // for edit
  getMemberById: (id: number) => Promise<Member>;
}

const NewMemberSearch: FC<NewMemberSearchProps> = () => {
  const { getMemberById, searchMember } = useContext(MemberSearchContext);

  return <></>;
};

export default NewMemberSearch;
