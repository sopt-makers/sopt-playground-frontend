import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { colors } from '@sopt-makers/colors';
import { IconAlertCircle } from '@sopt-makers/icons';
import { TextArea } from '@sopt-makers/ui';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import RHFControllerFormItem from '@/components/common/form/RHFControllerFormItem';
import Loading from '@/components/common/Loading';
import Modal from '@/components/common/Modal';
import Text from '@/components/common/Text';
import { ModalProps } from '@/components/members/detail/MessageSection/Modal';
import { TAG, TimecapsopTag } from '@/components/resolution/constants';
import { useConfirmResolution } from '@/components/resolution/submit/useConfirmResolution';
import { MOBILE_MAX_WIDTH, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { zIndex } from '@/styles/zIndex';

const schema = yup.object().shape({
  tags: yup
    .array()
    .of(yup.boolean())
    .test('tags', '목표를 선택해 주세요', (value) => value?.some((v) => v === true) ?? false),
  content: yup.string().required('내용을 입력해 주세요').max(300, '300자 이내로 입력해 주세요'),
});

interface TimecapsopForm {
  tags: TimecapsopTag[];
  content: string;
}

interface TimecapsopSubmitModalProps extends ModalProps {
  userName: string;
}

const TimecapsopSubmitModal: FC<TimecapsopSubmitModalProps> = ({ userName, ...props }) => {
  const { handleConfirmResolution, isPending } = useConfirmResolution();
  const [selectedTag, setSelectedTag] = useState<TimecapsopTag[]>([]);
  const { handleSubmit, control, formState } = useForm<TimecapsopForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const isValid = formState.isValid;

  const onClickTag = (tag: TimecapsopTag) => {
    if (selectedTag.includes(tag)) {
      setSelectedTag(selectedTag.filter((t) => t !== tag));
    } else {
      setSelectedTag([...selectedTag, tag]);
    }
  };

  const submit = async ({ content }: TimecapsopForm) => {
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
        <ModalBody>
          <TitleTextWrapper>
            <Description typography='SUIT_14_M' color={colors.gray200}>
              SOPT 36기를 시작하는 나를 응원하며
            </Description>
            <Text typography='SUIT_20_SB'>타임캡솝을 만들어볼까요?</Text>
          </TitleTextWrapper>

          <TagsWrapper>
            <TagTextWrapper>
              <Text typography='SUIT_14_M' color={colors.gray30}>
                나만의 목표를 담아보세요
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
                    backgroundImage={tag.image}
                  >
                    <StyledTagText
                      typography='SUIT_14_SB'
                      color={selectedTag.includes(tag.value) ? colors.white : colors.gray300}
                    >
                      {tag.value}
                    </StyledTagText>
                  </StyledTagItem>
                </div>
              ))}
            </StyledTags>
          </TagsWrapper>

          {formState.errors?.tags && (
            <TagErrorWrapper>
              <StyledIconAlertCircle color={colors.error} />
              <TagErrorMessage typography='SUIT_12_SB'>{formState.errors?.tags.message}</TagErrorMessage>
            </TagErrorWrapper>
          )}
          <TextAreaWrapper>
            <ReceiverText typography='SUIT_16_SB' color={colors.gray50}>
              {`To. 7월의 ${userName}`}
            </ReceiverText>
            <Controller
              name='content'
              control={control}
              render={({ field, fieldState }) => (
                <StyledTextArea
                  {...field}
                  fixedHeight={156}
                  maxLength={300}
                  placeholder={
                    '(예시) 드디어 솝트 36기 시작! 이걸 보고 있다면 36기 종무식을 하고 있겠지?\n세미나 과제랑 스터디 진짜진짜 열심히 해서 많이 배우고, 앱잼 팀원과 좋은 프로덕트 꼭 만들어보자. 팟팅!'
                  }
                  errorMessage={fieldState.error?.message}
                  isError={!!fieldState.error}
                  value={field.value ?? ''}
                />
              )}
            />
            <SenderText typography='SUIT_16_SB' color={colors.gray50}>
              {`From. 3월의 ${userName}`}
            </SenderText>
          </TextAreaWrapper>
        </ModalBody>
        <StyledButton isDisabled={!isValid} isError={!formState.errors.content}>
          {isPending ? (
            <Loading color='white' />
          ) : (
            <Text
              typography={window.innerWidth <= MOBILE_MAX_WIDTH ? 'SUIT_16_SB' : 'SUIT_18_SB'}
              color={isValid ? colors.black : colors.gray500}
            >
              타임캡솝 보관하기
            </Text>
          )}
        </StyledButton>
      </StyledForm>
    </StyledModal>
  );
};

export default TimecapsopSubmitModal;

const StyledModal = styled(Modal)`
  background-color: ${colors.gray900};
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
  gap: 28px;
  align-items: center;
  padding: 18px;
  width: 430px;
  min-width: 320px;
  overflow-y: scroll;

  @media ${MOBILE_MEDIA_QUERY} {
    @supports (height: 100dvw) {
      max-width: 100dvw;
    }

    gap: 24px;
  }
`;

const StyledTags = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  width: 294px;
`;

const StyledTagText = styled(Text)`
  position: absolute;
  top: 58px;
`;

const StyledTagItem = styled.label<{ isSelected: boolean; backgroundImage: string }>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border-radius: 50%;
  background-image: ${({ isSelected, backgroundImage }) =>
    `url(${isSelected ? backgroundImage.replace('default', 'select') : backgroundImage}) `};
  cursor: pointer;
  width: 90px;
  height: 90px;

  &:hover {
    ${({ isSelected, backgroundImage }) =>
      !isSelected && `background-image: url(${backgroundImage.replace('default', 'hover')});`}
  }
`;

const StyledTextArea = styled(TextArea)`
  width: 100%;

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
  border-radius: 12px;
  background: ${({ isDisabled }) => (isDisabled ? colors.gray800 : 'linear-gradient(90deg, #d5d6e3 0%, #939aab 100%)')};
  cursor: pointer;
  padding: 12px 20px;
  width: 100%;
  height: 56px;

  &:hover {
    background-color: ${colors.gray50};
    color: ${colors.black};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    height: 44px;
  }
`;

const TagTextWrapper = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
  height: 22px;
`;

const TagErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: -24px;
  width: 100%;
  height: 16px;

  & > svg {
    margin-right: 6px;
  }
`;

const TagErrorMessage = styled(Text)`
  color: ${colors.error};
`;

const StyledIconAlertCircle = styled(IconAlertCircle)`
  width: 14px;
  height: 14px;
`;

const TitleTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  width: 100%;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  margin-top: 56px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 20px;
    margin-top: 52px;
  }
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  width: 100%;
`;

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const SenderText = styled(Text)`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  line-height: 24px;
`;

const ReceiverText = styled(Text)`
  line-height: 24px;
`;
