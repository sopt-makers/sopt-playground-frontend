import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

const RegisterProfile: FC = () => {
  // 아직 구체화가 되지 않았으므로, 지금은 그냥 리다이렉트 시키고 추후 고도화

  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return <></>;
};

export default RegisterProfile;
