import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import styled from '@emotion/styled';
import { FC, useRef, useState } from 'react';
import { Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import Responsive from '@/components/common/Responsive';
import useMediaQuery from '@/hooks/useMediaQuery';
import { colors } from '@/styles/colors';
import { MOBILE_MAX_WIDTH, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface ProjectImageSliderProps {
  images: string[];
  className?: string;
}
const ProjectImageSlider: FC<ProjectImageSliderProps> = ({ images, className }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const prevButton = useRef<HTMLButtonElement>(null);
  const nextButton = useRef<HTMLButtonElement>(null);
  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);

  return (
    <Container className={className}>
      <MainSwiperWrapper>
        <Responsive only='desktop'>
          <button ref={prevButton}>
            <IconPrev />
          </button>
        </Responsive>
        <StyledSwiper
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[Navigation, Thumbs]}
          navigation={
            isMobile
              ? false
              : {
                  nextEl: nextButton.current,
                  prevEl: prevButton.current,
                }
          }
        >
          {images.map((image, index) => (
            <StyledSwiperSlide key={index}>
              <img src={image} alt={image} />
            </StyledSwiperSlide>
          ))}
        </StyledSwiper>
        <Responsive only='desktop'>
          <button ref={nextButton}>
            <IconNext />
          </button>
        </Responsive>
      </MainSwiperWrapper>
      <ThumbsSwiper
        spaceBetween={isMobile ? 8 : 20}
        slidesPerView={isMobile ? 3 : 5}
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
      >
        {images.map((image, index) => (
          <StyledSwiperSlide key={index}>
            <img src={image} alt={image} />
          </StyledSwiperSlide>
        ))}
      </ThumbsSwiper>
    </Container>
  );
};

export default ProjectImageSlider;

const Container = styled.div`
  & .swiper-button-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const MainSwiperWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const StyledSwiper = styled(Swiper)`
  border-radius: 12px;
  height: 675px;

  & .swiper-button-prev,
  .swiper-button-next {
    color: ${colors.gray10};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 0;
    height: 210px;
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ThumbsSwiper = styled(Swiper)`
  margin-top: 30px;

  & .swiper-slide {
    opacity: 0.4;
    cursor: pointer;

    img {
      border-radius: 6px;
    }
  }

  & .swiper-slide-thumb-active {
    opacity: 1;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 14px;
  }
`;

const IconNext = ({ color = '#F7F8FA' }: { color?: string }) => (
  <svg width='21' height='37' viewBox='0 0 21 37' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M3 33.5L18 18.5L3 3.5' stroke={color} stroke-width='6' stroke-linecap='round' stroke-linejoin='round' />
  </svg>
);

const IconPrev = ({ color = '#F7F8FA' }: { color?: string }) => (
  <svg width='21' height='37' viewBox='0 0 21 37' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M18 3.5L3 18.5L18 33.5' stroke={color} stroke-width='6' stroke-linecap='round' stroke-linejoin='round' />
  </svg>
);
