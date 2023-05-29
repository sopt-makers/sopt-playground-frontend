import { MENTORING_DATA_FOR_DEVELOPMENT } from './development';
import { MENTORING_DATA_FOR_PRODUCTION } from './production';

const ENV = process.env.NODE_ENV;

const getMentoringData = () => {
  if (ENV == 'production') {
    return MENTORING_DATA_FOR_PRODUCTION;
  }
  return MENTORING_DATA_FOR_DEVELOPMENT;
};

const mentoringData = getMentoringData();

export const mentoringProvider = {
  getMentoringById: (id: number) => mentoringData.mentoringByMentorId[id],
};
