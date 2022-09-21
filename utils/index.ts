export const copyToClipboard = async (text: string, onSuccess?: () => void, onError?: () => void) => {
  try {
    if (!text) throw '빈 문자열입니다';
    console.log('copy');
    await navigator.clipboard.writeText(text);
    onSuccess && onSuccess();
  } catch (error) {
    onError && onError();
  }
};
