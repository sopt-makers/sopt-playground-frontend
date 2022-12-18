import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

import SquareLink from '@/components/common/SquareLink';
import IconGoogle from '@/public/icons/icon-google-color.svg';
import { colors } from '@/styles/colors';

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
  background-color: ${colors.white};
  color: ${colors.black100};
`;

const StyledGoogleIcon = styled(IconGoogle)`
  margin-right: 10px;
  height: 100%;
`;
