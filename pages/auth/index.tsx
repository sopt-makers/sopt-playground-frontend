import Link from 'next/link';
import { useEffect, useState } from 'react';

const appId = '520253793038775'; // App id for test app. This is not a secret.
const redirectUri = 'http://localhost:3000/auth/login/facebook';
const stateParam = 'asdfasdf';

export default function AuthPage() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('accessToken');
    setAccessToken(savedToken);
  }, []);

  function login() {
    open(
      `https://www.facebook.com/v13.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&state=${stateParam}`,
      '_parent',
    );
  }

  function logout() {
    setAccessToken(null);
    localStorage.removeItem('accessToken');
  }

  if (accessToken === null) {
    return (
      <div>
        <button onClick={login}>Login with Facebook</button>
        <Link href='/auth/verify'>회원인증</Link>
      </div>
    );
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <div>
        <p>Access Token: {accessToken}</p>
      </div>
    </div>
  );
}
