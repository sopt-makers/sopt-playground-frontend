import { FC, ReactElement } from 'react';
import { selector, selectorFamily, useRecoilValueLoadable } from 'recoil';

import { getMemberProfile } from '@/api/members';

interface WithMemberMetadataProps {
  memberId: number;
  render: (metadata: MemberMetadata | null) => ReactElement;
}

const WithMemberMetadata: FC<WithMemberMetadataProps> = ({ memberId, render }) => {
  const { state, contents } = useRecoilValueLoadable(memberMetadataFamily(memberId));

  if (state === 'loading' || state === 'hasError') {
    return render(null);
  }

  return render(contents);
};

export default WithMemberMetadata;

interface MemberMetadata {
  profileImage: string;
  generations: number[];
}

// 파일 외부에서 사용하는것을 방지하기 위해 여기에 Recoil 셀렉터 선언
// Next.js 버그로 실수로 Recoil Async State를 그냥 useRecoilState 해버리면 빌드 오류 발생
const memberListSelector = selector({
  key: 'memberMetadataListSelector',
  get: async () => {
    return await getMemberProfile('');
  },
});

const memberMetadataFamily = selectorFamily<MemberMetadata | null, number>({
  key: 'memberMetadataFamily',
  get:
    (memberId) =>
    async ({ get }) => {
      const memberList = get(memberListSelector);

      const member = memberList.find((member) => member.id === memberId);

      if (!member) {
        return null;
      }

      return {
        profileImage: member.profileImage,
        generations: member.activities.map((value) => value.generation),
      };
    },
});
