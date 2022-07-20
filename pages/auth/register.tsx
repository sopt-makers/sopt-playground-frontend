import useFacebookAuth from '@/components/auth/idp/useFacebookAuth';
import { useStringParam } from '@/components/auth/hooks';
import axios from 'axios';
import { FC, useState } from 'react';

export const RegisterPage: FC = () => {
  const facebookAuth = useFacebookAuth();

  const [info, setInfo] = useState<{ name: string; generation: number } | null>(null);

  useStringParam(['token'], async ({ token }) => {
    const res = await axios.post('http://localhost:5000/api/v1/register/checkToken', {
      registerToken: token,
    });

    setInfo({
      name: res.data.name,
      generation: res.data.generation,
    });
    localStorage.setItem('registerToken', token);
  });

  return (
    <div>
      <h1>회원가입</h1>
      <p>유저정보: {JSON.stringify(info)}</p>
      <button onClick={facebookAuth.register}>facebook으로 회원가입</button>
    </div>
  );
};

export default RegisterPage;
