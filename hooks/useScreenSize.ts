import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

enum ScreenSize {
  mobile = '375px',
  desktop = '1056px',
}

const useScreenSize = () => {
  const [screen, setScreen] = useState<ScreenSize>(ScreenSize.desktop);
  const mobile = useMediaQuery({ maxWidth: ScreenSize.mobile });

  const isMobile = screen === ScreenSize.mobile;

  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }

    if (mobile) {
      setScreen(ScreenSize.mobile);
    } else {
      setScreen(ScreenSize.desktop);
    }
  }, [mobile]);

  return { isMobile };
};

export default useScreenSize;
