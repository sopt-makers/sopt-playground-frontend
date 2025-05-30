import { useState } from 'react';

export default function useLinkValidator() {
  const [isLinkError, setIsLinkError] = useState(false);

  const isValidLink = (link: string | null) => {
    return /^https?:\/\//.test(link ?? '');
  };

  const validateLink = (link: string | null) => {
    const isValid = isValidLink(link);
    setIsLinkError(!isValid);

    return isValid;
  };

  const resetLinkError = () => {
    setIsLinkError(false);
  };

  return {
    isLinkError,
    validateLink,
    resetLinkError,
  };
}
