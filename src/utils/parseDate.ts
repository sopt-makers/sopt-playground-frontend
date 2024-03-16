/*
날짜와 관련된 유틸리티 함수들을 정의합니다.
*/

import dayjs from 'dayjs';

export const convertMillisecondsIntoDateValues = (milliseconds: number) => {
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
};

/**
 * @desc 시작날짜와 끝날짜를 '시작날짜 - 끝날짜' 형태로 변환합니다. 시작날짜와 끝날짜가 같으면 한 날짜만 표시합니다.
 */
export const dateIntoPeriod = (startDate: string, endDate: string) => {
  const formattedStartDate = dayjs(startDate).format('YYYY.MM.DD');
  const formattedEndDate = dayjs(endDate).format('YYYY.MM.DD');
  return `${formattedStartDate}${startDate === endDate ? '' : ` - ${formattedEndDate}`}`;
};
