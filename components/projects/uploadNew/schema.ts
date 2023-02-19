import * as yup from 'yup';

const DATE_PATTERN = /^\d{4}.(0[1-9]|1[0-2])/g;

export const validation = yup.object({
  name: yup.string().required('프로젝트 이름을 입력해주세요.'),
  period: yup.object({
    isOngoing: yup.boolean().required(),
    startAt: yup.string().required('시작일을 입력해주세요.').matches(DATE_PATTERN, '날짜 형식에 맞게 입력해주세요.'),
    endAt: yup.string().when('isOngoing', {
      is: false,
      then: yup.string().required('종료일을 입력해주세요.').matches(DATE_PATTERN, '날짜 형식에 맞게 입력해주세요.'),
    }),
  }),
});

export type ProjectFormType = yup.InferType<typeof validation>;
