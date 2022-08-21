import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

enum ScreenSize {
  mobile = '375px',
  tablet = '768px',
  desktop = '1056px',
}

const useScreenSize = () => {
  const [screen, setScreen] = useState<ScreenSize>(ScreenSize.desktop);
  const mobile = useMediaQuery({ maxWidth: ScreenSize.mobile });
  const tablet = useMediaQuery({ maxWidth: ScreenSize.tablet });

  const isMobile = screen === ScreenSize.mobile;
  const isTablet = screen === ScreenSize.tablet;

  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }

    if (mobile) {
      setScreen(ScreenSize.mobile);
    }
    if (tablet) {
      setScreen(ScreenSize.tablet);
    } else {
      setScreen(ScreenSize.desktop);
    }
  }, [mobile, tablet]);

  return { isMobile, isTablet };
};

export default useScreenSize;
