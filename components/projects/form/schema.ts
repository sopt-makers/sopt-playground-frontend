import * as z from 'zod';

const DATE_PATTERN = /^\d{4}.(0[1-9]|1[0-2])/g;

export const uploadSchema = z.object({
  name: z.string().min(1, '프로젝트 이름을 입력해주세요.'),
  period: z.object({
    startAt: z.string().min(1, 'zzz').regex(DATE_PATTERN, '날짜 형식에 맞게 입력해주세요.'),
    endAt: z.string().regex(DATE_PATTERN, '날짜 형식에 맞게 입력해주세요.').nullable(),
  }),
});

// export type ProjectFormType = yup.InferType<typeof validation>;
export type ProjectFormType = z.infer<typeof uploadSchema>;
