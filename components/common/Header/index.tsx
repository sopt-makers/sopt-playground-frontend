import { FC } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import IconLogo from '@/public/icons/icon-logo.svg';
import IconLogoMobile from '@/public/icons/icon-logo-mobile.svg';
import IconMenu from '@/public/icons/icon-menu.svg';
import Button from '@/components/common/Button';
import Link from 'next/link';
import useScreenSize from '@/hooks/useScreenSize';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const Header: FC = () => {
  const { isMobile } = useScreenSize();

  return (
    <StyledHeader>
      <StyledLeftSection>
        {/* TODO: 메뉴 생기면 연결 및 주석 해제 */}
        <IconMenu />
        <Link href='/' passHref>
          {!isMobile ? <StyledIconLogo /> : <IconLogoMobile />}
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
      </StyledRightSection>
    </StyledHeader>
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

const StyledIconLogo = styled(IconLogo)`
  cursor: pointer;
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
