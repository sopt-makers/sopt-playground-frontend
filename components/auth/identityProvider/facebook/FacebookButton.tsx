import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

import SquareLink from '@/components/common/SquareLink';
import IconFacebook from '@/public/icons/icon-facebook.svg';
import { colors } from '@/styles/colors';

interface FacebookButtonProps {
  children?: ReactNode;
  onClick?(): void;
}

const FacebookButton: FC<FacebookButtonProps> = (props) => {
  const { children, onClick } = props;

  return (
    <StyledFacebookButton onClick={onClick}>
      <StyledFacebookIcon />
      {children}
    </StyledFacebookButton>
  );
};

export default FacebookButton;

const StyledFacebookButton = styled(SquareLink)`
  background-color: ${colors.facebook};
  color: ${colors.white};
`;

const StyledFacebookIcon = styled(IconFacebook)`
  margin-right: 10px;
  height: 100%;
  fill: white;
`;
