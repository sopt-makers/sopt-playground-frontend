import { DefaultValues } from 'react-hook-form';
import * as z from 'zod';

import { Value } from '@/components/projects/form/fields/MemberField';
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
  members: z.array(
    z.object({
      memberId: z.number({
        required_error: '유저를 선택해주세요.',
      }),
      memberRole: z.string({
        required_error: '역할을 선택해주세요.',
      }),
      memberDescription: z.string({
        required_error: '어떤 역할을 맡았는지 입력해주세요.',
      }),
    }),
  ),
});

export type ProjectFormType = z.infer<typeof uploadSchema>;

export const DEFAULT_MEMBER: Value = {
  memberId: undefined,
  memberRole: undefined,
  memberDescription: undefined,
};

export const defaultUploadValues: DefaultValues<ProjectFormType> = {
  name: '',
  generation: String(LATEST_GENERATION),
  period: {
    startAt: '',
    endAt: '',
  },
  category: undefined,
  members: [DEFAULT_MEMBER],
};
