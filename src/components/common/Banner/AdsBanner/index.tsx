import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import dayjs from 'dayjs';
import { useState } from 'react';
import Slider, { CustomArrowProps, Settings } from 'react-slick';

import { useBannersImages } from '@/api/endpoint/homeBanner/getBannersImages';
import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import AdsBox from '@/components/common/Banner/AdsBanner/AdsBox';
import { ADS } from '@/components/common/Banner/AdsBanner/constants/ads';
import Skeleton from '@/components/common/Skeleton';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import { LoggingImpression } from '@/components/eventLogger/components/LoggingImpression';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const AdsBanner: React.FC = () => {
  const { data: myData } = useGetMemberOfMe();
  const myId = myData && myData.id;

  const [flag, setFlag] = useState(false);

  const handleTimeFlag = () => {
    setFlag((flag) => !flag);
  };

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
    beforeChange: handleTimeFlag,
    afterChange: handleTimeFlag,
  };

  const time = dayjs().format('YYYY-MM-DD HH:mm:ss');

  const { data: bannersData, isLoading } = useBannersImages();
  const banners = bannersData?.data && bannersData.data.length > 0 ? bannersData.data : ADS;

  return (
    <SliderWrapper>
      {isLoading ? (
        <Skeleton width={912} height={164} borderRadius={12} margin='0 30px' color={colors.gray800} />
      ) : (
        <AdsSlider {...settings}>
          {banners.map((ad, idx) => (
            <LoggingClick
              key={idx}
              eventKey='ads'
              param={{ id: myId, bannerId: idx, pageUrl: ad.link, timeStamp: time }}
            >
              <LoggingImpression
                areaThreshold={1}
                eventKey='ads'
                param={{ bannerId: idx, pageUrl: ad.link, timeStamp: time }}
              >
                <div onClick={handleTimeFlag}>
                  <AdsBox {...ad} />
                </div>
              </LoggingImpression>
            </LoggingClick>
          ))}
        </AdsSlider>
      )}
    </SliderWrapper>
  );
};

export default AdsBanner;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
`;

const AdsSlider = styled(Slider as React.ComponentType<Settings>)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 912px;
  overflow: hidden;
  aspect-ratio: 912 / 164;

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

  .slick-list {
    width: 100%;
    height: 100%;
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
    z-index: 99;
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
    background-color: ${colors.gray50};
  }

  .custom-dots li button {
    display: none;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    aspect-ratio: 335 / 168;
    margin: 0 20px -4px;
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
            stroke='#E4E4E5'
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
            stroke='#E4E4E5'
            stroke-width='2.25'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </g>
      </Next>
    </div>
  );
};
