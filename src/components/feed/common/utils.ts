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
      title: string;
    } | null;
  };
  categoryId: number | null;
  categoryName: string;
}

export enum Category {
  자유 = 1,
  파트,
  SOPT_활동,
  홍보,
  취업_진로,
  후기 = 19,
  꿀팁,
}

export const CategoryList = {
  자유: '자유',
  파트: '파트',
  SOPT활동: 'SOPT활동',
  홍보: '홍보',
  취업_진로: '취업/진로',
  솝티클: '솝티클',
};

const 특수임원List = [
  '메이커스 리드',
  '메이커스 팀장',
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

  if (
    post.categoryId === Category.취업_진로 ||
    post.categoryId === Category.후기 ||
    post.categoryId === Category.꿀팁
  ) {
    return `${post.member.careers ? `${post.member.careers.title} @${post.member.careers.companyName}` : defaultInfo}`;
  }

  return defaultInfo;
}

export const categoryIdNameMap: Record<number, string> = {
  1: '자유',
  2: '파트',
  3: 'SOPT 활동',
  4: '홍보',
  5: '취업/진로',
  21: '솝티클',
  22: '질문',
};

export const getParentCategoryId = (
  categoryData: { id: number; children: { id: number }[] }[] | undefined,
  categoryId: number,
): number | '' => {
  // 자식이 없으면 ''을 부모로
  return categoryData?.find((cat) => cat.children.some((child) => child.id === categoryId))?.id ?? '';
};
