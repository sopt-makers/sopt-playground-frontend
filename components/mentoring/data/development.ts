import { Mentor, Mentoring, MentoringData } from '@/components/mentoring/data/types';

const MENTOR_LIST = [
  { id: 1, name: '송정우' },
  { id: 4, name: '이정민' },
  { id: 7, name: '이준호' },
  { id: 8, name: '남주영' },
  { id: 9, name: '이정연' },
] as const;
// FIXME: satisfies 사용 위해 스토리북 7.0 업데이트 필요
// satisfies readonly Mentor[];

type MentorList = typeof MENTOR_LIST[number];

type MentoringByMentorId<Mentor extends MentorList> = {
  [M in Mentor as M['id']]: {
    mentorName: M['name'];
  } & Mentoring;
};

const MENTORING_BY_MENTOR_ID: MentoringByMentorId<MentorList> = {
  '7': {
    mentorName: '이준호',
    title: '메이커스 3기 고민된다면 🤔\n함께 얘기해요. 같이 고민해봐요!',
    keywords: ['메이커스', '커리어 고민', '프론트엔드'],
    introduce: `안녕하세요! 현재 카카오스타일에서 근무하고 있고, 
      곧 토스에서 프론트엔드 개발자로 근무할 3년차 프론트엔드 개발자 이준호라고 합니다 😄
      지금 여러분들이 보고 계신 SOPT Playground를 처음부터 개발해온 사람이기도 해요.
  
      커리어를 걸어오는 만들어오는 과정에서, Makers가 저에게 줬던 가치들이 정말 큰 도움이 되었어요.(2기를 병행하면서 큰 도움을 받아 이직할 수 있었다고 생각해요.)
  
      Makers에서 얻은 좋은 가치들을 함께 나누고 싶어 멘토링을 신청하게 되었습니다! (저만 알고 있기 아쉽잖아요?!)
  
      SOPT를 경험해보신 여러분들의 Next Step으로 SOPT Makers 3기를 고민하신다면, 제가 그 고민 들어드릴게요!
      `,
    howTo: `- 대면 / 비대면 / 유선 어떤 방식이던 좋아요. 편하신 방향으로 진행하고자 해요! 
      (다만, 대면 진행시 강남, 선릉 방면에서 진행할 예정이에요)
  
      - 진행 시간은 정해두고 진행하진 않으려 해요. 짧고 간단히 얘기해봐도 좋고, 고민이 풀릴때 까지 얘기해봐도 좋아요.(무려 F가 80%인 ESFJ, 이야기 듣는걸 잘하고 좋아해요 ☺️)
  
      - 간단한 자기소개와 함께 연락처를 커피챗 쪽지로 보내주세요! 직접 제 번호로 연락주셔도 좋아요.
  
      - 어떤 고민이 있으신지 사전에 공유주시면 좋겠어요. 더 좋은 경험을 드릴 수 있게 고민해볼게요!
      `,
    target: `- Next Step으로 SOPT Makers를 생각하는 분
      - 지금 내 상황에서 Makers가 어떤 가치를 줄 수 있을지 고민되는 분
      - 프론트엔드 분야에서 어떻게 더 잘 성장할 수 있는지, 내가 잘 하고 있는지 고민되는 분도 좋아요.
      - 어떻게 동기부여를 얻고, 어떻게 Makers를 병행하며 커리어를 쌓아올 수 있었는지 제 이야기가 궁금하신 분도 좋아요!
      `,
    nonTarget: `- Makers 이야기가 아닌 커리어 고민도 좋아요. 하지만 직무에 대한 고민이라면 프론트엔드가 아닌 다른 고민은 들어드리기 어려울 것 같아요.
      - 주니어가 아니신 분들에게는 도움이 되지 않을 수 있어요.
      `,
    isOpened: true,
  },
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
    isOpened: true,
  },
  '4': {
    mentorName: '이정민',
    title: '정민과 함께하는 CGP Review',
    keywords: ['웹 프론트엔드 개발자의 커리어/개발 지식/업무 경험'],
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
    isOpened: true,
  },
  '8': {
    mentorName: '남주영',
    title: '주영과 함께하는 CGP Review',
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
    isOpened: false,
  },
  '9': {
    mentorName: '이정연',
    title: '정연과 함께하는 CGP Review',
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
    isOpened: true,
  },
};

export const MENTORING_DATA_FOR_DEVELOPMENT: MentoringData = {
  mentorList: MENTOR_LIST,
  mentoringByMentorId: MENTORING_BY_MENTOR_ID,
};
