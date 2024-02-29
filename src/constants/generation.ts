export const LATEST_GENERATION = 34; // TODO: 자동 갱신 로직 있으면 좋음

export const GENERATIONS = Array.from({ length: LATEST_GENERATION }, (_, i) => (i + 1).toString()).reverse();
