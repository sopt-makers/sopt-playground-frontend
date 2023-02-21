export const LATEST_GENERATION = 32;

export const GENERATIONS = Array.from({ length: LATEST_GENERATION }, (_, i) => (i + 1).toString()).reverse();
