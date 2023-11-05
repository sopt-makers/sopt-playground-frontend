import 'swiper/css';
import 'swiper/css/navigation';

import styled from '@emotion/styled';
import * as Portal from '@radix-ui/react-portal';
import { colors } from '@sopt-makers/colors';
import { AnimatePresence, m } from 'framer-motion';
import { useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import { DynamicImage } from '@/components/feed/detail/slider/DynamicImage';
import { useEscapeCallback } from '@/hooks/useEscapeCallback';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface FeedImageSliderProps {
  images: string[];
  opened: boolean;
  onClose: () => void;
}

const FeedImageSlider = ({ images, opened, onClose }: FeedImageSliderProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  useEscapeCallback({
    callback: onClose,
  });

  return (
    <AnimatePresence>
      {opened ? (
        <Portal.Root container={document.body} css={{ position: 'absolute', inset: 0 }}>
          <Background
            css={{ position: 'relative' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {images.length > 1 ? <StyledIndex>{`${activeIndex + 1}/${images.length}`}</StyledIndex> : null}
            <CloseButton onClick={onClose}>
              <IconClose />
            </CloseButton>
            <Responsive only='desktop' asChild>
              <StyledSwiper
                modules={[Navigation]}
                navigation={true}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              >
                {images.map((image, index) => (
                  <StyledSwiperSlide key={`${image}-${index}`}>
                    <DynamicImage src={image} alt='slider-image' />
                  </StyledSwiperSlide>
                ))}
              </StyledSwiper>
            </Responsive>
            <Responsive only='mobile' asChild>
              <StyledSwiper onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}>
                {images.map((image, index) => (
                  <StyledSwiperSlide key={`${image}-${index}`}>
                    <img src={image} css={{ width: '100%', objectFit: 'cover' }} alt='slider-image' />
                  </StyledSwiperSlide>
                ))}
              </StyledSwiper>
            </Responsive>
          </Background>
        </Portal.Root>
      ) : null}
    </AnimatePresence>
  );
};

export default FeedImageSlider;

// MEMO(@juno-lee): HeaderLayout의 zIndex가 100이어서 같은 값으로 설정하고 portal을 이용하여 html 배치 순서로 결정
const Background = styled(m.div)`
  display: flex;
  position: relative;
  inset: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background-color: ${colors.gray950};
  width: 100%;
  height: 100%;
`;

const CloseButton = styled.button`
  position: absolute;
  bottom: 48px;
  flex-shrink: 0;
  transition: background-color 0.2s ease-in-out;
  border-radius: 50%;
  background-color: ${colors.gray10};
  padding: 12px;
  width: 44px;
  height: 44px;

  :hover {
    background-color: ${colors.gray50};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    bottom: calc(16px + env(safe-area-inset-bottom));
  }
`;

const StyledIndex = styled(Text)`
  position: absolute;
  top: 30px;

  ${textStyles.SUIT_18_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    top: 12px;
    ${textStyles.SUIT_14_SB};
  }
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;

  & > .swiper-button-prev,
  & > .swiper-button-next {
    color: ${colors.white};
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconClose = () => (
  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M3.10267 3.10462C3.35414 2.85315 3.76186 2.85315 4.01334 3.10462L9.9974 9.08868L15.9815 3.10462C16.2329 2.85315 16.6406 2.85315 16.8921 3.10462C17.1436 3.3561 17.1436 3.76381 16.8921 4.01529L10.9081 9.99935L16.8921 15.9834C17.1436 16.2349 17.1436 16.6426 16.8921 16.8941C16.6406 17.1456 16.2329 17.1456 15.9815 16.8941L9.9974 10.91L4.01334 16.8941C3.76186 17.1456 3.35414 17.1456 3.10267 16.8941C2.85119 16.6426 2.85119 16.2349 3.10267 15.9834L9.08673 9.99935L3.10267 4.01529C2.85119 3.76381 2.85119 3.3561 3.10267 3.10462Z'
      fill='#0F1012'
    />
  </svg>
);
