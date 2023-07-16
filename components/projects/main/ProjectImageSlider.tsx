import 'swiper/css';
import 'swiper/css/navigation';

import styled from '@emotion/styled';
import { FC } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { colors } from '@/styles/colors';

interface ProjectImageSliderProps {
  images: string[];
}
const ProjectImageSlider: FC<ProjectImageSliderProps> = ({ images }) => {
  return (
    <StyledSwiper modules={[Navigation]} navigation>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt={image} />
        </SwiperSlide>
      ))}
    </StyledSwiper>
  );
};

export default ProjectImageSlider;

const StyledSwiper = styled(Swiper)`
  & .swiper-button-prev,
  .swiper-button-next {
    color: ${colors.gray10};
  }
`;
