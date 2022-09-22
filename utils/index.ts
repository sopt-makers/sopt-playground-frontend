export const copyToClipboard = async (text: string, onSuccess?: () => void, onError?: () => void) => {
  try {
    if (!text) throw '빈 문자열입니다';
    await navigator.clipboard.writeText(text);
    onSuccess?.();
  } catch (error) {
    onError?.();
  }
};
