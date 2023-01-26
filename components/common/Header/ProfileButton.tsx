import styled from '@emotion/styled';
import { FC } from 'react';

import ResizedImage from '@/components/common/ResizedImage';
import { colors } from '@/styles/colors';

interface ProfileButtonProps {
  className?: string;
  name: string;
  profileImage?: string;
}

const defaultProfileIcon = (
  <svg width='12' height='16' viewBox='0 0 12 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <ellipse cx='6' cy='3.27734' rx='3' ry='3' fill='#8040FF' />
    <path
      d='M0.386173 10.4183C0.707163 9.00483 1.92449 8.00586 3.32595 8.00586H8.59734C9.93707 8.00586 11.1167 8.92036 11.4947 10.2521L11.8754 11.5932C12.4443 13.5973 10.9942 15.6053 8.97802 15.6053H3.0214C1.07392 15.6053 -0.364421 13.7236 0.0816294 11.7594L0.386173 10.4183Z'
      fill='#8040FF'
    />
  </svg>
);

const ProfileButton: FC<ProfileButtonProps> = ({ className, name, profileImage }) => {
  return (
    <StyledProfileButton className={className}>
      <ImageSlot>{profileImage ? <ResizedImage src={profileImage} width={32} alt='' /> : defaultProfileIcon}</ImageSlot>
      <NameSlot>{name}</NameSlot>
    </StyledProfileButton>
  );
};

export default ProfileButton;

const StyledProfileButton = styled.button`
  display: flex;
  align-items: center;
  border-radius: 19px;
  background-color: ${colors.black80};
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
