import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { colors } from '@sopt-makers/colors';
import IconPlane from '@/public/icons/icon_plane.svg';
import { Button, DialogContext, TextArea, TextField } from '@sopt-makers/ui';
import { ComponentType, FC, SVGProps, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useGetMemberProfileOfMe, usePostMemberMessageMutation } from '@/api/endpoint_LEGACY/hooks';
import RHFControllerFormItem from '@/components/common/form/RHFControllerFormItem';
import Loading from '@/components/common/Loading';
import useCustomConfirm from '@/components/common/Modal/useCustomConfirm';
import Text from '@/components/common/Text';
import Modal, { ModalProps } from '@/components/members/detail/MessageSection/Modal';
import { MB_BIG_MEDIA_QUERY } from '@/styles/mediaQuery';
import { zIndex } from '@/styles/zIndex';
import IconNetwork from '@/public/icons/icon-network.svg';
import IconAppjam from '@/public/icons/icon-appjam-build.svg';
import IconProject from '@/public/icons/icon-project-suggest.svg';
import IconEtc from '@/public/icons/icon-postnote-etc.svg';
import { Spacing } from '@toss/emotion-utils';

export enum MessageCategory {
  NETWORK = '친목',
  APPJAM_TEAM_BUILDING = '앱잼 팀 빌딩',
  PROJECT_SUGGESTION = '프로젝트 제안',
  ETC = '기타',
}
interface Category {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  value: MessageCategory;
}
const CATEGORY: Category[] = [
  {
    icon: IconNetwork,
    value: MessageCategory.NETWORK,
  },
  {
    icon: IconAppjam,
    value: MessageCategory.APPJAM_TEAM_BUILDING,
  },
  {
    icon: IconProject,
    value: MessageCategory.PROJECT_SUGGESTION,
  },
  {
    icon: IconEtc,
    value: MessageCategory.ETC,
  },
];

const schema = yup.object().shape({
  phone: yup
    .string()
    .required('전화번호를 입력해주세요.')
    .matches(/^\d+$/, "'-' 없이 입력해주세요.")
    .matches(/^010\d{8}$/, '전화번호를 입력해주세요.'),
  content: yup.string().required('내용을 입력해주세요.').max(500, '500자 이내로 입력해주세요.'),
});

interface MessageForm {
  phone: string;
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
  const { openDialog, closeDialog } = useContext(DialogContext);
  const { confirm, ConfirmComponent } = useCustomConfirm();
  const onClickCategory = (category: MessageCategory) => {
    setSelectedCategory(category);
  };

  const submit = async ({ content, phone }: MessageForm) => {
    if (isPending) {
      return;
    }
    const result = await confirm({
      title: '쪽지를 보내시겠습니까?',
      description: '작성하신 내용은 상대방에게 문자로 전달돼요.\n한번 보낸 쪽지는 취소할 수 없어요.',
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
          senderPhone: phone,
          content,
          category: selectedCategory,
          receiverId,
        });

        onLog?.({ category: selectedCategory });

        openDialog({
          title: '쪽지 전송이 완료됐어요.',
          description: (
            <>
              쪽지는 {name}님의 문자로 안전히 전달되었어요.
              <br />
              좋은 대화로 이어지길 기대할게요.
            </>
          ),
          type: 'single',
          typeOptions: {
            approveButtonText: '완료',
            buttonFunction: closeDialog,
          },
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const { data: me } = useGetMemberProfileOfMe();

  if (!me) return null;

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
          작성하신 내용은 회원님의 프로필과 함께 문자로 전달돼요
        </Text>
        <StyledCategory>
          {CATEGORY.map((category, index) => (
            <StyledCategoryItem
              key={index}
              onClick={() => onClickCategory(category.value)}
              isSelected={category.value === (selectedCategory as MessageCategory | null)}
            >
              <category.icon />
              <Text typography='SUIT_15_SB'>{category.value}</Text>
            </StyledCategoryItem>
          ))}
        </StyledCategory>
        <TextWrapper>
          <Text typography='SUIT_14_SB'>
            회신 받을 나의 연락처 <StyledRequired>*</StyledRequired>
          </Text>
        </TextWrapper>
        <RHFControllerFormItem
          style={{ width: '100%' }}
          control={control}
          name='phone'
          component={StyledInput}
          defaultValue={me?.phone}
          placeholder='전화번호를 입력해주세요!'
        />
        <StyledSpacing />
        <TextWrapper>
          <Text typography='SUIT_14_SB'>
            무엇이 궁금하신가요? <StyledRequired>*</StyledRequired>
          </Text>
        </TextWrapper>
        <RHFControllerFormItem
          style={{ width: '100%' }}
          control={control}
          name='content'
          component={StyledTextArea}
          placeholder={`쪽지에 ${name}님에게 어떤 점이 궁금한지 자세하게 적어주세요. ${name}님의 스킬과 소개와 관련된 내용으로 작성하면 회신 확률을 높일 수 있어요.`}
          maxLength={500}
          fixedHeight={184}
          defaultValue=''
          disableEnterSubmit
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
  border-radius: 15.75px;
  background: ${colors.blue50};
  width: 54px;
  height: 54px;

  & > svg {
    width: 30.857px;
  }

  @media ${MB_BIG_MEDIA_QUERY} {
    border-radius: 14px;
    width: 44px;
    height: 44px;

    & > svg {
      width: 27.429px;
    }
  }
`;

const StyledCategory = styled.section`
  display: flex;
  flex-wrap: wrap;
  row-gap: 12px;
  column-gap: 12px;
  align-items: center;
  justify-content: center;
  margin: 32px 0 44px;
  width: 225px;

  @media ${MB_BIG_MEDIA_QUERY} {
    margin: 24px 0 32px;
  }
`;

const StyledCategoryItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  transition: border all 0.2s;
  border: 1px solid ${({ isSelected }) => (isSelected ? colors.gray10 : 'transparent')};
  border-radius: 20px;
  background-color: ${colors.gray800};
  cursor: pointer;
  padding: 6px 16px 6px 10px;

  & span {
    color: ${({ isSelected }) => (isSelected ? colors.gray10 : colors.gray400)};
  }
`;

const StyledSpacing = styled.div`
  margin-top: 32px;
  width: 100%;

  @media ${MB_BIG_MEDIA_QUERY} {
    margin-top: 24px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const StyledRequired = styled.span`
  color: ${colors.secondary};
`;

const StyledInput = styled(TextField)`
  margin-top: 8px;
`;

const StyledTextArea = styled(TextArea)`
  margin-top: 14px;
  border: none;
`;

const TextLength = styled.span`
  margin-top: 8px;
  width: 100%;
  text-align: right;
  color: ${colors.gray200};
`;

const StyledButton = styled(Button)`
  margin-top: 40px;
`;
