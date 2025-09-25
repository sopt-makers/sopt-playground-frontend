export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const formatPhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, '').slice(0, 11);
  const len = digits.length;

  if (len <= 3) {
    return digits;
  } else if (len <= 7) {
    return digits.replace(/(\d{3})(\d{1,4})/, '$1-$2');
  } else {
    return digits.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
  }
};

export const extractPhoneDigits = (phone: string): string => {
  return phone.replace(/[^0-9]/g, '');
};
