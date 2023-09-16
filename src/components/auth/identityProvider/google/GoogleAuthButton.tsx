import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

import SquareLink from '@/components/common/SquareLink';
import IconGoogle from '@/public/icons/icon-google-color.svg';
import { legacyColors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface GoogleAuthButtonProps {
  children?: ReactNode;
  onClick?(): void;
  className?: string;
}

const GoogleAuthButton: FC<GoogleAuthButtonProps> = (props) => {
  const { children, onClick, className } = props;

  return (
    <StyledGoogleAuthButton className={className} onClick={onClick}>
      <StyledGoogleIcon />
      {children}
    </StyledGoogleAuthButton>
  );
};

export default GoogleAuthButton;

const StyledGoogleAuthButton = styled(SquareLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${legacyColors.white};
  cursor: pointer;
  height: 48px;
  color: ${legacyColors.black100};

  ${textStyles.SUIT_16_M}

  @media ${MOBILE_MEDIA_QUERY} {
    height: 42px;

    ${textStyles.SUIT_14_M}
  }
`;

const StyledGoogleIcon = styled(IconGoogle)`
  margin-right: 10px;
  height: 100%;
`;
