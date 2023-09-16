import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

import IconFacebook from '@/public/icons/icon-facebook.svg';
import { legacyColors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface FacebookButtonProps {
  children?: ReactNode;
  onClick?(): void;
  className?: string;
}

const FacebookButton: FC<FacebookButtonProps> = (props) => {
  const { children, onClick, className } = props;

  return (
    <StyledFacebookButton className={className} onClick={onClick}>
      <IconContainer>
        <IconFacebook />
      </IconContainer>
      {children}
    </StyledFacebookButton>
  );
};

export default FacebookButton;

const StyledFacebookButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${legacyColors.facebook};
  cursor: pointer;
  height: 48px;
  color: ${legacyColors.white};

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
