import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function FacebookCallbackPage() {
  const router = useRouter();

  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      const code = router.query.code;

      if (typeof code === 'string') {
        try {
          const res = await axios.post('http://localhost:5000/api/v1/idp/facebook/auth', {
            code,
          });
          localStorage.setItem('accessToken', res.data.accessToken);
          router.push('/auth');
        } catch (e) {
          if (axios.isAxiosError(e)) {
            setMessage('에러가 발생했습니다: ' + JSON.stringify(e.response?.data));
          }
        }
      }
    })();
  }, [router]);

  return (
    <div>
      Processing... <br />
      {message}
    </div>
  );
}
