import styled from '@emotion/styled';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import { DEFAULT_PROFILE_IMAGE_DESKTOP_SVG } from '@/components/common/Header/imageData';
import ResizedImage from '@/components/common/ResizedImage';
import { colors } from '@/styles/colors';

interface ProfileButtonProps {
  name: string;
  profileImage?: string;
}

const ProfileButton = forwardRef<HTMLButtonElement, ProfileButtonProps & ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ name, profileImage, ...props }, ref) => {
    return (
      <StyledProfileButton ref={ref} {...props}>
        <ImageSlot>
          {profileImage ? <ResizedImage src={profileImage} width={32} alt='' /> : DEFAULT_PROFILE_IMAGE_DESKTOP_SVG}
        </ImageSlot>
        <NameSlot>{name}</NameSlot>
      </StyledProfileButton>
    );
  },
);

export default ProfileButton;

const StyledProfileButton = styled.button`
  display: flex;
  align-items: center;
  border-radius: 19px;
  background-color: ${colors.black80};
  cursor: pointer;
  height: 38px;
`;

const ImageSlot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 3px;
  border-radius: 50%;
  background-color: ${colors.black60};
  width: 32px;
  height: 32px;
  overflow: hidden;
`;

const NameSlot = styled.div`
  flex-grow: 1;
  margin-right: 8px;
  padding: 0 8px;
  min-width: 60px;
  text-align: center;
`;
