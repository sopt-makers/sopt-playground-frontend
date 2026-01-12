import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconChevronLeft, IconFlipForward, IconRepeat } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import { ReactNode, useEffect, useRef, useState } from 'react';

import Checkbox from '@/components/common/Checkbox';
import Responsive from '@/components/common/Responsive';
import ContentsInput from '@/components/feed/upload/Input/ContentsInput';
import DesktopFeedUploadLayout from '@/components/feed/upload/layout/DesktopFeedUploadLayout';
import MobileFeedUploadLayout from '@/components/feed/upload/layout/MobileFeedUploadLayout';
import CheckboxFormItem from '@/components/feed/upload/CheckboxFormItem';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import BackArrow from '@/public/icons/icon_chevron_left.svg';

interface AskFormValues {
  content: string;
  isAnonymous: boolean;
}

interface AskFormPageProps {
  defaultValues?: Partial<AskFormValues>;
  onSubmit: (values: AskFormValues) => Promise<void> | void;
  isEdit?: boolean;
  isSubmitting?: boolean;
  commentSlot?: ReactNode;
  description?: ReactNode;
  hideAnonymousToggle?: boolean;
}

export default function AskFormPage({
  defaultValues,
  onSubmit,
  isEdit = false,
  isSubmitting = false,
  commentSlot,
  description,
  hideAnonymousToggle = false,
}: AskFormPageProps) {
  const [content, setContent] = useState(defaultValues?.content ?? '');
  const [isAnonymous, setIsAnonymous] = useState(defaultValues?.isAnonymous ?? true);

  useEffect(() => {
    if (defaultValues?.content !== undefined) {
      setContent(defaultValues.content);
    }
    if (defaultValues?.isAnonymous !== undefined) {
      setIsAnonymous(defaultValues.isAnonymous);
    }
  }, [defaultValues?.content, defaultValues?.isAnonymous]);

  const desktopContentsRef = useRef<HTMLDivElement>(null);
  const mobileContentsRef = useRef<HTMLDivElement>(null);

  const isReadyToSubmit = content.trim().length > 0;
  const submitLabel = isEdit ? '수정하기' : '등록하기';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isReadyToSubmit || isSubmitting) return;

    await onSubmit({
      content: content.trim(),
      isAnonymous,
    });
  };

  const handleBack = () => {
    if (typeof window !== 'undefined') window.history.back();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Responsive only='desktop'>
        <DesktopFeedUploadLayout
          header={
            <>
              <BackArrowWrapper onClick={handleBack}>
                <BackArrow color={colors.white} />
              </BackArrowWrapper>
              <ButtonContainer>
                <Button type='submit' size='sm' disabled={!isReadyToSubmit || isSubmitting}>
                  {submitLabel}
                </Button>
              </ButtonContainer>
            </>
          }
          body={
            <Body>
              <InputWrapper>
                {description}
                {commentSlot}
                {commentSlot && <IconFlipForward style={{ width: 24, height: 24, transform: 'scale(1, -1)' }} />}
                <ContentsInput onChange={(e) => setContent(e.target.value)} ref={desktopContentsRef} value={content} />
              </InputWrapper>
            </Body>
          }
          footer={
            <Footer>
              <TagAndCheckboxWrapper>
                <CheckboxFormItem label='익명'>
                  <Checkbox checked={isAnonymous} onChange={() => setIsAnonymous((p) => !p)} size='medium' />
                </CheckboxFormItem>
              </TagAndCheckboxWrapper>
            </Footer>
          }
        />
      </Responsive>

      <Responsive only='mobile'>
        <MobileFeedUploadLayout
          header={
            <TopHeader>
              <Button type='submit' theme='blue' size='sm' disabled={!isReadyToSubmit || isSubmitting}>
                {submitLabel}
              </Button>
              <IconLeft type='button' onClick={handleBack}>
                <IconChevronLeft />
              </IconLeft>
            </TopHeader>
          }
          body={
            <Body>
              <InputWrapper>
                {description}
                {commentSlot}
                {commentSlot && <IconRepeat />}
                <ContentsInput onChange={(e) => setContent(e.target.value)} ref={mobileContentsRef} value={content} />
              </InputWrapper>
            </Body>
          }
          footer={
            <Footer>
              <TagAndCheckboxWrapper>
                {!hideAnonymousToggle && (
                  <CheckboxFormItem label='익명'>
                    <Checkbox checked={isAnonymous} onChange={() => setIsAnonymous((p) => !p)} size='medium' />
                  </CheckboxFormItem>
                )}
              </TagAndCheckboxWrapper>
            </Footer>
          }
        />
      </Responsive>
    </form>
  );
}

const Body = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 16px;
`;

const InputWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  min-width: 608px;
  max-width: 780px;
  min-height: calc(100vh - 72px - 24px - var(--footer-height, 50px));

  @media ${MOBILE_MEDIA_QUERY} {
    min-width: 100%;
    min-height: calc(100vh - 136px - var(--footer-height, 50px));
  }
`;

const BackArrowWrapper = styled.div`
  position: absolute;
  left: 0;
  cursor: pointer;
  padding-left: 32px;
  color: ${colors.white};
`;

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  gap: 12px;
  padding-right: 32px;
`;

const TopHeader = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  background-color: ${colors.gray950};
  padding: 8px 16px;
  width: 100%;
  height: 52px;
`;

const IconLeft = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  padding: 0;
  color: ${colors.white};
`;

const Footer = styled.div`
  width: 100%;
`;

const TagAndCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ReplyArrowWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: -8px;
  margin-bottom: -8px;
  padding-left: 8px;
  line-height: 1;
  color: ${colors.gray400};
  font-size: 20px;
`;
