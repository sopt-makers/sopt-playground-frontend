import { FC, useState } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import IconLogoMobile from '@/public/icons/icon-logo-mobile.svg';
import IconMenu from '@/public/icons/icon-menu.svg';
import Button from '@/components/common/Button';
import Link from 'next/link';
import useScreenSize from '@/hooks/useScreenSize';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import Menu from '@/components/common/Header/Menu';

const Header: FC = () => {
  const { isMobile } = useScreenSize();
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  const onToggle = () => {
    setIsMenuOpened((isOpen) => !isOpen);
  };

  return (
    <>
      <StyledHeader>
        <StyledLeftSection>
          <Link href='/' passHref>
            {!isMobile ? <StyledIconLogo alt='logo' src='/icons/logo.png' /> : <IconLogoMobile />}
          </Link>
        </StyledLeftSection>
        <StyledRightSection>
          {!isMobile && (
            <Link passHref href='/project/upload'>
              <a>
                <StyledUploadButton variant='primary' size='fill'>
                  + 내 프로젝트 올리기
                </StyledUploadButton>
              </a>
            </Link>
          )}
          <Link passHref href='/auth/login'>
            <a>
              <StyledLoginButton size='fill'>로그인</StyledLoginButton>
            </a>
          </Link>
          <StyledIconMenu onClick={onToggle} />
        </StyledRightSection>
      </StyledHeader>
      {isMenuOpened && <Menu onToggle={onToggle} />}
    </>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.black100};
  padding: 24px 48px;
  height: 92px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 14px 20px;
    height: 56px;
  }
`;

const StyledLeftSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIconLogo = styled.img`
  cursor: pointer;
  width: 125px;
  height: 41px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 97px;
    height: 31px;
  }
`;

const StyledRightSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledUploadButton = styled(Button)`
  padding: 11px 21px;
`;

const StyledLoginButton = styled(Button)`
  margin: 0 0 0 10px;
  border: 1px solid #534d64;
  padding: 11px 21px;
`;

const StyledIconMenu = styled(IconMenu)`
  margin-left: 36px;
  cursor: pointer;
`;
