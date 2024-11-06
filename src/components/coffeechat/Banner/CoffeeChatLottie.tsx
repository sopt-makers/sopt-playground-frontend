import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });
import styled from '@emotion/styled';

import Responsive from '@/components/common/Responsive';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import mobilePC from '@/public/lottie/coffee_MO.json';
import coffeePC from '@/public/lottie/coffee_PC.json';
import { PCTA_MID_MEDIA_QUERY } from '@/styles/mediaQuery';

function CoffeeChatLottie() {
  const defaultDesktopOptions = {
    loop: true,
    autoplay: true,
    animationData: coffeePC,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', 
    },
  };
  const defaultMobileOptions = {
    loop: true,
    autoplay: true,
    animationData: mobilePC,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', 
    },
  };
  return (
<LoggingClick eventKey='coffeechatBanner'>
  <a href='https://www.notion.so/sopt-makers/87ca4563b6ec49528b7d34372edff677?pvs=4' target="_blank">
  <Responsive only='desktop'>
    <DesktopLottieWrapper>
      <Lottie
        options={defaultDesktopOptions}
        width={'100%'}/>
    </DesktopLottieWrapper>
    </Responsive>
    <Responsive only='mobile'>
        <MobileLottieWrapper>
          <Lottie
            options={defaultMobileOptions}
            width={'100%'} />
      </MobileLottieWrapper>
    </Responsive>
  </a>
</LoggingClick>
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