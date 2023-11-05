import 'swiper/css';
import 'swiper/css/navigation';

import styled from '@emotion/styled';
import * as Portal from '@radix-ui/react-portal';
import { colors } from '@sopt-makers/colors';
import { Flex } from '@toss/emotion-utils';
import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Text from '@/components/common/Text';

interface FeedImageSliderProps {
  images: string[];
  opened: boolean;
  onClose: () => void;
}

const FeedImageSlider = ({ images, opened, onClose }: FeedImageSliderProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <AnimatePresence>
      {opened ? (
        <Portal.Root container={document.body} css={{ position: 'absolute', inset: 0 }}>
          <Background initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Text css={{ position: 'absolute', top: '30px' }} typography='SUIT_18_SB'>
              {`${activeIndex + 1}/${images.length}`}
            </Text>
            <CloseButton css={{ position: 'absolute', bottom: '48px' }} onClick={onClose}>
              <IconClose />
            </CloseButton>
            <Swiper
              modules={[Navigation]}
              navigation
              slidesPerView={1}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img css={{ width: 'auto', height: '600px', objectFit: 'cover' }} src={image} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Background>
        </Portal.Root>
      ) : null}
    </AnimatePresence>
  );
};

const Background = styled(m.div)`
  display: flex;
  position: relative;
  inset: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background-color: ${colors.gray950};
  width: 100%;
  height: 100%;
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  border-radius: 50%;
  background-color: ${colors.gray10};
  padding: 12px;
  width: 44px;
  height: 44px;
`;

export default FeedImageSlider;

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

// function DynamicImage({ src }: { src: string }) {
//   const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

//   useEffect(() => {
//     const img = new Image();
//     img.src = src;

//     img.onload = () => {
//       const originalWidth = img.width;
//       const originalHeight = img.height;

//       // 더 큰 값이 600px보다 큰 경우, 비율을 유지하면서 크기를 조절
//       if (originalWidth > originalHeight) {
//         setImageSize({ width: 600, height: (600 / originalWidth) * originalHeight });
//       } else {
//         setImageSize({ width: (600 / originalHeight) * originalWidth, height: 600 });
//       }
//     };
//   }, [src]);

//   return (
//     <img
//       css={{
//         objectFit: 'cover',
//         width: imageSize.width,
//         height: imageSize.height,
//       }}
//       src={src}
//       width={imageSize.width}
//       height={imageSize.height}
//       alt='이미지'
//     />
//   );
// }
