import * as yup from 'yup';

const PHONE_REG_EXP = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
const EMAIL_REG_EXP = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const YEAR_REG_EXP = /^\d{4}$/;
const MONTH_REG_EXP = /^0?[1-9]{1}$|^1{1}[0-2]{1}$/;
const DAY_REG_EXP = /^0?[1-9]{1}$|^[1-2]{1}[0-9]{1}$|^3{1}[0-1]{1}$/;

export const memberFormSchema = yup.object().shape({
  profileImage: yup.string(),
  name: yup.string().required('이름을 입력해주세요.'),
  birthday: yup.object().shape({
    year: yup.lazy(() =>
      yup.string().when(['month', 'day'], {
        is: (month: string, day: string) => month || day,
        then: yup.string().required('연도를 입력해주세요.').matches(YEAR_REG_EXP, '연도를 숫자 4자리로 입력해주세요.'),
      }),
    ),
    month: yup.lazy(() =>
      yup.string().when(['year', 'day'], {
        is: (year: string, day: string) => year || day,
        then: yup.string().required('월을 입력해주세요.').matches(MONTH_REG_EXP, '월을 형식에 맞게 입력해주세요.'),
      }),
    ),
    day: yup.lazy(() =>
      yup.string().when(['year', 'month'], {
        is: (year: string, month: string) => year || month,
        then: yup.string().required('일을 입력해주세요.').matches(DAY_REG_EXP, '일을 형식에 맞게 입력해주세요.'),
      }),
    ),
  }),
  phone: yup
    .string()
    .when([], (_, { originalValue }) =>
      originalValue?.length
        ? yup.string().matches(PHONE_REG_EXP, `'-'를 넣어 휴대폰 양식에 맞게 입력해주세요.`)
        : yup.string(),
    ),
  email: yup
    .string()
    .when([], (_, { originalValue }) =>
      originalValue?.length ? yup.string().matches(EMAIL_REG_EXP, '이메일 양식에 맞게 입력해주세요.') : yup.string(),
    ),
  address: yup.string(),
  university: yup.string(),
  major: yup.string(),
  activities: yup.array().of(
    yup.object().shape({
      generation: yup.string().required('기수를 입력해주세요.'),
      part: yup.string().required('파트를 입력해주세요.'),
      team: yup.string().required('팀 소속 정보를 입력해주세요.'),
    }),
  ),
  openToWork: yup.boolean(),
  openToSideProject: yup.boolean(),
  allowOfficial: yup.boolean(),
});
