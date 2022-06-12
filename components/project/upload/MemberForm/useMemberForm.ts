import { useState, useCallback, useRef } from 'react';

const DEFAULT_MEMBER: Member = {
  key: 0,
  memberId: null,
  role: null,
  description: '',
};

export interface Member {
  key: number;
  memberId: string | null;
  role: string | null;
  description: string;
}

interface Members {
  [memberKey: number]: Member;
}

const useMemberForm = () => {
  //   const [members, setMembers] = useState<Member[]>(defaultMember);
  //   const memberKey = useRef<number>(1);

  //   const onCreate = useCallback(() => {
  //     const defaultMember: Member = {
  //       key: memberKey.current,
  //       memberId: null,
  //       role: null,
  //       description: '',
  //     };
  //     setMembers((members) => [...members, defaultMember]);
  //     memberKey.current += 1;
  //   }, [setMembers]);

  //   const onDelete = useCallback(
  //     (memberKey: number) => {
  //       setMembers((members) => members.filter((member) => member.key !== memberKey));
  //     },
  //     [setMembers],
  //   );

  //   return { members, onCreate, onDelete };
  const [members, setMembers] = useState<Members>({
    [DEFAULT_MEMBER.key]: DEFAULT_MEMBER,
  });
  const memberKey = useRef<number>(1);

  const onClickAdd = () => {
    const _memberKey = memberKey.current;
    const defaultMember: Member = {
      key: memberKey.current,
      memberId: null,
      role: null,
      description: '',
    };
    setMembers((members) => ({
      ...members,
      [_memberKey]: defaultMember,
    }));
    memberKey.current += 1;
  };

  const onDelete = (memberKey: number) => {
    setMembers((members) => {
      const _members: Member[] = Object.values(members).filter((member) => member.key !== memberKey);
      return _members.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.key]: cur,
        }),
        {},
      );
    });
  };

  const onChange = (member: Member) => {
    setMembers((members) => ({
      ...members,
      [member.key]: member,
    }));
  };

  return { members, onClickAdd, onDelete, onChange };
};

export default useMemberForm;
