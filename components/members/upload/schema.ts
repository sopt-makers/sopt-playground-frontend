import * as yup from 'yup';

import { EMAIL_REG_EXP, PHONE_REG_EXP } from '@/components/members/upload/constants';

export const memberFormSchema = yup.object().shape({
  profileImage: yup.string(),
  name: yup.string().required('이름을 입력해주세요'),
  birthday: yup.object().shape({
    year: yup.string(),
    month: yup.string(),
    day: yup.string(),
  }),
  phone: yup
    .string()
    .when([], (_, { originalValue }) =>
      originalValue?.length ? yup.string().matches(PHONE_REG_EXP, `'-'를 넣어 입력해주세요`) : yup.string(),
    ),
  email: yup
    .string()
    .when([], (_, { originalValue }) =>
      originalValue?.length ? yup.string().matches(EMAIL_REG_EXP, '이메일 양식에 맞게 입력해주세요') : yup.string(),
    ),
  address: yup.string(),
  university: yup.string(),
  major: yup.string(),
  activities: yup.array().of(
    yup.object().shape({
      generation: yup.string().required('기수를 입력해주세요'),
      part: yup.string().required('파트를 입력해주세요'),
      team: yup.string().required('팀 소속 정보를 입력해주세요'),
    }),
  ),
  openToWork: yup.boolean(),
  openToSideProject: yup.boolean(),
  allowOfficial: yup.boolean(),
});
