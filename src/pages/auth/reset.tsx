import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { FC } from 'react';

import ByPhoneView from '@/components/auth/register/verify/view/ByPhoneView';
import useResetLogin from '@/components/auth/reset/useResetLogin';
import { playgroundLink } from '@/constants/links';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const ResetPage: FC = () => {
  const router = useRouter();

  const {
    state: phoneState,
    submitCode,
    submitPhone,
  } = useResetLogin({
    onCodeSuccess: (registerToken) => {
      router.push({
        pathname: playgroundLink.reconnectSocialAuth(),
        query: {
          token: registerToken,
        },
      });
    },
  });

  return (
    <StyledResetPage>
      <Title>
        <span>가입 시 인증했던</span>
        <span>전화번호를 입력해주세요</span>
      </Title>
      <ByPhoneView
        {...phoneState}
        onSubmitCode={submitCode}
        onSubmitPhone={submitPhone}
        submitButtonContent='인증 완료하기'
      />
    </StyledResetPage>
  );
};

export default ResetPage;

const StyledResetPage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 48px;
  padding: 0 10px;
  max-width: 420px;
`;

const Title = styled.h2`
  display: flex;
  flex-direction: column;
  margin-bottom: 36px;
  color: ${colors.white100};

  ${textStyles.SUIT_24_B}

  @media ${MOBILE_MEDIA_QUERY} {
    text-align: left;
  }
`;
