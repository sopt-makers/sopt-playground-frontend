export type QuestionKey = 'ideationStyle' | 'workTime' | 'communicationStyle' | 'workPlace' | 'feedbackStyle';

export type ChoiceSide = 'left' | 'right';

export type Choice = {
  value: string;
  label: string;
};

export type Question = {
  key: QuestionKey;
  left: Choice;
  right: Choice;
};

export const QUESTIONS = [
  {
    key: 'ideationStyle',
    left: { value: '즉흥', label: '즉흥 아이데이션' },
    right: { value: '숙고', label: '숙고 아이데이션' },
  },
  {
    key: 'workTime',
    left: { value: '아침', label: '아침 작업' },
    right: { value: '밤', label: '밤 작업' },
  },
  {
    key: 'communicationStyle',
    left: { value: '몰아서', label: '몰아서 작업' },
    right: { value: '나눠서', label: '나눠서 작업' },
  },
  {
    key: 'workPlace',
    left: { value: '카공', label: '카공 작업' },
    right: { value: '집콕', label: '집콕 작업' },
  },
  {
    key: 'feedbackStyle',
    left: { value: '직설적', label: '직설적 피드백' },
    right: { value: '돌려서', label: '돌려서 피드백' },
  },
] as const satisfies readonly Question[];

export type BalanceGameValue = Partial<Record<QuestionKey, ChoiceSide>>;

export type QuestionItem = (typeof QUESTIONS)[number];

export type WorkPreferenceType = {
  [Q in QuestionItem as Q['key']]: Q['left']['value'] | Q['right']['value'];
};

export const convertAnswersToApiPayload = (answers: BalanceGameValue): WorkPreferenceType => {
  const payload: Partial<WorkPreferenceType> = {};

  QUESTIONS.forEach((q) => {
    const selectedSide = answers[q.key];
    if (selectedSide) {
      (payload as Record<QuestionKey, string>)[q.key] = q[selectedSide].value;
    }
  });

  return payload as WorkPreferenceType;
};

export const convertWorkPreferenceToHashtags = (preference: WorkPreferenceType): string => {
  if (!preference) return '';

  const tags = Object.values(preference);
  const hashtagString = tags.map((tag) => `#${tag}`).join(' ');

  return hashtagString;
};
