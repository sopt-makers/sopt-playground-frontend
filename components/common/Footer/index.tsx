import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { FEEDBACK_FORM_URL } from '@/constants/links';
import useScroll from '@/hooks/useScroll';
import { colors } from '@/styles/colors';

interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({}) => {
  const { isScrollingDown, isScrollTop } = useScroll();
  const { pathname } = useRouter();

  return (
    <StyledFooter hide={isScrollingDown && !isScrollTop}>
      <Link href='/makers' passHref>
        <FooterLink highlight={pathname === '/makers'}>만든 사람들</FooterLink>
      </Link>
      <FooterLink href={FEEDBACK_FORM_URL}>의견 제안하기</FooterLink>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.div<{ hide: boolean }>`
  display: flex;
  position: fixed;
  bottom: 0;
  transition: transform 0.3s;
  border-top: 1px solid ${colors.black40};
  background-color: ${colors.black80};
  padding: 0 0 0 38px;
  width: 100%;

  ${(props) =>
    props.hide
      ? css`
          transform: translateY(100%);
        `
      : ''}
`;

const FooterLink = styled.a<{ highlight?: boolean }>`
  padding: 17px 10px;

  ${(props) =>
    props.highlight
      ? css`
          color: ${colors.white100};
        `
      : css`
          color: ${colors.gray40};
        `}
`;
