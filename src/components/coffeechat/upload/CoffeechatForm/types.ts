export interface CoffeechatFormContent {
  memberInfo: {
    career: string | null | undefined;
    introduction: string | null | undefined;
  };
  coffeeChatInfo: {
    sections: string[] | undefined;
    bio: string | null | undefined;
    topicTypes: string[] | undefined;
    topic: string | null | undefined;
    meetingType: string | null | undefined;
    guideline: string | null | undefined;
  };
}

// MEMO: 모든 경로를 문자열로 만드는 유틸리티 타입
type Path<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends Record<string, unknown>
    ? `${K}.${Path<T[K]>}` | K
    : K
  : never;

export type CoffeechatFormPaths = Path<CoffeechatFormContent>;
