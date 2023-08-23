import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { getScreenMaxWidthMediaQuery } from '@/utils';

const SCREEN_SIZE = {
  desktopLarge: 1542,
  desktopSmall: 1200,
  mobile: 768,
};

/**
 * @desc MemberList 페이지의 카드 그리드 뷰의 너비에 맞출 수 있도록 래이아웃을 제공합니다.
 */
export const MemberPageContentLayout = ({ children }: { children?: ReactNode }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  justify-content: center;

  & > * {
    max-width: 1302px;
    @media ${getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.desktopLarge}px`)} {
      max-width: 969px;
    }
    @media ${getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.desktopSmall}px`)} {
      max-width: 636px;
    }
    @media ${getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.mobile}px`)} {
      width: 100%;
    }
  }
`;
