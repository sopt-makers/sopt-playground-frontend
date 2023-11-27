import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormEvent, useRef } from 'react';

import { getCategory } from '@/api/endpoint/feed/getCategory';
import { useSaveUploadFeedData } from '@/api/endpoint/feed/uploadFeed';
import Checkbox from '@/components/common/Checkbox';
import Loading from '@/components/common/Loading';
import Responsive from '@/components/common/Responsive';
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
import UsingRules from '@/components/feed/upload/UsingRules';
import useImageUploader from '@/hooks/useImageUploader';
import BackArrow from '@/public/icons/icon_chevron_left.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

export default function FeedUploadPage() {
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
  } = useUploadFeedData({
    mainCategoryId: null,
    categoryId: null,
    title: '',
    content: '',
    isQuestion: false,
    isBlindWriter: false,
    images: [],
  });
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

  const router = useRouter();

  const { imageInputRef: desktopRef, handleClickImageInput: handleDesktopClickImageInput } = useImageUploader({
    onSuccess: saveImageUrls,
    resizeHeight: 240,
  });
  const { imageInputRef: mobileRef, handleClickImageInput: handleMobileClickImageInput } = useImageUploader({
    onSuccess: saveImageUrls,
    resizeHeight: 240,
  });

  const { isPreviewOpen, openUsingRules, closeUsingRules } = useCategoryUsingRulesPreview(false);

  const { mutate: handleUploadFeed, isPending } = useSaveUploadFeedData();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUploadFeed({
      categoryId: feedData.categoryId ?? 0,
      title: feedData.title,
      content: feedData.content,
      isQuestion: feedData.isQuestion,
      isBlindWriter: feedData.isBlindWriter,
      images: feedData.images,
    });
  };

  const hanldeQuitUpload = () => {
    router.push('/community');
  };

  const { data: categories } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
  });

  const parentCategory =
    (categories &&
      categories.find(
        (category) =>
          category.id === feedData.mainCategoryId || category.children.some((tag) => tag.id === feedData.categoryId),
      )) ??
    null;

  if (isPending) return <Loading />;

  return (
    <form onSubmit={handleSubmit}>
      <Responsive only='desktop'>
        <DesktopFeedUploadLayout
          header={
            <>
              <BackArrowWrapper>
                <BackArrow onClick={hanldeQuitUpload} />
              </BackArrowWrapper>
              <Category
                feedData={feedData}
                onSaveCategory={handleSaveCategory}
                onSaveMainCategory={handleSaveMainCategory}
                openUsingRules={openUsingRules}
                closeUsingRules={closeUsingRules}
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
                <ContentsInput onChange={handleSaveContent} ref={desktopContentsRef} />
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
                <Button type='button' disabled={false} onClick={hanldeQuitUpload}>
                  취소
                </Button>
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
                <ContentsInput onChange={handleSaveContent} ref={mobileContentsRef} />
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
            <>
              <UsingRules isPreviewOpen={isPreviewOpen} onClose={closeUsingRules} />
            </>
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
    margin-top: 8px;
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
    margin-top: 16px;
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
`;
