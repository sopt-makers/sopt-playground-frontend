import styled from '@emotion/styled';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { colors } from '@sopt-makers/colors';
import { IconUser } from '@sopt-makers/icons';
import { m } from 'framer-motion';

import ResizedImage from '@/components/common/ResizedImage';
import Responsive from '@/components/common/Responsive';

import { shimmerEffect } from '../style';

interface MemberProfileImageProps {
  isLoading?: boolean;
  imageUrl: string;
  size?: 'lg' | 'md' | 'sm';
}

const MemberProfileImage = ({ isLoading, imageUrl, size = 'lg' }: MemberProfileImageProps) => {
  const imageSize = {
    lg: 115,
    md: 72,
    sm: 60,
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
    },
  };

  return (
    <ProfileImage>
      <StyledImageArea>
        <StyledAspectRatio ratio={1 / 1}>
          <ImageHolder variants={imageVariants}>
            {isLoading ? (
              <LoadingImage />
            ) : imageUrl ? (
              <Image className='image' src={imageUrl} width={196} alt='member_image' />
            ) : (
              <>
                <Responsive only='desktop'>
                  <IconUser
                    style={{
                      width: imageSize[size],
                      height: imageSize[size],
                      color: `${colors.gray400}`,
                      paddingTop: '10px',
                    }}
                  />
                </Responsive>
                <Responsive only='mobile'>
                  <IconUser
                    style={{
                      width: 60,
                      height: 60,
                      color: `${colors.gray400}`,
                      paddingTop: '10px',
                    }}
                  />
                </Responsive>
              </>
            )}
          </ImageHolder>
        </StyledAspectRatio>
      </StyledImageArea>
    </ProfileImage>
  );
};

const ImageHolder = styled(m.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

const StyledAspectRatio = styled(AspectRatio.Root)`
  width: 100%;
`;

const ProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledImageArea = styled.div`
  transform: translateZ(0);
  border-radius: 50%;
  background-color: ${colors.gray700};
  width: 100%;
  max-width: 196px;
  overflow: hidden;
`;

const LoadingImage = styled.div`
  ${shimmerEffect};

  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const Image = styled(ResizedImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default MemberProfileImage;
