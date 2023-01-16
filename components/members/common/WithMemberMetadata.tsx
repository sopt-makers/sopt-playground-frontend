import { FC, ReactElement } from 'react';
import { selector, selectorFamily, useRecoilValueLoadable } from 'recoil';

import { getMemberProfile } from '@/api/members';

interface WithMemberMetadataProps {
  memberId: number;
  render: (metadata: MemberMetadata | null) => ReactElement;
}

/**
 * @deprecated 임시 방편으로만 사용해야 합니다.
 */
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
  currentCompany: string | null;
}

// 파일 외부에서 사용하는것을 방지하기 위해 여기에 Recoil 셀렉터 선언
// Next.js 버그로 실수로 Recoil Async State를 그냥 useRecoilState 해버리면 빌드 오류 발생
const memberListSelector = selector({
  key: 'memberMetadataListSelector',
  get: async () => {
    return await getMemberProfile('');
  },
});

const memberMapSelector = selector({
  key: 'memberMapSelector',
  get: ({ get }) => {
    const memberList = get(memberListSelector);
    return new Map(memberList.map((member) => [member.id, member]));
  },
});

const memberMetadataFamily = selectorFamily<MemberMetadata | null, number>({
  key: 'memberMetadataFamily',
  get:
    (memberId) =>
    async ({ get }) => {
      const memberMap = get(memberMapSelector);

      const member = memberMap.get(memberId);

      if (!member) {
        return null;
      }

      const sortedCareers = member.careers.filter((career) => career.isCurrent);
      sortedCareers.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

      return {
        profileImage: member.profileImage,
        generations: member.activities.map((value) => value.generation).sort((a, b) => a - b),
        currentCompany: sortedCareers.length > 0 ? sortedCareers.at(-1)?.companyName ?? null : null,
      };
    },
});
