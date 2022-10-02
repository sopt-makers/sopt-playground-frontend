import styled from '@emotion/styled';
import Link from 'next/link';
import { FC, useState } from 'react';

import Button from '@/components/common/Button';
import Menu from '@/components/common/LegacyHeader/Menu';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const HEADER_MOBILE_MEDIA_QUERY = '(max-width: 600px)';

const Header: FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  const onToggle = () => {
    setIsMenuOpened((isOpen) => !isOpen);
  };

  return (
    <>
      <StyledHeader>
        <StyledContent>
          <Link href='/' passHref>
            <a>
              <StyledIconLogo alt='logo' src='/icons/icon-logo.png' />
            </a>
          </Link>
          <Empty />
          <Link passHref href='/projects/upload'>
            <a>
              <StyledUploadButton variant='primary' size='fill'>
                + 내 프로젝트 올리기
              </StyledUploadButton>
            </a>
          </Link>
          <Link passHref href='/auth/login'>
            <a>
              <StyledLoginButton size='fill'>로그인</StyledLoginButton>
            </a>
          </Link>
          <StyledIconMenu alt='menu' src='/icons/icon-menu.svg' onClick={onToggle} />
        </StyledContent>
      </StyledHeader>
      <Menu isOpen={isMenuOpened} onToggle={onToggle} />
    </>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background-color: ${colors.black100};
  height: 100px;
  @media (max-width: 1060px) {
    width: 100%;
  }
  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: center;
    margin: 0;
    margin-top: 40px;
    padding: 14px 20px;
    height: 56px;
  }
`;

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  width: 1160px;
`;

const Empty = styled.div`
  flex: 1;
  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const StyledIconLogo = styled.img`
  justify-self: center;
  cursor: pointer;
  width: 125px;
  height: 41px;
  @media ${MOBILE_MEDIA_QUERY} {
    width: 97px;
    height: 31px;
  }
`;

const StyledUploadButton = styled(Button)`
  padding: 11px 21px;
  @media ${HEADER_MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const StyledLoginButton = styled(Button)`
  margin: 0 0 0 10px;
  border: 1px solid #534d64;
  padding: 11px 21px;
  font-weight: 700;
  @media ${HEADER_MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const StyledIconMenu = styled.img`
  margin-left: 44px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  @media ${MOBILE_MEDIA_QUERY} {
    position: absolute;
    top: 63px;
    right: 30px;
    width: 16px;
    height: 16px;
  }
`;
