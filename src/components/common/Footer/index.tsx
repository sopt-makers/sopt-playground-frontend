import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { MAKERS_TEAM_URL, playgroundLink } from '@/constants/links';
import useKakao from '@/hooks/useKakao';
import useScroll from '@/hooks/useScroll';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { zIndex } from '@/styles/zIndex';

interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({}) => {
  const { isScrollingDown, isScrollTop } = useScroll();
  const { logClickEvent } = useEventLogger();
  const { pathname } = useRouter();
  const { handleKakaoChat } = useKakao();

  return (
    <StyledFooter hide={isScrollingDown && !isScrollTop}>
      <Link href={playgroundLink.makers()} passHref legacyBehavior>
        <FooterLink highlight={pathname === playgroundLink.makers()} onClick={() => logClickEvent('aboutMakers')}>
          만든 사람들
        </FooterLink>
      </Link>
      <FooterLink href={MAKERS_TEAM_URL} target='_blank'>
        메이커스 소개
      </FooterLink>
      <FooterButton type='button' onClick={handleKakaoChat}>
        의견 제안하기
      </FooterButton>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.div<{ hide: boolean }>`
  display: flex;
  position: fixed;
  bottom: 0;
  transition: transform 0.3s;
  z-index: ${zIndex.헤더}+1;
  border-top: 1px solid ${colors.gray600};
  background-color: ${colors.gray800};
  padding: 0 0 0 38px;
  width: 100%;

  ${(props) =>
    props.hide
      ? css`
          transform: translateY(100%);
        `
      : ''}

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0 0 0 10px;
  }
`;

const FooterLink = styled.a<{ highlight?: boolean }>`
  padding: 17px 10px;

  ${(props) =>
    props.highlight
      ? css`
          color: ${colors.white};
        `
      : css`
          color: ${colors.gray200};
        `}
`;

const FooterButton = styled.button<{ highlight?: boolean }>`
  padding: 17px 10px;

  ${(props) =>
    props.highlight
      ? css`
          color: ${colors.white};
        `
      : css`
          color: ${colors.gray200};
        `}
`;
