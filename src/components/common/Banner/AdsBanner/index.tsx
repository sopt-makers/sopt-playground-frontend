import AdsBox from '@/components/common/Banner/AdsBanner/AdsBox';
import { ADS } from '@/components/common/Banner/AdsBanner/constants/ads';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import Slider, { CustomArrowProps, Settings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const AdsBanner: React.FC = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // 자동 캐러셀
    autoplaySpeed: 5000,
    arrows: true, // 좌,우 버튼
    initialSlide: 0, // 첫 컨텐츠 번호
    prevArrow: ADS && ADS.length > 1 ? <PrevArrow /> : <></>,
    nextArrow: ADS && ADS.length > 1 ? <NextArrow /> : <></>,
    dotsClass: ADS && ADS.length > 1 ? 'custom-dots' : 'hide-dots',
  };

  return (
    <SliderWrapper>
      {ADS && ADS.length > 0 && (
        <AdsSlider {...settings}>
          {ADS.map(({ id, image, url }) => {
            return <AdsBox key={id} image={image} url={url} />;
          })}
        </AdsSlider>
      )}
    </SliderWrapper>
  );
};

export default AdsBanner;

const SliderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
`;

const AdsSlider = styled(Slider as React.ComponentType<Settings>)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 30px;
  border-radius: 12px;
  width: 912px;
  overflow: hidden;

  &:hover {
    .slick-prev {
      visibility: visible;
      opacity: 1;
    }

    .slick-next {
      visibility: visible;
      opacity: 1;
    }
  }

  /* stylelint-disable-next-line no-descending-specificity */
  .slick-prev {
    left: 8px;
    transition: opacity 0.3s, visibility 0.3s;
    visibility: hidden;
    opacity: 0;

    &::before {
      display: none;
    }
  }

  /* stylelint-disable-next-line no-descending-specificity */
  .slick-next {
    right: 8px;
    transition: opacity 0.3s, visibility 0.3s;
    visibility: hidden;
    opacity: 0;

    &::before {
      display: none;
    }
  }

  .slick-arrow {
    position: absolute;
    z-index: 100;
    cursor: pointer;

    @media ${MOBILE_MEDIA_QUERY} {
      display: none;
    }
  }

  .hide-dots {
    display: none;
  }

  .hide-dots li button {
    display: none;
  }

  .custom-dots {
    position: absolute;
    bottom: 10px;
    margin: 0;
    padding: 0;
    width: 100%;
    list-style: none;
    text-align: center;
  }

  .custom-dots li {
    display: inline-block;
    position: relative;
    margin: 0 2px;
    border-radius: 10px;
    background-color: ${colors.gray800};
    cursor: pointer;
    padding: 0;
    width: 16px;
    height: 4px;
  }

  .custom-dots li.slick-active {
    background-color: ${colors.white};
  }

  .custom-dots li button {
    display: none;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin: -8px 20px -20px;
  }
`;

const Prev = styled.svg`
  position: absolute;
  left: 0;
`;

const Next = styled.svg`
  position: absolute;
  right: 0;
`;

const PrevArrow: React.FC<CustomArrowProps> = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <Prev width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g id='Icon / Interaction / chevron-left'>
          <path
            id='Icon'
            d='M18.75 22.5L11.25 15L18.75 7.5'
            stroke='white'
            stroke-width='2.25'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </g>
      </Prev>
    </div>
  );
};

const NextArrow: React.FC<CustomArrowProps> = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <Next width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g id='Icon / Interaction / chevron-right'>
          <path
            id='Icon'
            d='M11.25 22.5L18.75 15L11.25 7.5'
            stroke='white'
            stroke-width='2.25'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </g>
      </Next>
    </div>
  );
};
