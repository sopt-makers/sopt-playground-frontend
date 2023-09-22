import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import Link from 'next/link';
import { FC } from 'react';

import { playgroundLink } from '@/constants/links';
import useScroll from '@/hooks/useScroll';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  const { isScrollingDown, isScrollTop } = useScroll();

  return (
    <Container hide={isScrollingDown && !isScrollTop}>
      <ButtonGroup>
        <LoginButton href={playgroundLink.login()}>로그인</LoginButton>
        <RegisterButton href={playgroundLink.register()}>회원가입</RegisterButton>
      </ButtonGroup>
    </Container>
  );
};

export default Login;

const Container = styled.div<{ hide: boolean }>`
  display: flex;
  flex-direction: row-reverse;
  padding: 13px 30px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    position: fixed;
    bottom: 0;
    transition: transform 0.3s;
    z-index: 99999;
    background: linear-gradient(180deg, rgb(0 0 0 / 0%) 0%, rgb(0 0 0 / 100%) 100%);
    padding: 12px 16px;
    width: 100%;

    ${(props) =>
      props.hide
        ? css`
            transform: translateY(100%);
          `
        : ''}
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
`;

const LoginButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: ${colors.white100};
  padding: 6px 10px;
  color: ${colors.black100};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 12px 10px;

    ${textStyles.SUIT_18_M};
  }
`;

const RegisterButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.black40};
  border-radius: 6px;
  background: ${colors.black80};
  padding: 6px 10px;

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 12px 10px;

    ${textStyles.SUIT_18_M};
  }
`;
