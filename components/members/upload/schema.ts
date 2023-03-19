import * as yup from 'yup';

const PHONE_REG_EXP = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
const EMAIL_REG_EXP = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const YEAR_REG_EXP = /^\d{4}$/;
const MONTH_REG_EXP = /^0?[1-9]{1}$|^1{1}[0-2]{1}$/;
const DAY_REG_EXP = /^0?[1-9]{1}$|^[1-2]{1}[0-9]{1}$|^3{1}[0-1]{1}$/;

export const memberFormSchema = yup.object().shape({
  profileImage: yup.string().nullable(),
  name: yup.string().required('이름을 입력해주세요.'),
  birthday: yup
    .object()
    .shape({
      year: yup.lazy(() =>
        yup.string().when(['month', 'day'], {
          is: (month: string, day: string) => month || day,
          then: (schema) =>
            schema.required('연도를 입력해주세요.').matches(YEAR_REG_EXP, '연도를 숫자 4자리로 입력해주세요.'),
        }),
      ),
      month: yup.lazy(() =>
        yup.string().when(['year', 'day'], {
          is: (year: string, day: string) => year || day,
          then: (schema) =>
            schema.required('월을 입력해주세요.').matches(MONTH_REG_EXP, '월을 형식에 맞게 입력해주세요.'),
        }),
      ),
      day: yup.lazy(() =>
        yup.string().when(['year', 'month'], {
          is: (year: string, month: string) => year || month,
          then: (schema) =>
            schema.required('일을 입력해주세요.').matches(DAY_REG_EXP, '일을 형식에 맞게 입력해주세요.'),
        }),
      ),
    })
    .nullable(),
  phone: yup.lazy((value) =>
    value === ''
      ? yup.string()
      : yup.string().nullable().matches(PHONE_REG_EXP, `'-'를 넣어 휴대폰 양식에 맞게 입력해주세요.`),
  ),
  email: yup.lazy((value) =>
    value === ''
      ? yup.string().required('이메일을 입력해주세요.')
      : yup.string().required('이메일을 입력해주세요.').matches(EMAIL_REG_EXP, `이메일 양식에 맞게 입력해주세요.`),
  ),
  address: yup.string().nullable(),
  university: yup.string().nullable(),
  major: yup.string().nullable(),
  activities: yup.array().of(
    yup.object().shape({
      generation: yup.string().required('기수를 입력해주세요.'),
      part: yup.string().required('파트를 입력해주세요.'),
      team: yup.string().required('팀 소속 정보를 입력해주세요.'),
    }),
  ),
  links: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.lazy(() =>
          yup
            .string()
            .when('url', { is: (url: string) => url, then: (schema) => schema.required('링크를 선택해주세요.') }),
        ),
        url: yup.lazy(() =>
          yup
            .string()
            .when('title', { is: (title: string) => title, then: (schema) => schema.required('링크를 입력해주세요.') })
            .url('url 형태로 입력해주세요.'),
        ),
      }),
    )
    .nullable(),
  allowOfficial: yup.boolean(),
  careers: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.lazy(() =>
          yup.string().when(['companyName', 'startDate', 'endDate'], {
            is: (companyName: string, startDate: string, endDate: string) => companyName || startDate || endDate,
            then: (schema) => schema.required('직무를 입력해주세요.'),
          }),
        ),
        companyName: yup.lazy(() =>
          yup.string().when(['title', 'startDate', 'endDate'], {
            is: (title: string, startDate: string, endDate: string) => title || startDate || endDate,
            then: (schema) => schema.required('회사를 입력해주세요.'),
          }),
        ),
        startDate: yup.lazy(() =>
          yup.string().when(['title', 'companyName', 'endDate'], {
            is: (title: string, companyName: string, endDate: string) => title || companyName || endDate,
            then: (schema) => schema.required('근무 시작일을 입력해주세요.'),
          }),
        ),
        endDate: yup.lazy(() =>
          yup.string().when('isCurrent', {
            is: false,
            then: (schema) =>
              schema.when(['title', 'startDate', 'companyName'], {
                is: (title: string, startDate: string, companyName: string) => title || startDate || companyName,
                then: (schema) => schema.required('근무 종료일을 입력해주세요.'),
              }),
          }),
        ),
      }),
    )
    .nullable(),
});
