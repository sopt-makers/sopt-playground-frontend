import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });
import styled from '@emotion/styled';

import Responsive from '@/components/common/Responsive';
import mobilePC from '@/public/lottie/coffee_MO.json';
import coffeePC from '@/public/lottie/coffee_PC.json';
import { PCTA_MID_MEDIA_QUERY } from '@/styles/mediaQuery';

function CoffeeChatLottie() {
  const defaultDesktopOptions = {
    loop: true,
    autoplay: true,
    animationData: coffeePC,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', // 비율 유지하면서 화면 꽉 채우기
    },
  };
  const defaultMobileOptions = {
    loop: true,
    autoplay: true,
    animationData: mobilePC,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', // 비율 유지하면서 화면 꽉 채우기
    },
  };
  return (
    <a href='https://www.notion.so/sopt-makers/87ca4563b6ec49528b7d34372edff677?pvs=4'>
    <Responsive only='desktop'>
    <DesktopLottieWrapper>
      <Lottie
        options={defaultDesktopOptions}
        width={'100%'} // 화면 너비에 맞춤
      />
    </DesktopLottieWrapper>
    </Responsive>
    <Responsive only='mobile'>
        <MobileLottieWrapper>
        <Lottie
          options={defaultMobileOptions}
          width={'100%'} // 화면 너비에 맞춤
        />
      </MobileLottieWrapper>
      </Responsive>
      </a>
  );
}

export default CoffeeChatLottie;

const DesktopLottieWrapper=styled.div`
  position: relative;
  width: 100vw;
  height: 196px;
  overflow: hidden;

  @media ${PCTA_MID_MEDIA_QUERY}{
    height:146px;
  }
`
const MobileLottieWrapper=styled.div`
  position: relative;
  width: 100vw;
  height: 196px;
  overflow: hidden;

`