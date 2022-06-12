import axios from 'axios';
import { useState } from 'react';

export default function VerifyPage() {
  const [emailInput, setEmailInput] = useState('');
  const [output, setOutput] = useState('');

  async function register() {
    setOutput('Loading...');
    try {
      const ret = await axios.post('http://localhost:5000/api/v1/register/sendEmail', {
        email: emailInput,
      });
      setOutput(`email sent: ${JSON.stringify(ret.data)}`);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setOutput(`Error occured: ${JSON.stringify(e.response?.data)}`);
      }
    }
  }

  return (
    <div>
      <h1>SOPT 인증</h1>
      <div>
        <input type='text' placeholder='이메일' value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
        <button onClick={register}>인증메일 발송</button>
        <p>{output}</p>
      </div>
    </div>
  );
}
