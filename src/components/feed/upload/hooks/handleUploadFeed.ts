import { useCallback, useState } from 'react';

import { UploadFeedDataType } from '@/components/feed/upload/types';

export default function useUploadFeedData(initialForm: UploadFeedDataType) {
  const [feedData, setFeedData] = useState(initialForm);

  const handleSaveCategory = (categoryId: number) => {
    setFeedData({ ...feedData, categoryId: categoryId });
  };

  const handleSaveIsQuestion = (isQuestion: boolean) => {
    setFeedData({ ...feedData, isQuestion: isQuestion });
  };

  const handleSaveIsBlindWriter = (isBlindWriter: boolean) => {
    setFeedData({ ...feedData, isBlindWriter: isBlindWriter });
  };

  const handleSaveTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      setFeedData({ ...feedData, title: e.currentTarget.value });
    },
    [],
  );

  const handleSaveContent = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      setFeedData({ ...feedData, content: e.currentTarget.value });
    },
    [],
  );

  const saveImageUrls = (urls: string) => {
    setFeedData({ ...feedData, images: [...feedData.images, urls] });
  };

  const removeImage = (index: number) => {
    const removeImages = feedData.images.filter((_, idx) => idx !== index);
    setFeedData({ ...feedData, images: removeImages });
  };

  const handleUploadFeed = () => {
    // TODO: post api 연결
  };

  const resetFeedData = useCallback(() => setFeedData(initialForm), [initialForm]);

  return [
    feedData,
    handleSaveCategory,
    handleSaveIsQuestion,
    handleSaveIsBlindWriter,
    saveImageUrls,
    removeImage,
    handleSaveTitle,
    handleSaveContent,
    handleUploadFeed,
    resetFeedData,
  ] as const;
}
