import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import ResizedImage from '@/components/common/ResizedImage';

import background1 from './images/background1.png';
import background2 from './images/background2.png';
import background3 from './images/background3.png';
import background4 from './images/background4.png';
import background5 from './images/background5.png';
import background6 from './images/background6.png';

const tags = ['창업 기반', '문제 해결 능력', '전문성 강화', '협업 경험', '프로덕트 릴리즈'];
const message = '은서야 멋진 시간 보냈지?';

const ResolutionMessage = () => {
  return (
    <ResolutionMessageWrapper>
      ResolutionMessage
      <ResizedImage src={background1.src} width={335} />
    </ResolutionMessageWrapper>
  );
};

export default ResolutionMessage;

const ResolutionMessageWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${colors.black};
  width: 100%;
  max-width: 335px;
`;
