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

export function getMemberInfo(post: Post) {
  const defaultInfo = `${post.member.activity.generation}기 ${post.member.activity.part}파트`;

  if (post.categoryId == null) {
    return `${post.categoryName}에 남김`;
  }

  if (post.categoryId === Category.취업_진로) {
    return `${post.member.careers?.companyName ?? defaultInfo}`;
  }

  return defaultInfo;
}
