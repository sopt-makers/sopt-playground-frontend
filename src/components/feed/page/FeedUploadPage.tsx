import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { UseMutateFunction, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { FormEvent, useEffect, useRef } from 'react';

import { getPost } from '@/api/endpoint/feed/getPost';
import { useGetPostsInfiniteQuery } from '@/api/endpoint/feed/getPosts';
import Checkbox from '@/components/common/Checkbox';
import Responsive from '@/components/common/Responsive';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import useCategory from '@/components/feed/common/hooks/useCategory';
import Category from '@/components/feed/upload/Category';
import CheckboxFormItem from '@/components/feed/upload/CheckboxFormItem';
import BlindWriterWarning from '@/components/feed/upload/CheckboxFormItem/BlindWriterWarning';
import CodeUploadButton from '@/components/feed/upload/CodeUploadButton';
import { useCategoryUsingRulesPreview } from '@/components/feed/upload/hooks/useCategorySelect';
import useUploadFeedData from '@/components/feed/upload/hooks/useUploadFeedData';
import ImagePreview from '@/components/feed/upload/ImagePreview';
import ImageUploadButton from '@/components/feed/upload/ImageUploadButton';
import ContentsInput from '@/components/feed/upload/Input/ContentsInput';
import TitleInput from '@/components/feed/upload/Input/TitleInput';
import DesktopFeedUploadLayout from '@/components/feed/upload/layout/DesktopFeedUploadLayout';
import MobileFeedUploadLayout from '@/components/feed/upload/layout/MobileFeedUploadLayout';
import { FeedDataType, UploadFeedDataType } from '@/components/feed/upload/types';
import UsingRules from '@/components/feed/upload/UsingRules';
import useImageUploader from '@/hooks/useImageUploader';
import BackArrow from '@/public/icons/icon_chevron_left.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface FeedUploadPageProp {
  editingId?: number;
  defaultValue: UploadFeedDataType;
  onSubmit: UseMutateFunction<unknown, Error, { data: FeedDataType; id: number | null }, unknown>;
}

export default function FeedUploadPage({ defaultValue, editingId, onSubmit }: FeedUploadPageProp) {
  const router = useRouter();
  const isEdit = editingId !== undefined;

  const {
    feedData,
    handleSaveCategory,
    handleSaveIsQuestion,
    handleSaveMainCategory,
    handleSaveIsBlindWriter,
    saveImageUrls,
    removeImage,
    handleSaveTitle,
    handleSaveContent,
    resetFeedData,
    checkReadyToUpload,
  } = useUploadFeedData(defaultValue);

  const mobileContentsRef = useRef<HTMLTextAreaElement>(null);
  const handleMobileKeyPressToContents = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      mobileContentsRef.current && mobileContentsRef.current.focus();
    }
  };

  const desktopContentsRef = useRef<HTMLTextAreaElement>(null);
  const handleDesktopKeyPressToContents = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      desktopContentsRef.current && desktopContentsRef.current.focus();
    }
  };

  const { imageInputRef: desktopRef, handleClickImageInput: handleDesktopClickImageInput } = useImageUploader({
    onSuccess: saveImageUrls,
    resizeHeight: 240,
  });
  const { imageInputRef: mobileRef, handleClickImageInput: handleMobileClickImageInput } = useImageUploader({
    onSuccess: saveImageUrls,
    resizeHeight: 240,
  });

  const { isPreviewOpen, openUsingRules, closeUsingRules } = useCategoryUsingRulesPreview(false);
  const { logClickEvent, logSubmitEvent } = useEventLogger();
  const queryClient = useQueryClient();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(
      {
        data: {
          categoryId: feedData.categoryId,
          title: feedData.title,
          content: feedData.content,
          isQuestion: feedData.isQuestion,
          isBlindWriter: feedData.isBlindWriter,
          images: feedData.images,
        },
        id: editingId ?? null,
      },
      {
        onSuccess: async () => {
          logSubmitEvent(editingId ? 'editCommunity' : 'submitCommunity');
          queryClient.invalidateQueries({ queryKey: useGetPostsInfiniteQuery.getKey('') });
          editingId && queryClient.invalidateQueries({ queryKey: getPost.cacheKey(`${editingId}`) });
          await router.push(playgroundLink.feedList());
        },
      },
    );
  };

  const handleQuitUpload = () => {
    router.back();
  };

  const { findMainCategory } = useCategory();

  const parentCategory = findMainCategory(feedData.categoryId, feedData.mainCategoryId);

  const quitUploading = () => {
    logClickEvent('quitUploadCommunity', {
      feedData: {
        categoryId: feedData.categoryId ?? 0,
        title: feedData.title,
        content: feedData.content,
        isQuestion: feedData.isQuestion,
        isBlindWriter: feedData.isBlindWriter,
        images: feedData.images,
      },
    });
  };

  useEffect(() => {
    localStorage.setItem('isFirst', 'true');
  }, []);

  useEffect(() => {
    // MEMO: 뒤로가기 감지 시, quitUploading 수행
    const handleBack = () => {
      quitUploading();
    };

    window.addEventListener('popstate', handleBack);

    return () => window.removeEventListener('popstate', handleBack);
  }, [feedData]);

  return (
    <form onSubmit={handleSubmit}>
      <Responsive only='desktop'>
        <DesktopFeedUploadLayout
          header={
            <>
              <LoggingClick
                eventKey='quitUploadCommunity'
                param={{
                  feedData: {
                    categoryId: feedData.categoryId ?? 0,
                    title: feedData.title,
                    content: feedData.content,
                    isQuestion: feedData.isQuestion,
                    isBlindWriter: feedData.isBlindWriter,
                    images: feedData.images,
                  },
                }}
              >
                <BackArrowWrapper onClick={handleQuitUpload}>
                  <BackArrow />
                </BackArrowWrapper>
              </LoggingClick>
              <Category
                feedData={feedData}
                onSaveCategory={handleSaveCategory}
                onSaveMainCategory={handleSaveMainCategory}
                openUsingRules={openUsingRules}
                closeUsingRules={closeUsingRules}
                isEdit={isEdit}
              />
              <ButtonContainer>
                <UsingRules isPreviewOpen={isPreviewOpen} onClose={closeUsingRules} />
                <SubmitButton disabled={!checkReadyToUpload()}>올리기</SubmitButton>
              </ButtonContainer>
            </>
          }
          body={
            <Body>
              <Aside />
              <InputWrapper>
                <TitleInput
                  onChange={handleSaveTitle}
                  onKeyDown={handleDesktopKeyPressToContents}
                  value={feedData.title}
                />
                <ContentsInput onChange={handleSaveContent} ref={desktopContentsRef} value={feedData.content} />
              </InputWrapper>
              <BlindWriterWarningWrapper>{feedData.isBlindWriter && <BlindWriterWarning />}</BlindWriterWarningWrapper>
            </Body>
          }
          footer={
            <Footer>
              <ImagePreview images={feedData.images} onRemove={removeImage} />
              <TagAndCheckboxWrapper>
                <TagsWrapper>
                  <ImageUploadButton
                    imageLength={feedData.images.length}
                    onClick={handleDesktopClickImageInput}
                    imageInputRef={desktopRef}
                  />
                  <CodeUploadButton />
                </TagsWrapper>
                <CheckBoxesWrapper>
                  {parentCategory?.hasQuestion && (
                    <CheckboxFormItem label='질문글'>
                      <Checkbox
                        checked={feedData.isQuestion}
                        onChange={(e) => handleSaveIsQuestion(e.target.checked)}
                        size='medium'
                      />
                    </CheckboxFormItem>
                  )}
                  {parentCategory?.hasBlind && (
                    <CheckboxFormItem label='익명'>
                      <Checkbox
                        checked={feedData.isBlindWriter}
                        onChange={(e) => handleSaveIsBlindWriter(e.target.checked)}
                        size='medium'
                      />
                    </CheckboxFormItem>
                  )}
                </CheckBoxesWrapper>
              </TagAndCheckboxWrapper>
            </Footer>
          }
        />
      </Responsive>
      <Responsive only='mobile'>
        <MobileFeedUploadLayout
          header={
            <>
              <TopHeader>
                <LoggingClick
                  eventKey='quitUploadCommunity'
                  param={{
                    feedData: {
                      categoryId: feedData.categoryId ?? 0,
                      title: feedData.title,
                      content: feedData.content,
                      isQuestion: feedData.isQuestion,
                      isBlindWriter: feedData.isBlindWriter,
                      images: feedData.images,
                    },
                  }}
                >
                  <Button type='button' disabled={false} onClick={handleQuitUpload}>
                    취소
                  </Button>
                </LoggingClick>
                <Button type='submit' disabled={!checkReadyToUpload()}>
                  올리기
                </Button>
              </TopHeader>
              <Category
                feedData={feedData}
                onSaveCategory={handleSaveCategory}
                onSaveMainCategory={handleSaveMainCategory}
                openUsingRules={openUsingRules}
                closeUsingRules={closeUsingRules}
                isEdit={isEdit}
              />
            </>
          }
          body={
            <Body>
              {feedData.isBlindWriter && <BlindWriterWarning />}
              <CheckBoxesWrapper>
                {parentCategory?.hasQuestion && (
                  <CheckboxFormItem label='질문글'>
                    <Checkbox
                      checked={feedData.isQuestion}
                      onChange={(e) => handleSaveIsQuestion(e.target.checked)}
                      size='medium'
                    />
                  </CheckboxFormItem>
                )}
                {parentCategory?.hasBlind && (
                  <CheckboxFormItem label='익명'>
                    <Checkbox
                      checked={feedData.isBlindWriter}
                      onChange={(e) => handleSaveIsBlindWriter(e.target.checked)}
                      size='medium'
                    />
                  </CheckboxFormItem>
                )}
              </CheckBoxesWrapper>
              <InputWrapper>
                <TitleInput
                  onChange={handleSaveTitle}
                  onKeyDown={handleMobileKeyPressToContents}
                  value={feedData.title}
                />
                <ContentsInput onChange={handleSaveContent} ref={mobileContentsRef} value={feedData.content} />
              </InputWrapper>
              <ImagePreview images={feedData.images} onRemove={removeImage} />
              <TagsWrapper>
                <ImageUploadButton
                  imageLength={feedData.images.length}
                  onClick={handleMobileClickImageInput}
                  imageInputRef={mobileRef}
                />
                <CodeUploadButton />
              </TagsWrapper>
            </Body>
          }
          footer={
            <Footer>
              <UsingRules isPreviewOpen={isPreviewOpen} onClose={closeUsingRules} />
            </Footer>
          }
        />
      </Responsive>
    </form>
  );
}

const Body = styled.section`
  display: flex;
  justify-content: space-between;

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    padding: 0 16px;
  }
`;

const Aside = styled.section`
  padding: 0 16px;
  width: 100%;
`;

const BlindWriterWarningWrapper = styled.section`
  padding: 0 16px;
  width: 100%;
`;

const InputWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 608px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 8px 0;
    min-width: 100%;
  }
`;

const BackArrowWrapper = styled.div`
  position: absolute;
  left: 0;
  cursor: pointer;
  padding-left: 32px;
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
  justify-content: space-between;
  padding: 0 16px;
  width: 100%;
  height: 44px;
`;

const Button = styled.button<{ disabled: boolean }>`
  ${textStyles.SUIT_16_M};

  color: ${({ disabled }) =>
    disabled
      ? css`
          ${colors.gray600}
        `
      : css`
          ${colors.gray50}
        `};
`;

const SubmitButton = styled.button<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${({ disabled }) =>
    disabled
      ? css`
          ${colors.gray700}
        `
      : css`
          ${colors.blue400}
        `};
  padding: 8px 12px;
  color: ${({ disabled }) =>
    disabled
      ? css`
          ${colors.gray300}
        `
      : css`
          ${colors.gray50}
        `};

  ${textStyles.SUIT_16_M};
`;

const TagsWrapper = styled.div`
  display: flex;
  gap: 8px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 16px 0;
  }
`;

const CheckBoxesWrapper = styled.div`
  display: flex;
  gap: 16px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin: 24px 0;
  }
`;

const Footer = styled.div`
  width: 100%;
`;

const TagAndCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
