import { useRef } from 'react';

import { getPresignedUrl, putPresignedUrl } from '@/api/endpoint/common/image';

export default function useImageUploader(onSuccess?: (s3Url: string) => void) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleClickImageInput = () => {
    const inputEl = imageInputRef.current;
    if (!inputEl) return;
    inputEl.value = '';
    inputEl.onchange = async function (this: GlobalEventHandlers, ev: Event) {
      ev.stopPropagation();
      const files = inputEl.files;
      if (files == null || files.length === 0) return;
      const file = files[0];
      try {
        const { filename, signedUrl } = await getPresignedUrl.request({ filename: file.name });
        if (!signedUrl) {
          throw new Error('presigned-url을 받아오는데 실패하였습니다.');
        }

        await putPresignedUrl({
          signedUrl: decodeURIComponent(signedUrl),
          file,
        });

        const s3Url = `https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal/${filename}`;
        onSuccess?.(s3Url);
      } catch (error) {
        console.error(error);
      }
    };
    inputEl.click();
  };

  return { imageInputRef, handleClickImageInput };
}
