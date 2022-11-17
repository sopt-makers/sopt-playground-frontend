import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import { colors } from '@/styles/colors';

interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <StyledFooter>
      <Link href='/makers' passHref>
        <FooterLink highlight>만든 사람들</FooterLink>
      </Link>
      <FooterLink href='#'>의견 제안하기</FooterLink>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  border-top: 1px solid ${colors.black40};
  background-color: ${colors.black80};
  padding: 0 0 0 38px;
  width: 100%;
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
