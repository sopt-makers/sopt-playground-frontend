import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

const Header: FC = () => {
  return (
    <StyledHeader>
      <Link href='/' passHref>
        <TextLinkButton>SOPT</TextLinkButton>
      </Link>
      <Link href='/' passHref>
        <TextLinkButton>멤버</TextLinkButton>
      </Link>
      <Link href='/projects' passHref>
        <TextLinkButton>프로젝트</TextLinkButton>
      </Link>
      <Spacer />
      <Link href='/projects/upload' passHref>
        <TextLinkButton>내 프로젝트 올리기</TextLinkButton>
      </Link>
      <Link href='/auth/login' passHref>
        <TextLinkButton>로그아웃</TextLinkButton>
      </Link>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextLinkButton = styled.a`
  padding: 5px 10px;
`;

const Spacer = styled.span`
  display: block;
  flex-grow: 1;
`;
