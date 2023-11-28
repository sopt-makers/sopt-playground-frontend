import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getCategory } from '@/api/endpoint/feed/getCategory';
import useBlindWriterPromise from '@/components/feed/common/hooks/useBlindWriterPromise';
import { UploadFeedDataType } from '@/components/feed/upload/types';

export default function useUploadFeedData(initialForm: UploadFeedDataType) {
  const [feedData, setFeedData] = useState(initialForm);
  const { handleShowBlindWriterPromise } = useBlindWriterPromise();

  const { data: categoryData } = useQuery({
    queryKey: getCategory.cacheKey(),
    queryFn: getCategory.request,
  });

  const findParentCategory = (categoryId: number) => {
    const category =
      categoryData &&
      categoryData.find((category) =>
        category.children.length > 0
          ? category.children.some((tag) => tag.id === categoryId)
          : category.id === categoryId,
      );

    return category;
  };

  const resetIsBlindWriter = (categoryId: number) => {
    !findParentCategory(categoryId)?.hasBlind && setFeedData((feedData) => ({ ...feedData, isBlindWriter: false }));
  };

  const resetIsQuestion = (categoryId: number) => {
    !findParentCategory(categoryId)?.hasQuestion && setFeedData((feedData) => ({ ...feedData, isQuestion: false }));
  };

  const handleSaveMainCategory = (categoryId: number) => {
    setFeedData((feedData) => ({ ...feedData, mainCategoryId: categoryId }));
  };

  const handleSaveCategory = (categoryId: number) => {
    resetIsBlindWriter(categoryId);
    resetIsQuestion(categoryId);
    setFeedData((feedData) => ({ ...feedData, categoryId: categoryId }));
  };

  const handleSaveIsQuestion = (isQuestion: boolean) => {
    setFeedData((feedData) => ({ ...feedData, isQuestion: isQuestion }));
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

  const saveImageUrls = (urls: string[]) => {
    setFeedData((feedData) => ({ ...feedData, images: [...feedData.images, ...urls] }));
  };

  const removeImage = (index: number) => {
    const removeImages = feedData.images.filter((_, idx) => idx !== index);
    setFeedData((feedData) => ({ ...feedData, images: removeImages }));
  };

  const checkReadyToUpload = () => {
    return feedData.categoryId !== null && feedData.content.trim();
  };

  const resetFeedData = () => {
    setFeedData(initialForm);
  };

  return {
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
    findParentCategory,
  };
}
