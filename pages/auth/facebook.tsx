import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function FacebookCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const code = router.query.code;

      if (typeof code === 'string') {
        const res = await axios.get('http://localhost:5000/api/v1/auth/facebook', {
          params: {
            code,
          },
        });
        localStorage.setItem('accessToken', res.data.accessToken);
        router.push('/auth');
      }
    })();
  }, [router]);

  return <div>Processing...</div>;
}
