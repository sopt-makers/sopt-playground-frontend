import { useState } from 'react';

import useBlindWriterPromise from '@/components/feed/common/hooks/useBlindWriterPromise';
import useCategory from '@/components/feed/common/hooks/useCategory';
import { QUESTION_CATEGORY_ID, SOPTICLE_CATEGORY_ID } from '@/components/feed/constants';
import { PostedFeedDataType } from '@/components/feed/upload/types';

export default function useUploadFeedData(defaultValue: PostedFeedDataType) {
  const [feedData, setFeedData] = useState(defaultValue);
  const { handleShowBlindWriterPromise } = useBlindWriterPromise();
  const { findParentCategory } = useCategory();

  const resetIsBlindWriter = (categoryId: number) => {
    const isQuestion = findParentCategory(categoryId)?.id === QUESTION_CATEGORY_ID;
    isQuestion && setFeedData((feedData) => ({ ...feedData, isBlindWriter: true }));

    !findParentCategory(categoryId)?.hasBlind && setFeedData((feedData) => ({ ...feedData, isBlindWriter: false }));
  };

  const handleSaveCategory = (categoryId: number) => {
    const isSopticle = findParentCategory(categoryId)?.id === SOPTICLE_CATEGORY_ID;
    const isPrevSopticle = !isSopticle && feedData.content === 'content' && feedData.title === '';
    const isQuestion = findParentCategory(categoryId)?.id === QUESTION_CATEGORY_ID;
    !feedData.isBlindWriter && isQuestion && handleShowBlindWriterPromise();

    setFeedData((feedData) => ({
      ...feedData,
      categoryId,
      ...(isSopticle // / 솝티클이면 content와 title 초기화
        ? { content: 'content', title: '' }
        : isPrevSopticle && { content: '' }), // 이전 카테고리가 솝티클이었으면 content 다시 초기화
      isQuestion, // 질문 카테고리 여부에 따라 isQuestion 초기화
      isBlindWriter: isQuestion ? true : feedData.isBlindWriter, // 질문 카테고리이면 익명으로 초기화
    }));
  };

  const handleSaveIsBlindWriter = (isBlindWriter: boolean) => {
    isBlindWriter && handleShowBlindWriterPromise();

    setFeedData((feedData) => ({ ...feedData, isBlindWriter: isBlindWriter }));
  };

  const handleSaveTitle = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const title = e.target.value.replace(/\n/g, '');

    setFeedData((feedData) => ({ ...feedData, title: title }));
  };

  const handleSaveContent = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedData((feedData) => ({ ...feedData, content: e.target.value }));
  };

  const handleSaveSopticleUrl = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedData((feedData) => ({ ...feedData, link: e.target.value }));
  };

  const saveImageUrls = (urls: string[]) => {
    setFeedData((feedData) => ({ ...feedData, images: [...feedData.images, ...urls] }));
  };

  const removeImage = (index: number) => {
    const removeImages = feedData.images.filter((_, idx) => idx !== index);
    setFeedData((feedData) => ({ ...feedData, images: removeImages }));
  };

  const checkReadyToUpload = () => {
    return (
      (feedData.categoryId !== null && feedData.content.trim()) ||
      (feedData.categoryId === SOPTICLE_CATEGORY_ID && feedData.link?.trim())
    );
  };

  const resetFeedData = () => {
    setFeedData(defaultValue);
  };

  return {
    feedData,
    handleSaveCategory,
    handleSaveIsBlindWriter,
    saveImageUrls,
    removeImage,
    handleSaveTitle,
    handleSaveContent,
    resetFeedData,
    checkReadyToUpload,
    findParentCategory,
    handleSaveSopticleUrl,
  };
}
