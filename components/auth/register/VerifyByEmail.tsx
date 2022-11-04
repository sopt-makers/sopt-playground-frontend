import styled from '@emotion/styled';
import { AxiosError } from 'axios';
import { FC, useState } from 'react';
import { useMutation } from 'react-query';
import { ClipLoader } from 'react-spinners';

import { postRegistrationEmail } from '@/api/registration';
import SendingMailSuccess from '@/components/auth/register/SendingMailSuccess';
import Input from '@/components/common/Input';
import SquareLink from '@/components/common/SquareLink';
import IconArrowRight from '@/public/icons/icon-arrow-right.svg';
import IconWarning from '@/public/icons/icon-warning.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface ErrorResponse {
  success: false;
  message: string;
}

const VerifyByEmail: FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const verify = useMutation<unknown, AxiosError<ErrorResponse>>(async () => {
    return postRegistrationEmail(emailInput);
  });

  const handleSend = () => {
    if (verify.isLoading) {
      return;
    }
    verify.mutate();
  };

  if (verify.isSuccess) {
    return <SendingMailSuccess />;
  }

  return (
    <Container>
      <Title>SOPT 회원인증</Title>
      <Description>SOPT 지원시 입력했던 이메일을 입력해주세요</Description>
      <Label>이메일</Label>
      <StyledInput
        placeholder='이메일을 입력해주세요'
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        disabled={verify.isLoading}
      />
      <ErrorMessage show={verify.isError}>
        <IconWarning /> {formatErrorMessage(verify.error)}
      </ErrorMessage>
      <SendButton variant='primary' onClick={handleSend}>
        {verify.isLoading ? <ClipLoader color='#ffffff' size={25} /> : <>SOPT 회원 인증메일 전송</>}
      </SendButton>
      <ErrorNotice>
        <GoogleFormButton onClick={() => window.open('https://forms.gle/Hs9tJgMG9bNvT1rS9', '_blank')}>
          <div className='question'>이메일로 SOPT 회원 인증이 안된다면?</div>
          <IconArrowRight />
        </GoogleFormButton>
        <div className='description'>
          {`SOPT 정보 등록 시 기입한 이메일의 확인이 어려운 경우,\n구글폼을 통해 가입을 도와드리고 있어요!`}{' '}
        </div>
      </ErrorNotice>
    </Container>
  );
};

export default VerifyByEmail;

function formatErrorMessage(error: AxiosError<ErrorResponse> | null) {
  const innerMessage = error?.response?.data?.message;
  return innerMessage ?? '서버와의 접속이 실패했습니다.';
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0 24px;
  }
`;

const Title = styled.h2`
  ${textStyles.SUIT_32_SB}
`;

const Description = styled.p`
  margin-top: 12px;
  margin-bottom: 45px;
  ${textStyles.SUIT_16_M};
`;

const Label = styled.label`
  align-self: flex-start;
  margin-bottom: 18px;
  color: ${colors.gray80};
  ${textStyles.SUIT_14_M};
`;

const ErrorMessage = styled.p<{ show: boolean }>`
  display: flex;
  align-items: center;
  align-self: flex-start;
  opacity: ${(props) => (props.show ? 1 : 0)};
  margin-top: 16px;
  margin-bottom: 30px;
  height: 15px;
  color: ${colors.red100};
  ${textStyles.SUIT_14_M};

  & > svg {
    margin-right: 6px;
    height: 100%;
  }
`;

const SendButton = styled(SquareLink)`
  align-self: stretch;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const ErrorNotice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 60px;
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 19px 0 18px 20px;
  width: 420px;

  .description {
    line-height: 140%;
    white-space: pre-line;
    color: ${colors.gray60};
    font-size: 12px;
    font-weight: 500;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const GoogleFormButton = styled.button`
  display: flex;
  gap: 2px;
  align-items: center;

  .text {
    color: ${colors.gray10};

    ${textStyles.SUIT_14_M}
  }
`;

const StyledInput = styled(Input)`
  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;
