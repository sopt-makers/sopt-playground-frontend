import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { colors } from '@sopt-makers/colors';
import IconPlane from '@/public/icons/icon_plane.svg';
import { Button } from '@sopt-makers/ui';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { usePostMemberMessageMutation } from '@/api/endpoint_LEGACY/hooks';
import RHFControllerFormItem from '@/components/common/form/RHFControllerFormItem';
import Input from '@/components/common/Input';
import Loading from '@/components/common/Loading';
import useAlert from '@/components/common/Modal/useAlert';
import useCustomConfirm from '@/components/common/Modal/useCustomConfirm';
import Text from '@/components/common/Text';
import TextArea from '@/components/common/TextArea';
import Modal, { ModalProps } from '@/components/members/detail/MessageSection/Modal';
import { MB_BIG_MEDIA_QUERY, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { zIndex } from '@/styles/zIndex';

export enum MessageCategory {
  COFFEE_CHAT = '커피챗',
  NETWORK = '친목',
  APPJAM_TEAM_BUILDING = '앱잼 팀 빌딩',
  PROJECT_SUGGESTION = '프로젝트 제안',
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
    icon: '/icons/icon-network.svg',
    value: MessageCategory.NETWORK,
  },
  {
    icon: '/icons/icon-appjam-build.svg',
    value: MessageCategory.APPJAM_TEAM_BUILDING,
  },
  {
    icon: '/icons/icon-project-suggest.svg',
    value: MessageCategory.PROJECT_SUGGESTION,
  },
  {
    icon: '/icons/icon-postnote-etc.svg',
    value: MessageCategory.ETC,
  },
];

const schema = yup.object().shape({
  email: yup.string().email('올바른 이메일 형태를 입력해주세요.').required('이메일을 입력해주세요.'),
  content: yup.string().required('내용을 입력해주세요.').max(500, '500자 이내로 입력해주세요.'),
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
  const { mutateAsync, isPending } = usePostMemberMessageMutation();
  const { alert } = useAlert();
  const { confirm, ConfirmComponent } = useCustomConfirm();
  const onClickCategory = (category: MessageCategory) => {
    setSelectedCategory(category);
  };

  const submit = async ({ content, email }: MessageForm) => {
    if (isPending) {
      return;
    }
    const result = await confirm({
      title: '쪽지를 보내시겠습니까?',
      description: '쪽지는 상대방의 이메일로 전달됩니다.',
      okButtonColor: colors.white,
      okButtonTextColor: colors.black,
      okButtonText: '전송하기',
      cancelButtonText: '돌아가기',
      zIndex: zIndex.헤더 + 102,
      width: 400,
    });
    try {
      if (!selectedCategory) {
        return;
      }
      if (result) {
        await mutateAsync({
          senderEmail: email,
          content,
          category: selectedCategory,
          receiverId,
        });

        onLog?.({ category: selectedCategory });

        await alert({
          title: '쪽지 보내기',
          description: '성공적으로 전송되었어요!',
          zIndex: zIndex.헤더 + 103,
        });
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <StyledModal isOpen {...props}>
      <StyledForm onSubmit={handleSubmit(submit)}>
        <StyledIconPlane>
          <IconPlane />
        </StyledIconPlane>
        <Text mt={24} typography='SUIT_24_B'>
          {name}님에게 쪽지 보내기
        </Text>
        <Text mt={14} typography='SUIT_14_M' color={colors.gray300}>
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
              <Text typography='SUIT_15_SB' color={colors.gray200}>
                {category.value}
              </Text>
            </StyledCategoryItem>
          ))}
        </StyledCategory>
        <TextWrapper>
          <Text typography='SUIT_14_SB'>회신 받을 본인 이메일</Text>
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
          placeholder={
            '멤버에게 궁금한 점을 자세하게 적어주세요. 이야기 나누고 싶은 주제를 쉽게 이해할 수 있도록, 회원님에 대해 간단하게 소개해 주시면 더 좋아요.'
          }
        />
        <StyledButton type='submit' disabled={!isValid || isPending}>
          {isPending ? (
            <Loading color='white' />
          ) : (
            <Text typography='SUIT_15_SB' color={isValid ? colors.gray950 : colors.gray400}>
              쪽지 보내기
            </Text>
          )}
        </StyledButton>
      </StyledForm>
      {ConfirmComponent}
    </StyledModal>
  );
};

export default MessageModal;

const StyledModal = styled(Modal)`
  background: ${colors.gray900};
  padding-top: 40px;
  max-height: 792px;
  overflow-y: auto;

  @supports (height: 100dvh) {
    max-height: 100dvh;
  }

  @media ${MB_BIG_MEDIA_QUERY} {
    width: 100vw;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledIconPlane = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: ${colors.blue50};
  width: 84px;
  height: 84px;
`;

const StyledCategory = styled.section`
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const StyledCategoryItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  transition: border all 0.2s;
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.2)};
  border: 1px solid ${({ isSelected }) => (isSelected ? colors.white : colors.gray700)};
  border-radius: 20px;
  background-color: ${colors.gray700};
  cursor: pointer;
  padding: 6px 16px 6px 10px;
`;

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  padding-top: 40px;
  width: 100%;
`;

const StyledInput = styled(Input)`
  margin-top: 8px;

  & > input {
    border: none;
    border-radius: 10px;
    background-color: ${colors.gray800};
    padding: 15px 16px;

    &::placeholder {
      color: ${colors.gray400};
    }
  }
`;

const StyledTextArea = styled(TextArea)`
  margin-top: 14px;
  border: none;
  border-radius: 10px;
  background-color: ${colors.gray800};
  padding: 15px 16px;
  height: 172px;
  line-height: 26px;
`;

const StyledButton = styled(Button)`
  margin-top: 40px;
`;
