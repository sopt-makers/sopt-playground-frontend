import { useRouter } from 'next/router';

export const useFeedReferral = () => {
  const router = useRouter();

  const getReferral = (): 'more' | 'detail' => {
    if ('id' in router.query) {
      return 'detail';
    } else if ('feed' in router.query) {
      return 'more';
    } else return 'more';
  };

  const referral = getReferral();

  return { referral };
};
