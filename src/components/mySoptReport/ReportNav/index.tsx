import { menuList } from '@/components/mySoptReport/constants';
import { ActiveTabType } from '@/components/mySoptReport/types';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { useEffect, useRef, useState } from 'react';

interface ReportNavProps {
  activeTab: ActiveTabType;
  handleSetActive: (tab: ActiveTabType) => void;
}

export default function ReportNav({ activeTab, handleSetActive }: ReportNavProps) {
  const tabRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY >= 600) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    // MEMO: Throttle: 100ms마다 실행되도록 설정, 거꾸로 스크롤했을 때의 스크롤값이 잘 동작하도록.
    const throttleScroll = () => {
      let timeout: NodeJS.Timeout | null;
      return () => {
        if (!timeout) {
          timeout = setTimeout(() => {
            handleScroll();
            timeout = null;
          }, 100);
        }
      };
    };

    const throttledHandleScroll = throttleScroll();
    window.addEventListener('scroll', throttledHandleScroll);

    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  return (
    <Menus isFixed={isFixed} ref={tabRef} id='nav'>
      {menuList.map(({ title, mainColor, textColor, id }) => {
        return (
          <MenuTab
            isActive={activeTab === id}
            mainColor={mainColor}
            textColor={textColor}
            onClick={() => handleSetActive(id)}
          >
            {title}
          </MenuTab>
        );
      })}
    </Menus>
  );
}

const Menus = styled.nav<{ isFixed: boolean }>`
  display: flex;
  gap: 8px;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;
  background-color: ${colors.gray800};
  padding: 8px 20px;
  width: 100%;
  height: 54px;

  ${({ isFixed }) =>
    isFixed &&
    css`
      position: fixed;
      top: 80px;
      transition: top 0.1s ease-in-out;
      z-index: 100;

      @media ${MOBILE_MEDIA_QUERY} {
        top: 64px;
      }
    `};
`;

const MenuTab = styled.div<{ isActive: boolean; mainColor: keyof typeof colors; textColor: keyof typeof colors }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, color 0.2s ease;
  border-radius: 100px;
  cursor: pointer;
  padding: 9px 0;
  width: 100%;

  ${fonts.TITLE_14_SB};

  ${({ isActive, mainColor, textColor }) =>
    isActive
      ? css`
          background-color: ${colors[mainColor]};
          color: ${colors[textColor]};
        `
      : css`
          background-color: transparent;
          color: ${colors.gray100};

          &:hover {
            color: ${colors[mainColor]};
          }
        `};
`;
