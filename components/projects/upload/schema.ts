import * as yup from 'yup';

const DATE_PATTERN = /^\d{4}.(0[1-9]|1[0-2])/g;

export const schema = yup.object().shape({
  name: yup.string().required('프로젝트 이름을 입력해주세요'),
  generation: yup.object().shape({
    checked: yup.boolean().required(),
    generation: yup.number().when('checked', {
      is: true,
      then: yup.number().optional(),
      otherwise: yup.number().required(),
    }),
  }),
  category: yup.string().required('프로젝트를 어디서 진행했는지 선택해주세요'),
  status: yup.object().shape({
    isFounding: yup.boolean(),
    isAvaliable: yup.boolean(),
  }),
  members: yup.array().of(
    yup.object().shape({
      searchedMember: yup.object().required('유저를 선택해주세요.'),
      memberDescription: yup.string().required('어떤 역할을 맡았는지 입력해주세요.'),
      memberRole: yup.string().required('역할을 선택해주세요.'),
    }),
  ),
  releaseMembers: yup.array().of(
    yup.object().shape({
      searchedMember: yup.object().required('유저를 선택해주세요.'),
      memberDescription: yup.string().required('어떤 역할을 맡았는지 입력해주세요.'),
      memberRole: yup.string().required('역할을 선택해주세요.'),
    }),
  ),
  serviceType: yup.array().required('서비스 형태를 선택해주세요.'),
  period: yup.object().shape({
    isOngoing: yup.boolean(),
    startAt: yup.string().required('시작일을 입력해주세요.').matches(DATE_PATTERN, '날짜 형식에 맞게 입력해주세요.'),
    endAt: yup.string().when('isOngoing', {
      is: false,
      then: yup.string().required('종료일을 입력해주세요.').matches(DATE_PATTERN, '날짜 형식에 맞게 입력해주세요.'),
    }),
  }),
  summary: yup.string().required('프로젝트 한줄 소개를 입력해주세요'),
  detail: yup.string().required('프로젝트 설명을 입력해주세요'),
  logoImage: yup.string().required('로고 이미지를 업로드해 주세요'),
  thumbnailImage: yup.string(),
  projectImage: yup.string(),
  links: yup.array().of(
    yup.object().shape({
      linkTitle: yup.string().required('프로젝트 타입을 선택해주세요.'),
      linkUrl: yup.string().required('프로젝트 링크를 입력해주세요.').url('올바른 링크를 입력해주세요.'),
    }),
  ),
});
