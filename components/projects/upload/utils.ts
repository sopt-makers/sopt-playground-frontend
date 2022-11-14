import dayjs from 'dayjs';

const DEFAULT_FORMAT = 'YYYY.MM';
const INPUT_DATE_FORMAT = 'YYYY-MM-DD';

/**
 * FIXME(@jun): 서버쪽 인터페이스가 YYYY-MM-DD로 픽스되고 정우가 유럽을 떠나서
 * 어쩔 수 없이 서버쪽으로만 임시로 날짜 형식을 맞춰주는 함수입니다.
 * 인터페이스가 수정되면 냅다 지워주세요.
 *
 * @remark YYYY.MM => YYYY-MM-DD(startOf('month'))로 변경하는 함수
 */
export const convertPeriodFormat = (period: string) => {
  return dayjs(period, DEFAULT_FORMAT).startOf('month').format(INPUT_DATE_FORMAT);
};
