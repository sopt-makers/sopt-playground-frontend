import { useRouter } from 'next/router';

import { playgroundLink } from '@/constants/links';

export default function useMoveToProfile() {
  const router = useRouter();

  const moveToProfile = (memberId: number) => {
    router.push(playgroundLink.memberDetail(memberId));
  };

  return { moveToProfile };
}
