import { ComponentMeta, ComponentStory } from '@storybook/react';

import Wordchain from '@/components/wordchain/WordchainChatting/Wordchain';

export default {
  components: Wordchain,
} as ComponentMeta<typeof Wordchain>;

const Template: ComponentStory<typeof Wordchain> = (args) => <Wordchain {...args} />;

// FIXME: 타입 오류로 인해 임시 주석 처리
// export const Progress = Template.bind({});
// Progress.args = {
// wordchain: {
//   isProgress: true,
//   winnerName: null,
//   order: 1,
//   initial: { word: '버디버디', userName: '남주영' },
//   wordList: [
//     {
//       user: {
//         id: 1,
//         name: '남주영',
//         profileImage:
//           'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
//       },
//       content: '디자이너',
//     },
//     {
//       user: {
//         id: 2,
//         name: '한지우',
//         profileImage:
//           'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
//       },
//       content: '너가소개서',
//     },
//     {
//       user: {
//         id: 3,
//         name: '한유진',
//         profileImage:
//           'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
//       },
//       content: '서비스',
//     },
//     {
//       user: {
//         id: 4,
//         name: '이준호',
//         profileImage:
//           'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
//       },
//       content: '스키',
//     },
//     {
//       user: {
//         id: 5,
//         name: '이정연',
//         profileImage:
//           'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
//       },
//       content: '키움증권',
//     },
//     {
//       user: {
//         id: 6,
//         name: '박건영',
//         profileImage:
//           'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
//       },
//       content: '권리',
//     },
//   ],
// },
// };

// export const Finished = Template.bind({});
// Finished.args = {
//   isProgress: false,
//   winnerName: '박건영',
//   order: 1,
//   initial: { word: '버디버디', userName: '남주영' },
//   wordList: [
//     {
//       user: {
//         id: 1,
//         name: '남주영',
//         profileImage:
//           'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
//       },
//       content: '디자이너',
//     },
//     {
//       user: {
//         id: 2,
//         name: '한지우',
//         profileImage:
//           'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
//       },
//       content: '너가소개서',
//     },
//     {
//       user: {
//         id: 3,
//         name: '한유진',
//         profileImage:
//           'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
//       },
//       content: '서비스',
//     },
//     {
//       user: {
//         id: 4,
//         name: '이준호',
//         profileImage:
//           'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
//       },
//       content: '스키',
//     },
//     {
//       user: {
//         id: 5,
//         name: '이정연',
//         profileImage:
//           'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
//       },
//       content: '키움증권',
//     },
//     {
//       user: {
//         id: 6,
//         name: '박건영',
//         profileImage:
//           'https://avatars.githubusercontent.com/u/73823388?s=80&u=1371859e01892d66802fa36404ec4a057bfa0c06&v=4',
//       },
//       content: '권리',
//     },
//   ],
// };
