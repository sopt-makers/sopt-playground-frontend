import { useState, useCallback, useRef } from 'react';

const DEFAULT_MEMBER_KEY = 0;
const DEFAULT_MEMBER: Member = {
  key: DEFAULT_MEMBER_KEY,
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
  const [members, setMembers] = useState<Members>({
    [DEFAULT_MEMBER.key]: DEFAULT_MEMBER,
  });
  const _members = Object.values(members);
  const memberKey = useRef<number>(DEFAULT_MEMBER_KEY + 1);

  const onClickAdd = useCallback(() => {
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
  }, [setMembers, memberKey]);

  const onDelete = useCallback(
    (memberKey: number) => {
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
    },
    [setMembers],
  );

  const onChange = useCallback(
    (member: Member) => {
      setMembers((members) => ({
        ...members,
        [member.key]: member,
      }));
    },
    [setMembers],
  );

  return { members: _members, onClickAdd, onDelete, onChange };
};

export default useMemberForm;
