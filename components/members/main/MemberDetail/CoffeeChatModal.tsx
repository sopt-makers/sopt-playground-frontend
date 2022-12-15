import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import RHFControllerFormItem from '@/components/common/form/RHFControllerFormItem';
import Input from '@/components/common/Input';
import Modal, { ModalProps } from '@/components/common/Modal';
import Text from '@/components/common/Text';
import TextArea from '@/components/common/TextArea';
import { colors } from '@/styles/colors';

type CategoryValue = 'coffeechat' | 'mentoring' | 'network' | 'project' | 'teambuilding' | 'etc';
interface Category {
  icon: string;
  label: string;
  value: CategoryValue;
}
const CATEGORY: Category[] = [
  {
    icon: '/icons/icon-coffeechat.svg',
    label: '커피챗',
    value: 'coffeechat',
  },
  {
    icon: '/icons/icon-mentoring.svg',
    label: '멘토링',
    value: 'mentoring',
  },
  {
    icon: '/icons/icon-network.svg',
    label: '친목',
    value: 'network',
  },

  {
    icon: '/icons/icon-project-suggest.svg',
    label: '프로젝트 제안',
    value: 'project',
  },
  {
    icon: '/icons/icon-appjam-build.svg',
    label: '앱잼 팀 빌딩',
    value: 'teambuilding',
  },
  {
    icon: '/icons/icon-postnote-etc.svg',
    label: '기타',
    value: 'etc',
  },
];

const schema = yup.object().shape({
  email: yup.string().email('올바른 이메일 형태를 입력해주세요.').required('이메일을 입력해주세요.'),
  content: yup.string().required('내용을 입력해주세요.'),
});

interface CoffeeChatForm {
  email: string;
  content: string;
}

interface CoffeeChatModalProps extends ModalProps {
  profile: ReactNode;
  name: string;
}

const CoffeeChatModal: FC<CoffeeChatModalProps> = ({ profile, name, ...props }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryValue | null>(null);
  const {
    handleSubmit,
    control,
    formState: { isValid: _isValid },
  } = useForm<CoffeeChatForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const isValid = _isValid && Boolean(selectedCategory);

  const onClickCategory = (category: CategoryValue) => {
    setSelectedCategory(category);
  };
  const onSubmit = () => {
    // TODO: mutation
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledModal isOpen {...props}>
        {profile}
        <Text mt={30} typography='SUIT_26_B'>
          {name}님에게 쪽지 보내기
        </Text>
        <Text mt={14} typography='SUIT_14_M' color={colors.gray60}>
          쪽지는 상대방의 이메일로 전달됩니다:)
        </Text>
        <StyledCategory>
          {CATEGORY.map((category, index) => (
            <StyledCategoryItem
              key={index}
              onClick={() => onClickCategory(category.value)}
              isSelected={category.value === (selectedCategory as CategoryValue | null)}
            >
              <StyledIcon src={category.icon} alt={category.label} />
              <Text typography='SUIT_15_SB' color={colors.gray40}>
                {category.label}
              </Text>
            </StyledCategoryItem>
          ))}
        </StyledCategory>
        <TextWrapper>
          <Text mt={46} color={colors.gray40} typography='SUIT_14_M'>
            회신 받을 본인 이메일
          </Text>
        </TextWrapper>
        <RHFControllerFormItem
          style={{ width: '100%' }}
          control={control}
          name='email'
          component={StyledInput}
          placeholder='이메일을 입력해주세요!'
        />
        <RHFControllerFormItem
          style={{ width: '100%' }}
          control={control}
          name='content'
          component={StyledTextArea}
          placeholder='전달할 내용을 입력해주세요!'
        />
        <StyledButton type='submit' isDisabled={isValid}>
          <Text typography='SUIT_15_SB' color={isValid ? colors.white : colors.gray80}>
            쪽지 보내기
          </Text>
        </StyledButton>
      </StyledModal>
    </form>
  );
};

export default CoffeeChatModal;

const StyledModal = styled(Modal)`
  padding-top: 20px;
`;

const StyledCategory = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  column-gap: 12px;
  margin-top: 46px;
  row-gap: 10px;
`;

const StyledCategoryItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  transition: border all 0.2s;
  border-radius: 20px;
  background-color: ${colors.black60};
  cursor: pointer;
  padding: 6px 16px 6px 10px;

  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 1.5px solid #606265;
    `}
`;

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const StyledInput = styled(Input)`
  margin-top: 12px;
`;

const StyledTextArea = styled(TextArea)`
  margin-top: 14px;
  height: 172px;
`;

const StyledButton = styled.button<{ isDisabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  margin-top: 36px;
  border-radius: 12px;
  cursor: pointer;
  padding: 14px 28px;

  ${({ isDisabled }) =>
    isDisabled
      ? css`
          background-color: ${colors.purple100};
        `
      : css`
          background-color: ${colors.black60};
        `}
`;
