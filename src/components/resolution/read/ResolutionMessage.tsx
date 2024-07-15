import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import ResizedImage from '@/components/common/ResizedImage';
import { BackgroundOrange } from '@/components/resolution/read/images';

const tags = ['창업 기반', '문제 해결 능력', '전문성 강화', '협업 경험', '프로덕트 릴리즈'];
const message = '은서야 멋진 시간 보냈지?';

const ResolutionMessage = () => {
  return (
    <ResolutionMessageWrapper>
      ResolutionMessage
      <BackgroundImage />
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

const BackgroundImage = styled(BackgroundOrange)`
  & > svg {
    border-radius: 20px;
  }
`;
