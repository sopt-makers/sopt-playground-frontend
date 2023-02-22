import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import Loading from '@/components/common/Loading';
import { playgroundLink } from '@/constants/links';

interface LoginCallbackViewProps {
  mode:
    | {
        type: 'loading';
      }
    | { type: 'error'; errorMessage: string };
}
const LoginCallbackView: FC<LoginCallbackViewProps> = ({ mode }) => {
  if (mode.type === 'loading') {
    return (
      <StyledFacebookLoginCallback>
        <Loading />
      </StyledFacebookLoginCallback>
    );
  }

  if (mode.type === 'error') {
    return (
      <StyledFacebookLoginCallback>
        <ErrorMessage>{mode.errorMessage}</ErrorMessage>
        <RetryLink href={playgroundLink.login()} replace>
          로그인 페이지로 이동
        </RetryLink>
      </StyledFacebookLoginCallback>
    );
  }

  shouldNotReach(mode);
};

export default LoginCallbackView;

function shouldNotReach(_obj: never): never {
  throw new Error('Should not reach here.');
}

const StyledFacebookLoginCallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const ErrorMessage = styled.p`
  text-align: center;
  line-height: 150%;
  white-space: pre-wrap;
`;

const RetryLink = styled(Link)`
  display: block;
  margin-top: 10px;
  color: #90ace3;

  &:hover {
    text-decoration: underline;
  }
`;
