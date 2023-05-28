import { MentorCareer, MentorData, MentoringData } from '@/components/mentoring/MentoringDetail/types';

export const DUMMY_MENTOR_DATA = [{ id: 1, name: '송정우' }] as const;
export const DUMMY_MENTOR_ID_DATA = DUMMY_MENTOR_DATA.map((mentorData: MentorData) => mentorData.id);

// 더미 데이터, 변수명으로 표시 안 한 이유: 실제로도 하드로 넣을 데이터여서 쓸 변수명 미리 지어놓음.
export const MENTORING_DATA_BY_MENTOR_ID: MentoringData<MentorData> = {
  '1': {
    mentorName: '송정우',
    title: '정우와 함께하는 CGP Review',
    keywords: ['백엔드 커리어패스 상담', '개발 실력을 키우기 위한 방법'],
    introduce: '성장에 대한 고민, 커리어/이직에 대한 고민을 듣고 이에 대한 도움을 드릴 수 있을 거 같습니다.',
    howTo: `- 대면 혹은 비대면으로 진행됩니다. 대면으로 진행 시 강남, 선릉 방면에서 진행 예정입니다.
- 진행 시간은 약 1시간 정도를 생각하고 있으며, 주기적으로 진행할지는 멘티와 논의를 통해 결정할 생각입니다.
- 쪽지에 다음과 같은 내용을 적어주세요(자기소개, 멘토링 받고 싶은 내용, 답장 받을 연락처)
- 만약 신청 인원이 너무 많을 경우, 멘토링 받고 싶은 내용에 기반하여 인원을 선별할 수 있음을 사전에 안내드립니다.
- (가능하다면) 포폴 링크도 첨부 부탁드립니다.`,
    target: `- 어떻게 공부해야 더 성장할 수 있을지 고민하고 있는 학생 개발자
- 커리어에 대한 고민이 있는 주니어 개발자
- 주기적으로 상황을 공유하고 이에 대한 피드백을 받고 싶은 개발자`,
    nonTarget: `- 지속적으로 성장하고 싶은 욕구가 부족한 분에게는 권장하지 않습니다.
- 안타깝게도 간편하게 성장할 수 있는 방법은 제시하지 않습니다. 따라서 쉽게 취업하기 위한 방법으로 본 멘토링을 택하시는 것은 큰 도움이 되지 않을 수 있습니다.`,
  },
};

export const CAREER_DUMMY_DATA: MentorCareer = {
  careers: [
    { companyName: 'LINE PLUS', startDate: '2022.02', endDate: '2022.08', isCurrent: false, title: 'Product Designer' },
  ],
  links: [{ title: 'Linkedin', url: 'https://playground.sopt.org', id: 1 }],
  skill: 'Node, Product Managing, Branding, UI',
};