import { useState } from 'react';

import useCategory from '@/components/feed/common/hooks/useCategory';
import {
  PART_CATEGORY_ID,
  PROMOTION_CATEGORY_ID,
  QUESTION_CATEGORY_ID,
  SOPTICLE_CATEGORY_ID,
} from '@/components/feed/constants';
import { PostedFeedDataType } from '@/components/feed/upload/types';

export default function useUploadFeedData(defaultValue: PostedFeedDataType) {
  const [feedData, setFeedData] = useState(defaultValue);
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
    const parentCategory = findParentCategory(categoryId);

    setFeedData((feedData) => ({
      ...feedData,
      categoryId,
      ...(isSopticle // / 솝티클이면 content와 title 초기화
        ? { content: 'content', title: '' }
        : isPrevSopticle && { content: '' }), // 이전 카테고리가 솝티클이었으면 content 다시 초기화
      isQuestion, // 질문 카테고리 여부에 따라 isQuestion 초기화
      isBlindWriter: parentCategory?.hasBlind ? isQuestion : false, // hasBlind가 있는 카테고리 중 질문 카테고리이면 true
    }));
  };

  const handleSaveIsBlindWriter = (isBlindWriter: boolean) => {
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
    if (feedData.categoryId === PROMOTION_CATEGORY_ID || feedData.categoryId === PART_CATEGORY_ID) {
      return false;
    }
    return (
      (feedData.categoryId !== null && feedData.title.trim() && feedData.content.trim()) ||
      (feedData.categoryId === SOPTICLE_CATEGORY_ID && feedData.link?.trim())
    );
  };

  const resetFeedData = () => {
    setFeedData(defaultValue);
  };

  const handleSaveVote = (options: string[], isMultiple: boolean) => {
    const filtered = options.map((o) => o.trim()).filter(Boolean);
    if (filtered.length < 2) return;

    setFeedData((prev) => ({
      ...prev,
      vote: {
        isMultiple,
        voteOptions: filtered,
      },
    }));
  };

  const resetVote = () => {
    setFeedData((prev) => ({
      ...prev,
      vote: null,
    }));
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
    handleSaveVote,
    resetVote,
  };
}
