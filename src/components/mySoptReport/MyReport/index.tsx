import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { EffectCards } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import ReportCard from '@/components/mySoptReport/ReportCard';
import { MB_BIG_MEDIA_QUERY, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

import { Button, useToast } from '@sopt-makers/ui';

import MiniReportCard from '@/components/mySoptReport/MiniReportCard';
import { MyPgData } from '@/components/mySoptReport/MyPG';

import particle_mo from '@/public/icons/img/mySoptReport/particle_mo.png';
import particle_pc from '@/public/icons/img/mySoptReport/particle_pc.png';
import particle_ta from '@/public/icons/img/mySoptReport/particle_ta.png';
import personOff from '@/public/icons/img/mySoptReport/person_off.png';
import personOn from '@/public/icons/img/mySoptReport/person_on.png';

import { indicatorIcons, Value } from '@/components/mySoptReport/constants';
import Popup from '@/components/mySoptReport/PopUp';
import { PLAYGROUND_ORIGIN } from '@/constants/links';
import { fonts } from '@sopt-makers/fonts';
import { toPng } from 'html-to-image';
import { playgroundLink } from 'playground-common/export';

interface MyReportProps {
  myPgData: MyPgData;
}

interface Card {
  id: keyof typeof indicatorIcons;
  value: Value;
}

const index = ({ myPgData }: MyReportProps) => {
  const { open } = useToast();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsArray, setCardsArray] = useState<Card[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (myPgData) {
      const cards = Object.entries(myPgData).map(([key, value]) => ({
        id: key as keyof typeof indicatorIcons,
        value,
      }));
      setCardsArray(cards);
    }
  }, [myPgData]);

  const handleDownLoad = async () => {
    const element = document.getElementById('downloadableContent');
    if (element) {
      const dataUrl = await toPng(element);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = '2024년 마이 솝트 리포트';
      link.click();
    }

    open({
      icon: 'success',
      content: '이미지가 저장되었어요!',
      style: {
        content: {
          whiteSpace: 'pre-wrap',
        },
      },
    });
  };

  const copyLinkToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${PLAYGROUND_ORIGIN}${playgroundLink.mySoptReport()}`);
      open({
        icon: 'success',
        content: '링크가 복사되었어요!',
        style: {
          content: {
            whiteSpace: 'pre-wrap',
          },
        },
      });
    } catch (error) {
      open({
        icon: 'error',
        content: '링크 복사에 실패했어요. 다시 시도해주세요!',
        style: {
          content: {
            whiteSpace: 'pre-wrap',
          },
        },
      });
      console.error('링크 복사 실패:', error);
    }
  };

  return (
    <Container>
      <StyledSwiper
        modules={[EffectCards]}
        effect='cards'
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        grabCursor={true}
        loop={true}
        slidesPerView={1}
        centeredSlides={true}
      >
        {cardsArray?.map((card) => (
          <SwiperSlide key={card.id}>
            <ReportCard type={card.id} value={card.value} />
          </SwiperSlide>
        ))}
      </StyledSwiper>

      <Indicators>
        {cardsArray?.map((card, index) => {
          const iconConfig = indicatorIcons[card.id] || {
            off: personOff,
            on: personOn,
          };

          return (
            <Indicator
              key={index}
              isActive={index === activeIndex}
              onClick={() => {
                const swiperElement = document.querySelector('.swiper') as HTMLElement & { swiper: any };
                if (swiperElement?.swiper) {
                  swiperElement.swiper.slideToLoop(index);
                }
              }}
            >
              <IconWrapper isActive={index === activeIndex}>
                <img src={index === activeIndex ? iconConfig.on.src : iconConfig.off.src} alt='icon' />
              </IconWrapper>
            </Indicator>
          );
        })}
      </Indicators>

      <CollectButton onClick={() => setIsPopupOpen(true)}>한 장으로 모아보기</CollectButton>

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} onDownload={handleDownLoad}>
        <HiddenContent $isSmall={true}>
          {cardsArray
            ?.filter((card) => card.id !== 'myCrewStats')
            .map((card) => (
              <MiniReportCard key={card.id} type={card.id} value={card.value} />
            ))}
          <MentionMakers>@sopt_makers</MentionMakers>
        </HiddenContent>
      </Popup>

      <HiddenContent id='downloadableContent'>
        {cardsArray
          ?.filter((card) => card.id !== 'myCrewStats')
          .map((card) => (
            <MiniReportCard key={card.id} type={card.id} value={card.value} />
          ))}
        <MentionMakers>@sopt_makers</MentionMakers>
      </HiddenContent>

      <ShareSection>
        <p>
          나의 데이터를 공유하고,
          <br /> SOPT 친구들과 함께 나눠보세요!
        </p>
        <CollectButton onClick={copyLinkToClipboard}>리포트 링크 공유하기</CollectButton>
      </ShareSection>
    </Container>
  );
};

export default index;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: white;
`;

const StyledSwiper = styled(Swiper)`
  width: 294px;
  height: 460px;

  .swiper-slide {
    transition: all 0.3s ease;
    opacity: 1;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 245px;
    height: 370px;
  }
`;

const Indicators = styled.div`
  display: flex;
  gap: 18px;
  z-index: 1;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 14px;
    padding-left: 24px;
    width: 375px;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Indicator = styled.div<{ isActive: boolean }>`
  flex-shrink: 0;
  cursor: pointer;
  width: 80px;
  height: 80px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 60px;
    height: 60px;
  }
`;

const IconWrapper = styled.div<{ isActive: boolean }>`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CollectButton = styled(Button)`
  z-index: 1;
  margin-top: 40px;
  ${fonts.LABEL_18_SB};

  border-radius: 9999px;
  padding: 16px 26px;

  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.LABEL_16_SB};

    border-radius: 9999px;
    padding: 12px 20px;
  }
`;

const HiddenContent = styled.div<{ $isSmall?: boolean }>`
  display: flex;
  top: 0;
  left: 0;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  ${({ $isSmall }) => ($isSmall ? 'transform: scale(1.0);' : ' position: absolute;')};

  z-index: -1;
  border-radius: 20px;
  background-image: url('/icons/img/mySoptReport/collect_bg.png') !important;
  background-size: cover;
  padding: 193px 26px 0;
  width: 560px;
  height: 960px;

  @supports (-webkit-touch-callout: none) {
    background-image: url('/icons/img/mySoptReport/collect_bg.png') !important;
    /* stylelint-disable */
    -webkit-background-size: cover !important;
  }
`;

const MentionMakers = styled.p`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 32px;
  background-color: #346ffa;
  padding: 6px 28px;
  width: 236.5px;
  height: 40px;
`;

const ShareSection = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -200px;
  background-image: url(${particle_pc.src});
  background-size: cover;
  width: 100vw;
  height: 1000px;

  p {
    position: relative;
    text-align: center;
    ${fonts.HEADING_20_B};
  }

  button {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    padding: 16px 26px;
    width: 248px;
    height: 56px;
  }
  @media ${MOBILE_MEDIA_QUERY} {
    background-image: url(${particle_ta.src});
    width: 768px;
    height: 780px;
  }

  @media ${MB_BIG_MEDIA_QUERY} {
    background-image: url(${particle_mo.src});
    width: 430px;
    height: 780px;
  }
`;
