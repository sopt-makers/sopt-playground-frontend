import { DefaultValues } from 'react-hook-form';

import { LinkTitle } from '@/api/projects/type';
import { DEFAULT_MEMBER } from '@/components/projects/upload/MemberForm/constants';
import { Category, FormItem } from '@/components/projects/upload/types';
import { ProjectUploadForm } from '@/pages/projects/upload';

export const categoryLabel: Record<Category, string> = {
  [Category.APPJAM]: '앱잼',
  [Category.SOPKATHON]: '솝커톤',
  [Category.SOPTERM]: '솝텀 프로젝트',
  [Category.STUDY]: '스터디',
  [Category.JOINTSEMINAR]: '합동 세미나',
  [Category.ETC]: '기타',
};

export const FORM_ITEMS: FormItem[] = [
  {
    label: '프로젝트 이름',
    value: 'name',
    isDirty: ({ name }) => !!name,
    isRequired: true,
  },
  {
    label: '기수',
    value: 'generation',
    isDirty: ({ generation }, defaultValue) => {
      if (defaultValue?.generation.checked) {
        return true;
      }
      if (generation?.generation) {
        return true;
      }
      return false;
    },
    isRequired: true,
  },
  {
    label: '어디서 진행했나요?',
    value: 'category',
    isDirty: ({ category }) => !!category,
    isRequired: true,
  },
  {
    label: '프로젝트 팀원',
    value: 'members',
    isDirty: (dirtyFields) => {
      if (dirtyFields.members) {
        return (
          dirtyFields.members.filter(
            ({ memberRole, searchedMember, memberDescription }) => memberRole && searchedMember && memberDescription,
          ).length > 0
        );
      }
      return false;
    },
    isRequired: true,
  },
  {
    label: '추가 합류한 팀원',
    value: 'releaseMembers',
    isDirty: (dirtyFields) => {
      if (dirtyFields.releaseMembers) {
        return (
          dirtyFields.releaseMembers.filter(
            ({ memberRole, searchedMember, memberDescription }) => memberRole && searchedMember && memberDescription,
          ).length > 0
        );
      }
      return false;
    },
    isRequired: false,
  },
  {
    label: '서비스 형태',
    value: 'serviceType',
    isDirty: ({ serviceType }) => !!serviceType,
    isRequired: true,
  },
  {
    label: '프로젝트 기간',
    value: 'period',
    isDirty: ({ period }) => {
      if (period?.startAt && period.isOngoing) {
        return true;
      }
      if (period?.startAt && period.endAt) {
        return true;
      }
      return false;
    },
    isRequired: true,
  },
  {
    label: '프로젝트 한줄 소개',
    value: 'summary',
    isDirty: ({ summary }) => !!summary,
    isRequired: true,
  },
  {
    label: '프로젝트 설명',
    value: 'detail',
    isDirty: ({ detail }) => !!detail,
    isRequired: true,
  },
  {
    label: '로고 이미지',
    value: 'logoImage',
    isDirty: ({ logoImage }) => !!logoImage,
    isRequired: true,
  },
  {
    label: '썸네일 이미지',
    value: 'thumbnailImage',
    isDirty: ({ thumbnailImage }) => !!thumbnailImage,
    isRequired: true,
  },
  {
    label: '프로젝트 이미지',
    value: 'projectImage',
    isDirty: ({ projectImage }) => !!projectImage,
    isRequired: false,
  },
  {
    label: '링크',
    value: 'links',
    isDirty: ({ links }) => {
      if (links) {
        return links?.filter(({ linkTitle, linkUrl }) => linkTitle && linkUrl).length > 0;
      }
      return false;
    },
    isRequired: false,
  },
];

export const getLinkInfo = (linkTitle: LinkTitle | string) => {
  switch (linkTitle as LinkTitle) {
    case 'website':
      return { icon: '/icons/icon-web.svg', label: '서비스 바로가기' };
    case 'googlePlay':
      return { icon: '/icons/icon-googleplay.svg', label: 'Google Play' };
    case 'appStore':
      return { icon: '/icons/icon-appstore.svg', label: 'App Store' };
    case 'github':
      return { icon: '/icons/icon-github.svg', label: 'Github' };
    case 'instagram':
      return { icon: '/icons/icon-instagram.svg', label: 'Instagram' };
    case 'media':
      return { icons: '/icons/icon-media.svg', label: 'Media' };
    default:
      return { icons: '/icons/icon-etc.svg', label: '기타' };
  }
};

export const PROJECT_DEFAULT_VALUES: DefaultValues<ProjectUploadForm> = {
  name: '',
  generation: {
    generation: undefined,
    checked: true,
  },
  status: {
    isAvailable: false,
    isFounding: false,
  },
  period: {
    isOngoing: false,
  },
  members: [{ ...DEFAULT_MEMBER }],
  serviceType: [],
  summary: '',
  detail: '',
};
