import { ClickEvents } from '@/components/eventLogger/events';
import { playgroundLink } from '@/constants/links';
import CoffeeIcon from '@/public/logos/playgroundGuide/img_coffee.svg';
import GroupIcon from '@/public/logos/playgroundGuide/img_group.svg';
import MemberIcon from '@/public/logos/playgroundGuide/img_member.svg';
import ProjectIcon from '@/public/logos/playgroundGuide/img_project.svg';

export interface TimecapsuleCard {
  id: number;
  name: string;
  eventKey: keyof Pick<
    ClickEvents,
    'timeCapsuleGotoCrew' | 'timeCapsuleGotoProject' | 'timeCapsuleGotoMember' | 'timeCapsuleGotoCoffeechat'
  >;
  description: string;
  color: string;
  hover: string;
  icon: React.ReactNode;
  button: string;
  href: string;
}

export const cards: TimecapsuleCard[] = [
  {
    id: 1,
    name: '모임',
    description: 'SOPT에는 어떤 모임이 있을지 궁금해요',
    color: '#FF6E1D',
    hover: '#C24F0F',
    icon: <GroupIcon />,
    button: '#521F01',
    href: playgroundLink.groupList(),
    eventKey: 'timeCapsuleGotoCrew',
  },
  {
    id: 2,
    name: '멤버',
    description: '나와 함께 활동할 37기 사람들이 궁금해요',
    color: '#5CDBFE',
    hover: '#4194AB',
    icon: <MemberIcon />,
    button: '#0E5A6F',
    href: playgroundLink.memberList(),
    eventKey: 'timeCapsuleGotoMember',
  },
  {
    id: 3,
    name: '프로젝트',
    description: 'SOPT에서 만들어진 프로덕트를 보고싶어요',
    color: '#FDBBF9',
    hover: '#BC60A7',
    icon: <ProjectIcon />,
    button: '#8C3D87',
    href: playgroundLink.projectList(),
    eventKey: 'timeCapsuleGotoProject',
  },
  {
    id: 4,
    name: '커피솝',
    description: 'SOPT 이전 기수에게 조언을 듣고싶어요',
    color: '#3E74FD',
    hover: '#2952BC',
    icon: <CoffeeIcon />,
    button: '#1C2584',
    href: playgroundLink.coffeechat(),
    eventKey: 'timeCapsuleGotoCoffeechat',
  },
];
