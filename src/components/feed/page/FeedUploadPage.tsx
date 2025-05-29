import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Callout } from '@sopt-makers/ui';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef } from 'react';

import Checkbox from '@/components/common/Checkbox';
import Responsive from '@/components/common/Responsive';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import useCategory from '@/components/feed/common/hooks/useCategory';
import { QUESTION_CATEGORY_ID, SOPTICLE_CATEGORY_ID } from '@/components/feed/constants';
import Category from '@/components/feed/upload/Category';
import CheckboxFormItem from '@/components/feed/upload/CheckboxFormItem';
import { useCategoryUsingRulesPreview } from '@/components/feed/upload/hooks/useCategorySelect';
import useLinkValidator from '@/components/feed/upload/hooks/useLinkValidator';
import useUploadFeedData from '@/components/feed/upload/hooks/useUploadFeedData';
import ImagePreview from '@/components/feed/upload/ImagePreview';
import ImageUploadButton from '@/components/feed/upload/ImageUploadButton';
import ContentsInput from '@/components/feed/upload/Input/ContentsInput';
import LinkInput from '@/components/feed/upload/Input/LinkInput';
import TitleInput from '@/components/feed/upload/Input/TitleInput';
import DesktopFeedUploadLayout from '@/components/feed/upload/layout/DesktopFeedUploadLayout';
import MobileFeedUploadLayout from '@/components/feed/upload/layout/MobileFeedUploadLayout';
import { PostedFeedDataType } from '@/components/feed/upload/types';
import UsingRules from '@/components/feed/upload/UsingRules';
import useImageUploader from '@/hooks/useImageUploader';
import BackArrow from '@/public/icons/icon_chevron_left.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { IconChevronLeft } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';

interface FeedUploadPageProp {
  editingId?: number;
  defaultValue: PostedFeedDataType;
  onSubmit: ({ data, id }: { data: PostedFeedDataType; id: number | null }) => void;
}

export default function FeedUploadPage({ defaultValue, editingId, onSubmit }: FeedUploadPageProp) {
  const router = useRouter();
  const isEdit = editingId !== undefined;

  const {
    feedData,
    handleSaveCategory,
    handleSaveIsBlindWriter,
    saveImageUrls,
    removeImage,
    handleSaveTitle,
    handleSaveContent,
    checkReadyToUpload,
    handleSaveSopticleUrl,
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

  const { isPreviewOpen, closeUsingRules } = useCategoryUsingRulesPreview(false);
  const { logClickEvent } = useEventLogger();

  const { isLinkError, validateLink, resetLinkError } = useLinkValidator();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSopticle && !validateLink(feedData.link)) {
      return;
    }

    onSubmit({
      data: {
        categoryId: feedData.categoryId,
        title: feedData.title,
        content: feedData.content,
        isQuestion: feedData.isQuestion,
        isBlindWriter: feedData.isBlindWriter,
        images: feedData.images,
        link: feedData.link,
      },
      id: editingId ?? null,
    });
  };

  const handleQuitUpload = () => {
    router.back();
  };

  const { findParentCategory } = useCategory();

  const parentCategory = findParentCategory(feedData.categoryId);

  const isSopticle = parentCategory?.id === SOPTICLE_CATEGORY_ID;
  const isQuestion = parentCategory?.id === QUESTION_CATEGORY_ID;

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
              <Category feedData={feedData} onSaveCategory={handleSaveCategory} isEdit={isEdit} />
              <ButtonContainer>
                <Button theme='blue' size='sm' disabled={!checkReadyToUpload()}>
                  올리기
                </Button>
              </ButtonContainer>
            </>
          }
          body={
            <Body>
              {isSopticle ? (
                <InputWrapper>
                  <LinkInput
                    onChange={(e) => {
                      handleSaveSopticleUrl(e);
                      resetLinkError();
                    }}
                    value={feedData.link}
                    isError={isLinkError}
                  />
                  <Callout type='information' hasIcon>
                    내가 직접 작성한 아티클을 SOPT회원들에게 공유해 보세요!
                  </Callout>
                </InputWrapper>
              ) : (
                <InputWrapper>
                  {isQuestion && (
                    <Callout type='information' hasIcon>
                      SOPT회원들에게 나의 고민이나 궁금증을 공유하고 답변을 받아보세요!
                    </Callout>
                  )}
                  <TitleInput
                    onChange={handleSaveTitle}
                    onKeyDown={handleDesktopKeyPressToContents}
                    value={feedData.title}
                  />
                  <ContentsInput onChange={handleSaveContent} ref={desktopContentsRef} value={feedData.content} />
                  {feedData.images.length === 0 && (
                    <UsingRules isPreviewOpen={isPreviewOpen} onClose={closeUsingRules} />
                  )}
                </InputWrapper>
              )}
            </Body>
          }
          footer={
            <Footer>
              {feedData.images.length !== 0 && <ImagePreview images={feedData.images} onRemove={removeImage} />}
              <TagAndCheckboxWrapper>
                {!isSopticle && (
                  <TagsWrapper>
                    <ImageUploadButton
                      imageLength={feedData.images.length}
                      onClick={handleDesktopClickImageInput}
                      imageInputRef={desktopRef}
                    />
                  </TagsWrapper>
                )}
                {parentCategory?.hasBlind && (
                  <CheckboxFormItem label='익명'>
                    <Checkbox
                      checked={feedData.isBlindWriter}
                      onChange={(e) => {
                        handleSaveIsBlindWriter(!feedData.isBlindWriter);
                      }}
                      size='medium'
                    />
                  </CheckboxFormItem>
                )}
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
                  <IconLeft color={colors.white} onClick={handleQuitUpload} />
                </LoggingClick>
                <Button type='submit' theme='blue' size='sm' disabled={!checkReadyToUpload()}>
                  올리기
                </Button>
              </TopHeader>
              <Category feedData={feedData} onSaveCategory={handleSaveCategory} isEdit={isEdit} />
            </>
          }
          body={
            <Body>
              {isSopticle ? (
                <InputWrapper>
                  <LinkInput
                    onChange={(e) => {
                      handleSaveSopticleUrl(e);
                      resetLinkError();
                    }}
                    value={feedData.link}
                    isError={isLinkError}
                  />
                  <CalloutWrapper>
                    <Callout type='information' hasIcon>
                      내가 직접 작성한 아티클을 SOPT회원들에게 공유해 보세요!
                    </Callout>
                  </CalloutWrapper>
                </InputWrapper>
              ) : (
                <InputWrapper>
                  {isQuestion && (
                    <Callout type='information' hasIcon>
                      SOPT회원들에게 나의 고민이나 궁금증을 공유하고 답변을 받아보세요!
                    </Callout>
                  )}
                  <TitleInput
                    onChange={handleSaveTitle}
                    onKeyDown={handleMobileKeyPressToContents}
                    value={feedData.title}
                  />
                  <ContentsInput onChange={handleSaveContent} ref={mobileContentsRef} value={feedData.content} />
                  {feedData.images.length === 0 && (
                    <UsingRules isPreviewOpen={isPreviewOpen} onClose={closeUsingRules} />
                  )}
                </InputWrapper>
              )}
            </Body>
          }
          footer={
            <Footer>
              {feedData.images.length !== 0 && <ImagePreview images={feedData.images} onRemove={removeImage} />}
              <TagAndCheckboxWrapper>
                {!isSopticle && (
                  <TagsWrapper>
                    <ImageUploadButton
                      imageLength={feedData.images.length}
                      onClick={handleMobileClickImageInput}
                      imageInputRef={mobileRef}
                    />
                  </TagsWrapper>
                )}
                {parentCategory?.hasBlind && (
                  <CheckboxFormItem label='익명'>
                    <Checkbox
                      checked={feedData.isBlindWriter}
                      onChange={(e) => handleSaveIsBlindWriter(!feedData.isBlindWriter)}
                      size='medium'
                    />
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
`;

const IconLeft = styled(IconChevronLeft)`
  width: 28px;
  height: 28px;
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
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  background-color: ${colors.gray950};
  padding: 8px 16px;
  width: 100%;
  height: 52px;
`;

const TagsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Footer = styled.div`
  width: 100%;
`;

const TagAndCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const CalloutWrapper = styled.div`
  margin-bottom: 12px;
`;
