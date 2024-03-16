export * from './buildCSSWithLength';

export const copyToClipboard = async (text: string, options?: { onSuccess?: () => void; onError?: () => void }) => {
  try {
    if (!text) throw new Error('빈 문자열입니다');
    await navigator.clipboard.writeText(text);
    options?.onSuccess?.();
  } catch {
    options?.onError?.();
  }
};

export const isClientSide = () => typeof window !== 'undefined';

export const safeParseInt = (str: string): number | null => {
  const value = parseInt(str, 10);

  if (isNaN(value)) {
    return null;
  }
  return value;
};

export const getScreenMaxWidthMediaQuery = (maxWidth: string) => `screen and (max-width: ${maxWidth})`;
