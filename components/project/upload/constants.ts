const 최근_기수 = 30;

export const 기수 = Array.from({ length: 최근_기수 }, (_, i) => i + 1).reverse();

// TODO: 서버쪽 인터페이스에 맞게 수정
export enum OfficialActivitiy {
  앱잼 = '앱잼',
  솝커톤 = '솝커톤',
  솝텀 = '솝텀',
  스터디 = '스터디',
  합동세미나 = '합동세미나',
  기타 = '기타',
}
