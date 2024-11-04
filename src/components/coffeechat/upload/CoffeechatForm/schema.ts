import * as yup from 'yup';

const myInfoSchema = yup.object().shape({
  career: yup
    .mixed()
    .test(
      'is-string-or-array',
      '경력을 선택해주세요',
      (value) => typeof value === 'string' || (Array.isArray(value) && value.length > 0),
    )
    .required('경력을 선택해주세요'),
  introduction: yup.string().required('자기소개를 입력해주세요'),
});

const coffeeChatInfoSchema = yup.object().shape({
  sections: yup.array().of(yup.string()).min(1, '관련 분야를 선택해주세요').required('관련 분야를 선택해주세요'),
  bio: yup.string().required('커피챗 제목을 입력해주세요'),
  topicTypes: yup
    .array()
    .of(yup.string())
    .min(1, '커피챗 주제 키워드를 선택해주세요')
    .required('커피챗 주제 키워드를 선택해주세요'),
  topic: yup.string().required('커피챗 주제 소개를 입력해주세요'),
  meetingType: yup.string().nullable().required('커피챗 진행 방식을 선택해주세요'),
  guideline: yup.string().nullable(),
});

export const coffeeChatchema = yup.object().shape({
  memberInfo: myInfoSchema,
  coffeeChatInfo: coffeeChatInfoSchema,
});
