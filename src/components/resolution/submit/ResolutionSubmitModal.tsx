import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { colors } from '@sopt-makers/colors';
import { IconAlertCircle } from '@sopt-makers/icons';
import ProfileIcon from 'public/icons/icon-profile.svg';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import RHFControllerFormItem from '@/components/common/form/RHFControllerFormItem';
import Loading from '@/components/common/Loading';
import Modal from '@/components/common/Modal';
import Text from '@/components/common/Text';
import TextArea from '@/components/common/TextArea';
import { ModalProps } from '@/components/members/detail/MessageSection/Modal';
import { ResolutionTag, TAG } from '@/components/resolution/constants';
import { useConfirmResolution } from '@/components/resolution/submit/useConfirmResolution';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { zIndex } from '@/styles/zIndex';

const schema = yup.object().shape({
  tags: yup
    .array()
    .of(yup.boolean())
    .test('tags', '목표를 선택해 주세요', (value) => value?.some((v) => v === true) ?? false),
  content: yup.string().required('내용을 입력해주세요').max(300, '300자 이내로 입력해주세요.'),
});

interface ResolutionForm {
  tags: ResolutionTag[];
  content: string;
}

interface ResolutionSubmitModalProps extends ModalProps {
  profileImageUrl: string;
}

const ResolutionSubmitModal: FC<ResolutionSubmitModalProps> = ({ profileImageUrl, ...props }) => {
  const { handleConfirmResolution, isPending } = useConfirmResolution();
  const [selectedTag, setSelectedTag] = useState<ResolutionTag[]>([]);
  const { handleSubmit, control, formState } = useForm<ResolutionForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const isValid = formState.isValid;

  const onClickTag = (tag: ResolutionTag) => {
    if (selectedTag.includes(tag)) {
      setSelectedTag(selectedTag.filter((t) => t !== tag));
    } else {
      setSelectedTag([...selectedTag, tag]);
    }
  };

  const submit = async ({ content }: ResolutionForm) => {
    try {
      if (!isValid) return;
      handleConfirmResolution({
        content,
        tags: selectedTag,
        onSuccess: () => {
          props.onClose();
        },
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <StyledModal isOpen {...props} zIndex={zIndex.헤더 + 100} onOpenAutoFocus={(e) => e.preventDefault()}>
      <StyledForm onSubmit={handleSubmit(submit)}>
        {profileImageUrl ? (
          <ProfileImage src={profileImageUrl} />
        ) : (
          <EmptyProfileImage>
            <ProfileIcon />
          </EmptyProfileImage>
        )}
        <Text mt={30} typography='SUIT_24_B'>
          SOPT 35기를 시작하며
        </Text>
        <Description mt={10} typography='SUIT_14_M' color={colors.gray200}>
          {`솝트에 임하는 마음가짐을 적어주세요!\n보내주신 다짐은 종무식 때 다시 볼 수 있어요.`}
        </Description>
        <TagTextWrapper>
          <Text typography='SUIT_14_M' color={colors.gray30}>
            어떤 목표를 이루고 싶나요?
          </Text>
          <Text typography='SUIT_14_M' color={colors.gray400}>
            (다중 선택 가능)
          </Text>
        </TagTextWrapper>
        <StyledTags>
          {TAG.map((tag, index) => (
            <div key={'wrapper' + index}>
              <RHFControllerFormItem
                key={'controller' + index}
                name={`tags.${index}`}
                id={`tags.${index}`}
                component={StyledInput}
                control={control}
                type='checkbox'
                style={{ display: 'none' }}
              />
              <StyledTagItem
                key={'tagItem' + index}
                htmlFor={`tags.${index}`}
                onClick={() => onClickTag(tag.value)}
                isSelected={selectedTag.includes(tag.value)}
              >
                <Text typography='SUIT_14_SB' color={selectedTag.includes(tag.value) ? colors.white : colors.gray200}>
                  {tag.icon} {tag.value}
                </Text>
              </StyledTagItem>
            </div>
          ))}
        </StyledTags>
        <TagErrorWrapper>
          {formState.errors?.tags && (
            <>
              <StyledIconAlertCircle color={colors.error} />
              <TagErrorMessage>{formState.errors?.tags.message}</TagErrorMessage>
            </>
          )}
        </TagErrorWrapper>
        <RHFControllerFormItem
          maxCount={300}
          control={control}
          name='content'
          component={StyledTextArea}
          count={true}
          placeholder={
            '(예시) 드디어 솝트 35기 시작! 이걸 보고 있다면 35기 종무식을 하고 있겠지?\n세미나 과제랑 스터디 진짜진짜 열심히 해서 많이 배우고, 앱잼 팀원과 좋은 프로덕트 꼭 만들어보자. 팟팅!'
          }
        />
        <StyledButton isDisabled={!isValid} isError={!formState.errors.content}>
          {isPending ? (
            <Loading color='white' />
          ) : (
            <Text typography='SUIT_14_SB' color={isValid ? colors.black : colors.gray500}>
              나의 다짐 보내기
            </Text>
          )}
        </StyledButton>
      </StyledForm>
    </StyledModal>
  );
};

export default ResolutionSubmitModal;

const StyledModal = styled(Modal)`
  background-color: ${colors.gray900};
  padding-top: 20px;
  max-height: 100vh;
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 100%;
  }

  @supports (height: 100dvh) {
    max-height: 100dvh;
  }
`;

const Description = styled(Text)`
  text-align: center;
  line-height: 22px;
  white-space: pre-wrap;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  width: 426px;
  overflow-y: scroll;

  @media ${MOBILE_MEDIA_QUERY} {
    @supports (height: 100dvw) {
      max-width: 100dvw;
    }

    padding: 0;
  }
`;

const ProfileImage = styled.img`
  margin-top: 56px;
  border-radius: 20px;
  width: 84px;
  height: 84px;
  object-fit: cover;
  @media ${MOBILE_MEDIA_QUERY} {
    width: 88px;
    height: 88px;
  }
`;

const EmptyProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 56px;
  border-radius: 20px;
  background: ${colors.gray700};
  width: 84px;
  height: 84px;

  & > svg {
    width: 32px;
  }
`;

const StyledTags = styled.section`
  display: flex;
  flex-wrap: wrap;
  row-gap: 12px;
  column-gap: 10px;
  justify-content: center;
  justify-items: center;
  margin-top: 12px;
  line-height: 22px;
`;

const StyledTagItem = styled.label<{ isSelected: boolean }>`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  transition: border all 0.2s;
  border: 1px solid ${({ isSelected }) => (isSelected ? colors.white : colors.gray900)};
  border-radius: 20px;
  background-color: ${colors.gray800};
  cursor: pointer;
  padding: 6px 16px 6px 10px;
  width: max-content;
`;

const StyledTextArea = styled(TextArea)`
  border: 1px solid ${colors.gray800};
  background-color: ${colors.gray800};
  padding: 11px 16px;
  width: 386px;
  height: 176px;
  line-height: 26px;

  @media ${MOBILE_MEDIA_QUERY} {
    @supports (height: 100dvw) {
      max-width: calc(100vw - 40px);
    }
  }
`;

const StyledInput = styled.input``;

const StyledButton = styled.button<{ isDisabled: boolean; isError: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  margin-top: ${({ isError }) => (isError ? '40px' : '14px')};
  margin-bottom: 44px;
  border-radius: 12px;
  background: ${({ isDisabled }) =>
    isDisabled ? colors.gray800 : ' linear-gradient(90deg, #8FC0FF 0%, #5BA3FF 100%)'};
  cursor: pointer;
  padding: 12px 20px;
`;

const TagTextWrapper = styled.div`
  display: flex;
  gap: 3px;
  margin-top: 36px;
`;

const TagErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;

  & > svg {
    margin-right: 6px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding-left: 20px;
  }
`;

const TagErrorMessage = styled(Text)`
  color: ${colors.error};
  ${textStyles.SUIT_12_M}
`;

const StyledIconAlertCircle = styled(IconAlertCircle)`
  width: 14px;
  height: 14px;
`;
