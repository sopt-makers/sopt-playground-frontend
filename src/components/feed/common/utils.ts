import 'dayjs/locale/ko';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('ko');
dayjs.extend(relativeTime);

export const getRelativeTime = (date: string) => {
  return dayjs(date).fromNow();
};

interface Post {
  member: {
    activity: {
      generation: number;
      part: string;
    };
    careers: {
      companyName: string;
    } | null;
  };
  categoryId: number | null;
  categoryName: string;
}

export enum Category {
  자유,
  파트,
  SOPT_활동,
  홍보,
  취업_진로,
}

const 특수임원List = [
  '메이커스 리드',
  '기획 파트장',
  '디자인 파트장',
  '웹 파트장',
  '서버 파트장',
  '안드로이드 파트장',
  'iOS 파트장',
  '운영 팀장',
  '미디어 팀장',
  '회장',
  '부회장',
  '총무',
] as const;

export function getMemberInfo(post: Post) {
  const is특수임원 = 특수임원List.some((keyword) => post.member.activity.part.includes(keyword));

  const defaultInfo = `${post.member.activity.generation}기 ${
    is특수임원 ? post.member.activity.part : `${post.member.activity.part}파트`
  }`;

  if (post.categoryId == null) {
    return `${post.categoryName}에 남김`;
  }

  if (post.categoryId === Category.취업_진로) {
    return `${post.member.careers?.companyName ?? defaultInfo}`;
  }

  return defaultInfo;
}
