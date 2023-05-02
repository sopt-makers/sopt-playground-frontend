import { DefaultValues } from 'react-hook-form';
import * as z from 'zod';

import { LATEST_GENERATION } from '@/constants/generation';

export const dateStringSchema = z.string().regex(/^\d{4}.(0[1-9]|1[0-2])/g, '날짜 형식에 맞게 입력해주세요.');

export const uploadSchema = z.object({
  name: z.string().min(1, '프로젝트 이름을 입력해주세요.'),
  generation: z.string().min(1, '기수를 입력해주세요.').nullable(),
  period: z.object({
    startAt: dateStringSchema,
    endAt: dateStringSchema.nullable(),
  }),
  category: z.string({ required_error: '프로젝트를 어디서 진행했는지 선택해주세요.' }),
  status: z.object({
    isAvailable: z.boolean(),
    isFounding: z.boolean(),
  }),
  members: z.array(
    z.object({
      memberId: z.string().min(1, '유저를 선택해주세요.'),
      memberRole: z.string().min(1, '역할을 선택해주세요.'),
      memberDescription: z.string().min(1, '어떤 역할을 맡았는지 입력해주세요.'),
    }),
  ),
  serviceType: z.array(z.string()).nonempty('서비스 형태를 선택해주세요.'),
});

export type ProjectFormType = z.infer<typeof uploadSchema>;

export const DEFAULT_MEMBER = {
  memberId: '',
  memberRole: '',
  memberDescription: '',
};

export const defaultUploadValues: DefaultValues<ProjectFormType> = {
  name: '',
  generation: String(LATEST_GENERATION),
  period: {
    startAt: '',
    endAt: '',
  },
  category: undefined,
  status: {
    isAvailable: false,
    isFounding: false,
  },
  members: [DEFAULT_MEMBER],
  serviceType: [],
};
