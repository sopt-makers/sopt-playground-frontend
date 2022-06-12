import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const appId = '520253793038775'; // App id for test app. This is not a secret.
const redirectUri = 'http://localhost:3000/auth/register/facebook';
const stateParam = 'asdfasdf';

export default function RegisterPage() {
  const router = useRouter();

  const [info, setInfo] = useState<{ name: string; generation: number } | null>(null);

  useEffect(() => {
    const token = router.query.token;

    if (typeof token === 'string') {
      (async () => {
        const res = await axios.post('http://localhost:5000/api/v1/register/checkToken', {
          registerToken: token,
        });

        setInfo({
          name: res.data.name,
          generation: res.data.generation,
        });
        localStorage.setItem('registerToken', token);
      })();
    }
  }, [router]);

  function login() {
    open(
      `https://www.facebook.com/v13.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&state=${stateParam}`,
      '_parent',
    );
  }

  return (
    <div>
      <h1>회원가입</h1>
      <p>유저정보: {JSON.stringify(info)}</p>
      <button onClick={login}>facebook으로 회원가입</button>
    </div>
  );
}
