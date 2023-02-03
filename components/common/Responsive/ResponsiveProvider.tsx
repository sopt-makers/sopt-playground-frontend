import { css, Global } from '@emotion/react';
import { FC, ReactNode } from 'react';

import { ResponsiveContext } from '@/components/common/Responsive/context';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface ResponsiveProviderProps {
  children: ReactNode;
  classNamePrefix?: string;
}

const ResponsiveProvider: FC<ResponsiveProviderProps> = ({ children, classNamePrefix = 'responsive' }) => {
  const mobileOnlyClassName = `${classNamePrefix}-mobile-only`;
  const desktopOnlyClassName = `${classNamePrefix}-desktop-only`;

  return (
    <ResponsiveContext.Provider value={{ mobileOnlyClassName, desktopOnlyClassName }}>
      <Global
        styles={css`
          .${mobileOnlyClassName} {
            display: none !important;
          }

          .${desktopOnlyClassName} {
            display: block !important;
          }

          @media ${MOBILE_MEDIA_QUERY} {
            .${mobileOnlyClassName} {
              display: block !important;
            }

            .${desktopOnlyClassName} {
              display: none !important;
            }
          }
        `}
      />
      {children}
    </ResponsiveContext.Provider>
  );
};

export default ResponsiveProvider;
