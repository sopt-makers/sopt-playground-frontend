export interface CoffeechatFormContent {
  memberInfo: {
    career: string | null;
    introduction: string | null;
  };
  coffeeChatInfo: {
    sections: string[];
    bio: string | null;
    topicTypes: string[];
    topic: string | null;
    meetingType: string | null;
    guideline: string | null;
  };
}

// MEMO: 모든 경로를 문자열로 만드는 유틸리티 타입
type Path<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends Record<string, unknown>
    ? `${K}.${Path<T[K]>}` | K
    : K
  : never;

export type CoffeechatFormPaths = Path<CoffeechatFormContent>;
