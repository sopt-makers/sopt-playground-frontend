import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
// 서버 변경 후 반영 필요
export enum ResolutionTag {
  SKILL_ENHANCEMENT = '능력 향상',
  IT_KNOWLEDGE = 'IT 지식',
  FRIENDSHIP = '친목',
  ENTREPRENEURSHIP_FOUNDATION = '창업 기반',
  COLLABORATION_EXPERIENCE = '협업 경험',
  GREAT_TEAM = '좋은 팀',
}

interface Tag {
  icon: string;
  value: ResolutionTag;
}
// 서버 변경 후 반영 필요
const TAG: Tag[] = [
  {
    icon: '🏃',
    value: ResolutionTag.SKILL_ENHANCEMENT,
  },
  {
    icon: '👨‍💻',
    value: ResolutionTag.IT_KNOWLEDGE,
  },
  {
    icon: '🍻',
    value: ResolutionTag.FRIENDSHIP,
  },
  {
    icon: '🚀',
    value: ResolutionTag.ENTREPRENEURSHIP_FOUNDATION,
  },
  {
    icon: '🤝',
    value: ResolutionTag.COLLABORATION_EXPERIENCE,
  },
  {
    icon: '👍',
    value: ResolutionTag.GREAT_TEAM,
  },
];

const schema = yup.object().shape({
  tags: yup.array().of(yup.string()).required('목표를 선택해주세요.'),
  content: yup.string().required('내용을 입력해주세요.').max(300, '300자 이내로 입력해주세요.'),
});

const RESOlUTION_PLACEHOLDER = `솝트에서 이루고 싶은 것, 현재의 다짐 등 34기 활동을 시작하는 스스로에게 하고 싶은 말을 자유롭게 적어주세요!`;

interface ResolutionForm {
  tags: ResolutionTag[];
  content: string;
}

interface ResolutionModalProps {
  profileImageUrl: string;
}

const ResolutionModal: FC<ResolutionModalProps> = ({ profileImageUrl }) => {
  const [selectedTag, setSelectedTag] = useState<ResolutionTag[]>([]);
  const {
    handleSubmit,
    control,
    formState: { isValid: _isValid },
  } = useForm<ResolutionForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const isValid = _isValid && selectedTag.length > 0;
};
