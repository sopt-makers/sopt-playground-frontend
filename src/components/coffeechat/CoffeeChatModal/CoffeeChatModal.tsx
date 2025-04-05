import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { useToast } from '@sopt-makers/ui';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { useGetMemberProfileById, usePostMemberMessageMutation } from '@/api/endpoint_LEGACY/hooks';
import { PHONE_REGEX_SHORT } from '@/components/auth/register/verify/regex';
import Modal from '@/components/coffeechat/CoffeeChatModal/CoffeeChatCustomPortalModal';
import RHFControllerFormItem from '@/components/common/form/RHFControllerFormItem';
import Input from '@/components/common/Input';
import Loading from '@/components/common/Loading';
import useCustomConfirm from '@/components/common/Modal/useCustomConfirm';
import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import TextArea from '@/components/common/TextArea';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { MB_BIG_MEDIA_QUERY } from '@/styles/mediaQuery';
import { zIndex } from '@/styles/zIndex';
const schema = yup.object().shape({
  phone: yup.string().nullable().required('연락처를 입력해주세요.').matches(PHONE_REGEX_SHORT, "'-'없이 입력해주세요"),
  content: yup.string().required('내용을 입력해주세요.').max(500, '500자 이내로 입력해주세요.'),
});

const COFFEECHAT_PLACEHOLDER = `ex. 안녕하세요! PM으로 커리어 전환을 고민 중인 김솝트라고 합니다. 
\n
게임 업계 PM의 필수 역량이 무엇인지 궁금해 커피챗 제안드립니다.`;

interface MessageForm {
  phone: string;
  content: string;
}

interface MessageModalProps {
  phone?: string;
  receiverId: string;
  onClose: () => void;
}

const MessageModal: FC<MessageModalProps> = ({ receiverId, phone, ...props }) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid: _isValid },
  } = useForm<MessageForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const contentValue = watch('content');
  const isValid = _isValid;
  const { mutateAsync, isPending } = usePostMemberMessageMutation();
  const { confirm, ConfirmComponent } = useCustomConfirm();
  const { open } = useToast();
  const { data: me } = useGetMemberOfMe();
  const { data: profile } = useGetMemberProfileById(me?.id ?? undefined);
  const { logSubmitEvent } = useEventLogger();
  const senderId = me?.id.toString();

  const submit = async ({ content, phone }: MessageForm) => {
    if (isPending) {
      return;
    }
    const result = await confirm({
      title: '커피챗 제안을 보내시겠습니까?',
      description: '작성하신 내용은 상대방에게 문자로 전달돼요. 한번 보낸 커피챗 제안은 취소할 수 없어요.',
      okButtonColor: colors.white,
      okButtonTextColor: colors.black,
      okButtonText: '보내기',
      cancelButtonText: '취소',
      zIndex: zIndex.헤더 + 102,
      width: 400,
    });
    try {
      if (result) {
        await mutateAsync({
          senderPhone: phone,
          content,
          receiverId,
          category: '커피챗',
        });
        logSubmitEvent('sendCoffeechat', { content: content, receiverId, senderId });
        open({
          icon: 'success',
          content: '커피챗 제안이 잘 전달되었어요!',
          style: {
            content: {
              whiteSpace: 'pre-wrap',
            },
          },
        });
        props.onClose();
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <StyledModal isOpen {...props}>
      {profile && (
        <StyledForm onSubmit={handleSubmit(submit)}>
          <ProfileImage src='/icons/icon_coffeechat.svg' />
          <Text mt={30} typography='SUIT_24_B'>
            커피챗 제안하기
          </Text>
          <Text
            style={{ textAlign: 'center', lineHeight: '22px' }}
            mt={14}
            typography='SUIT_14_M'
            color={colors.gray300}
          >
            <Responsive only='desktop'>작성하신 내용은 회원님의 프로필과 함께 문자로 전달돼요</Responsive>
            <Responsive only='mobile'>
              작성하신 내용은
              <br /> 회원님의 프로필과 함께 문자로 전달돼요
            </Responsive>
          </Text>
          <LoggingClick eventKey='senderPhone'>
            <>
              <TextWrapper>
                <StyledText mt={48} color={colors.white}>
                  회신 받을 본인 연락처 <span style={{ color: '#F77234' }}>*</span>
                </StyledText>
              </TextWrapper>
              <RHFControllerFormItem
                style={{ width: '100%' }}
                control={control}
                name='phone'
                defaultValue={profile?.phone ? profile?.phone : phone}
                component={StyledInput}
                placeholder='연락처를 입력해주세요!'
              />
            </>
          </LoggingClick>
          <TextWrapper>
            <StyledText mt={46} color={colors.white}>
              무엇이 궁금하신가요? <span style={{ color: '#F77234' }}>*</span>
            </StyledText>
          </TextWrapper>
          <InputWrapper>
            <RHFControllerFormItem
              style={{ width: '100%', height: '100%' }}
              control={control}
              name='content'
              component={StyledTextArea}
              placeholder={COFFEECHAT_PLACEHOLDER}
              maxCount={500}
            />
            {/* 향후 any 수정 */}
          </InputWrapper>
          <TextCountWrapper>{contentValue ? contentValue.length : 0}/500</TextCountWrapper>

          <StyledButton isDisabled={!isValid || isPending}>
            {isPending ? (
              <Loading color='white' />
            ) : (
              <Text typography='SUIT_15_SB' color={isValid ? colors.gray950 : colors.gray400}>
                커피챗 제안 보내기
              </Text>
            )}
          </StyledButton>
        </StyledForm>
      )}
      {ConfirmComponent}
    </StyledModal>
  );
};

export default MessageModal;

const StyledModal = styled(Modal)`
  margin-top: 143px;
  margin-bottom: 143px;
  background-color: ${colors.gray900};
  padding: 32px 32px 48px;
  width: 588px;
  max-height: 100vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  textarea {
    background-color: ${colors.gray800};

    &::placeholder {
      color: ${colors.gray300};
    }

    &:focus {
      background-color: ${colors.gray800};
    }
  }

  input {
    background-color: ${colors.gray800};

    &::placeholder {
      color: ${colors.gray300};
    }
  }
  @supports (height: 100dvh) {
    max-height: 100dvh;
  }
  @media ${MB_BIG_MEDIA_QUERY} {
    top: 60px;
    padding-top: 16px;
    width: 100vw;
    height: auto;
    min-height: 100dvh;
    overflow-y: scroll;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ProfileImage = styled.img`
  margin-top: 40px;
  border-radius: 20px;
  width: 84px;
  height: 84px;
  object-fit: cover;
  @media ${MB_BIG_MEDIA_QUERY} {
    border-radius: 20px;
    width: 88px;
    height: 88px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const StyledInput = styled(Input)`
  margin-top: 12px;
  border-radius: 6px;
  background-color: ${colors.gray700};

  &::placeholder {
    color: ${colors.gray600};
  }

  &:focus {
    background-color: ${colors.gray700};
  }
`;

const StyledTextArea = styled(TextArea)`
  margin-top: 14px;
  height: 172px;

  &:focus {
    background-color: ${colors.gray700};
  }
`;

const StyledButton = styled.button<{ isDisabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  margin-top: 36px;
  border-radius: 12px;
  background-color: ${({ isDisabled }) => (isDisabled ? colors.gray700 : colors.white)};
  cursor: pointer;
  padding: 14px 28px;

  &:hover {
    background-color: ${colors.gray50};
  }

  &:active {
    background-color: ${colors.gray100};
  }

  @media ${MB_BIG_MEDIA_QUERY} {
    margin-bottom: 40px;
  }
`;
const InputWrapper = styled.div`
  width: 100%;
  height: 184px;

  textarea {
    min-height: 184px;
  }
  @media ${MB_BIG_MEDIA_QUERY} {
    height: 150px;

    textarea {
      min-height: 150px;
    }
  }
`;
const StyledText = styled(Text)`
  ${fonts.LABEL_14_SB};
`;
const TextCountWrapper = styled.div`
  margin-top: 24px;
  width: 100%;
  text-align: right;
  color: ${colors.gray300};

  ${fonts.LABEL_12_SB};
`;
