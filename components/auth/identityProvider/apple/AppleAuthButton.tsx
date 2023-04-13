import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

import IconFacebook from '@/public/icons/icon-facebook.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface AppleAuthButtonProps {
  children?: ReactNode;
  onClick?(): void;
  className?: string;
}

const AppleAuthButton: FC<AppleAuthButtonProps> = (props) => {
  const { children, onClick, className } = props;

  return (
    <StyledAppleAuthButton className={className} onClick={onClick}>
      <IconContainer>
        <IconFacebook />
      </IconContainer>
      {children}
    </StyledAppleAuthButton>
  );
};

export default AppleAuthButton;

const StyledAppleAuthButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${colors.facebook};
  cursor: pointer;
  height: 48px;
  color: ${colors.white};

  ${textStyles.SUIT_16_M}

  @media ${MOBILE_MEDIA_QUERY} {
    height: 42px;

    ${textStyles.SUIT_14_M}
  }
`;

const IconContainer = styled.div`
  margin-right: 10px;
  height: 26px;

  & > svg {
    height: 100%;
    fill: white;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    height: 22px;
  }
`;
