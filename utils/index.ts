export const copyToClipboard = async (text: string, options?: { onSuccess?: () => void; onError?: () => void }) => {
  try {
    if (!text) throw new Error('빈 문자열입니다');
    await navigator.clipboard.writeText(text);
    options?.onSuccess?.();
  } catch (error) {
    options?.onError?.();
  }
};

export const isClientSide = () => typeof window !== 'undefined';
