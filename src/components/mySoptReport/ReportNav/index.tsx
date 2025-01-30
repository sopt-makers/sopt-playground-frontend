import { menuList } from '@/components/mySoptReport/constants';
import useMediaQuery from '@/hooks/useMediaQuery';
import { MOBILE_MAX_WIDTH, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-scroll';
const ScrollLink = Link as React.ElementType;

interface ReportNavProps {
  activeTab: 'sopt' | 'playground' | 'my-pg';
  handleSetActive: (tab: 'sopt' | 'playground' | 'my-pg') => void;
}

export default function ReportNav({ activeTab, handleSetActive }: ReportNavProps) {
  const tabRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [tabTop, setTabTop] = useState(0);
  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);
  const HEADER_HEIGHT = isMobile ? 64 : 80;

  useEffect(() => {
    if (tabRef.current) {
      setTabTop(tabRef.current.offsetTop); // 초기 위치 저장
    }

    const handleScroll = () => {
      if (window.scrollY >= tabTop - HEADER_HEIGHT) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tabTop]);

  return (
    <Menus isFixed={isFixed} ref={tabRef}>
      {menuList.map(({ title, mainColor, textColor, id }) => {
        return (
          <ScrollLink
            key={id}
            to={id}
            smooth={true}
            duration={500}
            onClick={() => handleSetActive(id)}
            style={{ width: '100%' }}
          >
            <MenuTab isActive={activeTab === id} mainColor={mainColor} textColor={textColor}>
              {title}
            </MenuTab>
          </ScrollLink>
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
  height: 54px;

  ${({ isFixed }) =>
    isFixed &&
    css`
      position: 'fixed';
      top: 80px;
      transition: 'top 0.3s ease-in-out';
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
  transition: background-color 0.3s ease, color 0.3s ease;
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
