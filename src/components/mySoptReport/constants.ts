import { colors } from '@sopt-makers/colors';

import { StaticImageData } from 'next/image';

import personOff from '@/public/icons/img/mySoptReport/person_off.png';
import personOn from '@/public/icons/img/mySoptReport/person_on.png';
import searchOff from '@/public/icons/img/mySoptReport/search_off.png';
import searchOn from '@/public/icons/img/mySoptReport/search_on.png';
import studyOff from '@/public/icons/img/mySoptReport/study_off.png';
import studyOn from '@/public/icons/img/mySoptReport/study_on.png';
import timeOff from '@/public/icons/img/mySoptReport/time_off.png';
import timeOn from '@/public/icons/img/mySoptReport/time_on.png';

import gameOff from '@/public/icons/img/mySoptReport/game_off.png';
import gameOn from '@/public/icons/img/mySoptReport/game_on.png';
import heartOff from '@/public/icons/img/mySoptReport/heart_off.png';
import heartOn from '@/public/icons/img/mySoptReport/heart_on.png';

export const menuList: {
  title: string;
  mainColor: keyof typeof colors;
  textColor: keyof typeof colors;
  id: 'sopt' | 'playground' | 'my-pg';
}[] = [
  { title: '솝트', mainColor: 'blue400', textColor: 'white', id: 'sopt' },
  { title: '플레이그라운드', mainColor: 'orange400', textColor: 'white', id: 'playground' },
  { title: '마이 플그', mainColor: 'yellow400', textColor: 'black', id: 'my-pg' },
];

export interface CommunityStats {
  likeCount: number;
}

export interface ProfileStats {
  viewCount: number;
}

export interface WordChainGameStats {
  playCount: number;
  winCount: number;
  wordList: string[];
}

export interface CardConfig {
  index?: number;
  title: string;
  miniTitle: string;
  description?: string;
  miniValue?: string | string[];
  bgColor: string;
  subImage?: StaticImageData | string;
  strongColor?: string;
  titleColor?: string;
  crewList?: string[];
  wordList?: string[];
}

export interface CrewStats {
  topFastestJoinedGroupList: string[];
}

interface WordLists {
  wordList: string[];
}

export type Value = string | CommunityStats | ProfileStats | CrewStats | WordChainGameStats | { [key: string]: any };

export const getCardConfig = (type: string, value: Value): CardConfig => {
  const cardConfigs: { [key: string]: CardConfig } = {
    totalVisitCount: {
      index: 1,
      title: `작년 한 해 동안\n<span class=highlight>${value}회</span> 방문했어요`,
      miniTitle: '플그에\n방문했던 횟수는',
      description: '앞으로도 플그에\n자주 놀러와주세요!',
      miniValue: `${value}번`,
      bgColor: colors.yellow400,
      subImage: '/icons/img/mySoptReport/card_sub_visit.png',
      strongColor: '#6F5508',
    },
    myCommunityStats: {
      index: 2,
      title: `<span class=highlight>${(value as CommunityStats).likeCount}개</span>의 게시글에\n마음을 표현했어요`,
      miniTitle: '마음을 표한\n게시글은',
      description: '어떤 글이 제일\n인상 깊으셨나요?',
      miniValue: `${(value as CommunityStats).likeCount}개`,
      bgColor: colors.orange400,
      subImage: '/icons/img/mySoptReport/card_sub_like.png',
      strongColor: '#521F01',
    },
    myProfileStats: {
      index: 3,
      title: `멤버들의 프로필 카드를\n<span class=highlight>${(value as ProfileStats).viewCount}번</span> 클릭했어요`,
      miniTitle: '멤버들의 프로필을\n조회한 횟수는',
      description: '어떤 멤버가\n가장 기억에 남으시나요?',
      miniValue: `${(value as ProfileStats).viewCount}번`,
      bgColor: '#5CDBFE',
      subImage: '/icons/img/mySoptReport/card_sub_click.png',
      strongColor: '#0E5A6F',
    },
    myCrewStats: {
      index: 4,
      title: '가장 간절하게\n신청했던 모임은',
      miniTitle: '',
      titleColor: '#E4E4E5',
      bgColor: colors.blue500,
      crewList: (value as CrewStats).topFastestJoinedGroupList,
    },
    myWordChainGameStats: {
      index: 5,
      title: `끝말잇기 게임에서\n<span class=highlight>${
        (value as WordChainGameStats).playCount
      }개</span>의 단어를 이었고,\n<span class=highlight>${
        (value as WordChainGameStats).winCount
      }회</span> 우승을 거뒀어요`,
      miniTitle: '끝말잇기 참여',
      description: '이런 단어들로 승부하셨네요!',
      bgColor: '#FDBBF9',
      strongColor: '#8C3D87',
      wordList: (value as WordLists).wordList,
    },
  };

  return cardConfigs[type];
};

export const indicatorIcons = {
  myType: { off: personOff, on: personOn },
  totalVisitCount: { off: timeOff, on: timeOn },
  myCommunityStats: { off: heartOff, on: heartOn },
  myProfileStats: { off: searchOff, on: searchOn },
  myCrewStats: { off: studyOff, on: studyOn },
  myWordChainGameStats: { off: gameOff, on: gameOn },
};
