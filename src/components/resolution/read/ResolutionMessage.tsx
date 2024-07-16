import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import { BackgroundOrange } from '@/components/resolution/read/images';

const tags = ['창업 기반', '문제 해결 능력', '전문성 강화', '협업 경험', '프로덕트 릴리즈'];
const message = '은서야 멋진 시간 보냈지?';

const ResolutionMessage = () => {
  return (
    <ResolutionMessageWrapper>
      <BackgroundImage />
      <Contents>ResolutionMessage</Contents>
    </ResolutionMessageWrapper>
  );
};

export default ResolutionMessage;

const ResolutionMessageWrapper = styled.main`
  position: relative;
  width: 100%;
  max-width: 335px;
`;

const Contents = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
`;

const BackgroundImage = styled(BackgroundOrange)`
  position: absolute;
  width: 100%;
  height: 100%;
`;
