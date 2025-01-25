import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { useEffect, useState } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
const getKoreanDate = (): string => {
  const now = new Date();
  const offset = 9 * 60;
  const koreanTime = new Date(now.getTime() + offset * 60 * 1000);
  return `${koreanTime.getFullYear()}-${String(koreanTime.getMonth() + 1).padStart(2, '0')}-${String(
    koreanTime.getDate(),
  ).padStart(2, '0')}`;
};

export const HomePopup = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <StBackground>
      <StPopupModal>
        <StImage src='/icons/img/home-popup-sample.png' />
        <StModalFooter>
          <StFooterLeftButton>오늘 하루 그만보기</StFooterLeftButton>
          <StFooterRightButton>닫기</StFooterRightButton>
        </StModalFooter>
      </StPopupModal>
    </StBackground>
  );
};

const StBackground = styled.div`
  display: flex;
  position: fixed;
  align-items: flex-start;
  justify-content: center;
  z-index: 201;
  background-color: rgb(23 24 28 / 80%);
  padding-top: 100px;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  @media ${MOBILE_MEDIA_QUERY} {
    align-items: center;
    padding-top: 0;
    padding-bottom: 32px;
  }
`;
const StPopupModal = styled.div`
  display: flex;
  flex-direction: column;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${colors.gray900};
  width: 422px;
  height: 560px;

  @media ${MOBILE_MEDIA_QUERY} {
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    width: 295px;
    height: 382px;
  }
`;
const StImage = styled.img`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 100%;
  height: 500px;
  @media ${MOBILE_MEDIA_QUERY} {
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    height: 334px;
  }
`;

const StModalFooter = styled.footer`
  display: flex;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: ${colors.white};
  width: 100%;
  height: 60px;

  @media ${MOBILE_MEDIA_QUERY} {
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
    height: 48px;
  }
`;
const StFooterLeftButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 2px solid rgb(195 195 198);
  width: 243px;
  color: ${colors.black};
  font: ${fonts.LABEL_18_SB};
  font-weight: 600;
  @media ${MOBILE_MEDIA_QUERY} {
    width: 170px;
    ${fonts.LABEL_14_SB};
  }
`;

const StFooterRightButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 179px;
  color: ${colors.black};
  font: ${fonts.LABEL_18_SB};
  font-weight: 600;
  @media ${MOBILE_MEDIA_QUERY} {
    width: 125px;
    ${fonts.LABEL_14_SB};
  }
`;
