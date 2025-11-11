import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { colors } from '@sopt-makers/colors';
import { IconAlertCircle } from '@sopt-makers/icons';
import { TextArea } from '@sopt-makers/ui';
import { FC, useState } from 'react';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import RHFControllerFormItem from '@/components/common/form/RHFControllerFormItem';
import Loading from '@/components/common/Loading';
import Text from '@/components/common/Text';
import { ModalProps } from '@/components/members/detail/MessageSection/Modal';
import { TAG, TimecapsopTag } from '@/components/resolution/constants';
import { useConfirmResolution } from '@/components/resolution/submit/useConfirmResolution';
import { pgColors } from '@/styles/colors';
import { MOBILE_MAX_WIDTH, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

const schema = yup.object().shape({
  tags: yup
    .array()
    .of(yup.boolean())
    .test('tags', '목표를 선택해 주세요', (value) => value?.some((v) => v === true) ?? false),
  content: yup.string().required('내용을 입력해 주세요').max(300, '300자 이내로 입력해 주세요'),
});

interface TimecapsopForm {
  tags: (keyof typeof TimecapsopTag)[];
  content: string;
}

interface TimecapsopSubmitModalProps extends ModalProps {
  userName: string;
  onSuccess: () => void;
}

const TimecapsopSubmitModalContent: FC<TimecapsopSubmitModalProps> = ({ userName, ...props }) => {
  const { handleConfirmResolution, isPending } = useConfirmResolution();
  const [selectedTag, setSelectedTag] = useState<(keyof typeof TimecapsopTag)[]>([]);
  const { handleSubmit, control, formState } = useForm<TimecapsopForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const isValid = formState.isValid;

  const onClickTag = (tag: keyof typeof TimecapsopTag) => {
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
          props.onSuccess();
        },
      });
    } catch (error) {
      throw error;
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const isMobileIOS = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|SOPT-iOS/i.test(navigator.userAgent);

    if (!isMobileIOS) return;

    const textarea = textareaRef.current;
    const form = formRef.current;

    const handleFocus = () => {
      form?.style.setProperty('padding-bottom', '280px');

      setTimeout(() => {
        textarea?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 300);
    };

    const handleBlur = () => {
      form?.style.setProperty('padding-bottom', '18px');

      form?.scrollTo({
        top: form.scrollHeight,
      });
    };

    textarea?.addEventListener('focus', handleFocus);
    textarea?.addEventListener('blur', handleBlur);

    return () => {
      textarea?.removeEventListener('focus', handleFocus);
      textarea?.removeEventListener('blur', handleBlur);
    };
  }, []);

  return (
    <StyledForm onSubmit={handleSubmit(submit)} ref={formRef}>
      <ModalBody>
        <TitleTextWrapper>
          <Description typography='SUIT_14_M' color={colors.gray200}>
            SOPT 37기를 시작하는 나를 응원하며
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
                  onClick={() => onClickTag(tag.key)}
                  isSelected={selectedTag.includes(tag.key)}
                  hoverImg={tag.image.hover}
                >
                  <StyledImage
                    src={selectedTag.includes(tag.key) ? tag.image.select : tag.image.default}
                    alt={tag.value}
                    data-hover={tag.image.hover}
                  />
                  <StyledTagText
                    typography='SUIT_14_SB'
                    color={selectedTag.includes(tag.key) ? colors.white : colors.gray300}
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
            {`To. 6개월 후 ${userName}`}
          </ReceiverText>
          <Controller
            name='content'
            control={control}
            render={({ field, fieldState }) => (
              <StyledTextArea
                {...field}
                ref={textareaRef}
                fixedHeight={156}
                maxLength={300}
                placeholder={
                  '(예시) 드디어 솝트 37기 시작! 이걸 보고 있다면 37기 종무식을 하고 있겠지?\n세미나 과제랑 스터디 진짜진짜 열심히 해서 많이 배우고, 앱잼 팀원과 좋은 프로덕트 꼭 만들어보자. 팟팅!'
                }
                errorMessage={fieldState.error?.message}
                isError={!!fieldState.error}
                value={field.value ?? ''}
              />
            )}
          />
          <SenderText typography='SUIT_16_SB' color={colors.gray50}>
            {`From. 새로운 도전을 시작한 ${userName}`}
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
  );
};

export default TimecapsopSubmitModalContent;

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
  touch-action: pan-y;

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

const StyledTagItem = styled.label<{ isSelected: boolean; hoverImg: string }>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  width: 90px;
  height: 90px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      ${({ isSelected, hoverImg }) =>
        !isSelected &&
        `
        background-image: url(${hoverImg});

        & > img {
          opacity: 0;
        }
      `}
    }
  }
`;

const StyledImage = styled.img`
  display: block;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  object-fit: cover;
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
  border-radius: 12px;
  background: ${({ isDisabled }) => (isDisabled ? colors.gray800 : pgColors.mainGradient)};
  cursor: pointer;
  padding: 12px 20px;
  width: 100%;
  height: 56px;

  ${({ isDisabled }) =>
    !isDisabled &&
    `
  &:hover {
    background: ${pgColors.mainHover};
    color: ${colors.black};
  }
    `}

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
  margin-top: -12px;
  width: 100%;
  height: 16px;

  & > svg {
    margin-right: 4px;
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
