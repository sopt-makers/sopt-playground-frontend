import * as z from 'zod';

export const dateStringSchema = z.string().regex(/^\d{4}.(0[1-9]|1[0-2])/g, '날짜 형식에 맞게 입력해주세요.');

export const uploadSchema = z.object({
  name: z.string().min(1, '프로젝트 이름을 입력해주세요.'),
  period: z.object({
    startAt: dateStringSchema,
    endAt: dateStringSchema.nullable(),
  }),
});

export type ProjectFormType = z.infer<typeof uploadSchema>;

export const defaultUploadValues: ProjectFormType = {
  name: '',
  period: {
    startAt: '',
    endAt: '',
  },
};
