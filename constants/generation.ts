export const LATEST_GENERATION = 31;

export const GENERATIONS = Array.from({ length: LATEST_GENERATION }, (_, i) => (i + 1).toString()).reverse();
