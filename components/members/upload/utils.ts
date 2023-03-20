import dayjs from 'dayjs';

import { Birthday } from '@/components/members/upload/types';

export const formatBirthday = (birthday: Birthday) => {
  const { year, month, day } = birthday;
  const parsedBirthDay = dayjs(`${year}-${month}-${day}`);
  return parsedBirthDay.isValid() ? parsedBirthDay.format('YYYY-MM-DD') : '';
};
