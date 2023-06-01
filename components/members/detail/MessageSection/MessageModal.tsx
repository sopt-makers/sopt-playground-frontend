import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import ProfileIcon from 'public/icons/icon-profile.svg';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { usePostCoffeeChatMutation } from '@/api/endpoint_LEGACY/hooks';
import RHFControllerFormItem from '@/components/common/form/RHFControllerFormItem';
import Input from '@/components/common/Input';
import Loading from '@/components/common/Loading';
import Modal, { ModalProps } from '@/components/common/Modal';
import { Alert } from '@/components/common/Modal/Alert';
import Text from '@/components/common/Text';
import TextArea from '@/components/common/TextArea';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export enum MessageCategory {
  COFFEE_CHAT = '커피챗',
  MENTORING = '멘토링',
  NETWORK = '친목',
  PROJECT_SUGGESTION = '프로젝트 제안',
  APPJAM_TEAM_BUILDING = '앱잼 팀 빌딩',
  ETC = '기타',
}
interface Category {
  icon: string;
  value: MessageCategory;
}
const CATEGORY: Category[] = [
  {
    icon: '/icons/icon-coffeechat.svg',
    value: MessageCategory.COFFEE_CHAT,
  },
  {
    icon: '/icons/icon-mentoring.svg',
    value: MessageCategory.MENTORING,
  },
  {
    icon: '/icons/icon-network.svg',
    value: MessageCategory.NETWORK,
  },

  {
    icon: '/icons/icon-project-suggest.svg',
    value: MessageCategory.PROJECT_SUGGESTION,
  },
  {
    icon: '/icons/icon-appjam-build.svg',
    value: MessageCategory.APPJAM_TEAM_BUILDING,
  },
  {
    icon: '/icons/icon-postnote-etc.svg',
    value: MessageCategory.ETC,
  },
];

const schema = yup.object().shape({
  email: yup.string().email('올바른 이메일 형태를 입력해주세요.').required('이메일을 입력해주세요.'),
  content: yup.string().required('내용을 입력해주세요.'),
});

interface MessageForm {
  email: string;
  content: string;
}

interface MessageModalProps extends ModalProps {
  profileImageUrl: string;
  name: string;
  receiverId: string;
  defaultCategory: MessageCategory;
  onLog?: (options?: { category?: MessageCategory }) => void;
}

const MessageModal: FC<MessageModalProps> = ({
  receiverId,
  profileImageUrl,
  name,
  defaultCategory,
  onLog,
  ...props
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MessageCategory | null>(defaultCategory ?? null);
  const {
    handleSubmit,
    control,
    formState: { isValid: _isValid },
  } = useForm<MessageForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const isValid = _isValid && Boolean(selectedCategory);
  const { mutateAsync, isLoading } = usePostCoffeeChatMutation();

  const onClickCategory = (category: MessageCategory) => {
    setSelectedCategory(category);
  };
  const submit = async ({ content, email }: MessageForm) => {
    const confirm = window.confirm('쪽지를 보내시겠습니까?');
    try {
      if (!selectedCategory) {
        return;
      }
      if (confirm) {
        await mutateAsync({
          senderEmail: email,
          content,
          category: selectedCategory,
          receiverId,
        });
        await Alert({
          title: '쪽지 보내기',
          content: '성공적으로 전송되었어요!',
        });
        onLog?.({ category: selectedCategory });
        props.onClose();
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <StyledModal isOpen {...props}>
      <StyledForm onSubmit={handleSubmit(submit)}>
        {profileImageUrl ? (
          <ProfileImage src={profileImageUrl} style={{ width: '84px', height: '84px', borderRadius: '20px' }} />
        ) : (
          <EmptyProfileImage style={{ width: '84px', height: '84px' }}>
            <ProfileIcon />
          </EmptyProfileImage>
        )}
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
              isSelected={category.value === (selectedCategory as MessageCategory | null)}
            >
              <StyledIcon src={category.icon} alt={category.value} />
              <Text typography='SUIT_15_SB' color={colors.gray40}>
                {category.value}
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
        <StyledButton isDisabled={!isValid}>
          {isLoading ? (
            <Loading />
          ) : (
            <Text typography='SUIT_15_SB' color={isValid ? colors.white : colors.gray80}>
              쪽지 보내기
            </Text>
          )}
        </StyledButton>
      </StyledForm>
    </StyledModal>
  );
};

export default MessageModal;

const StyledModal = styled(Modal)`
  padding-top: 20px;
  max-height: 100vh;
  overflow-y: auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.img`
  border-radius: 36px;
  width: 171px;
  height: 171px;
  object-fit: cover;
  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 20px;
    width: 88px;
    height: 88px;
  }
`;

const EmptyProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 36px;
  background: ${colors.black60};
  width: 171px;
  height: 171px;
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
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.2)};
  border: 1px solid ${({ isSelected }) => (isSelected ? colors.white : colors.black60)};
  border-radius: 20px;
  background-color: ${colors.black60};
  cursor: pointer;
  padding: 6px 16px 6px 10px;
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
  transition: background-color 0.2s;
  margin-top: 36px;
  border-radius: 12px;
  background-color: ${({ isDisabled }) => (isDisabled ? colors.black60 : colors.purple100)};
  cursor: pointer;
  padding: 14px 28px;
`;
