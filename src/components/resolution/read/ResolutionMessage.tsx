import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Text from '@/components/common/Text';
import {
  Background0,
  Background1,
  Background2,
  Background3,
  Background4,
  Background5,
  SoptLogo,
} from '@/components/resolution/read/images';
import { TitleDecoration } from '@/components/resolution/read/images';

const tags = ['창업 기반', '문제 해결 능력', '전문성 강화', '협업 경험', '프로덕트 릴리즈', '네트워킹'];
const message =
  '300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까300자의길이는어떻게될까어';

const ResolutionMessage = () => {
  const BackgroundComponents = [
    <Background0 key={0} />,
    <Background1 key={1} />,
    <Background2 key={2} />,
    <Background3 key={3} />,
    <Background4 key={4} />,
    <Background5 key={5} />,
  ];

  const randomBackground = BackgroundComponents[Math.floor(Math.random() * BackgroundComponents.length)];

  return (
    <ResolutionMessageWrapper>
      <BackgroundWrapper>{randomBackground}</BackgroundWrapper>
      <Contents>
        <TitleWrapper>
          <TitleText color={colors.white} typography='SUIT_18_B'>
            NOW SOPT를 마친 태희에게
          </TitleText>
          <StyledTitleDecoration />
        </TitleWrapper>
        <TagWrapper>
          {tags.map((tag) => (
            <Tag key={tag} color={colors.gray200} typography='SUIT_14_SB'>
              {tag}
            </Tag>
          ))}
        </TagWrapper>
        <Message color={colors.gray10} typography='SUIT_14_M'>
          {message}
        </Message>
      </Contents>
      <SoptLogoWrapper>
        <SoptLogo />
      </SoptLogoWrapper>
    </ResolutionMessageWrapper>
  );
};

export default ResolutionMessage;

const ResolutionMessageWrapper = styled.main`
  position: relative;
  width: 100%;
  min-width: 335px;
  min-height: 524px;
`;

const Contents = styled.div`
  display: flex;
  position: absolute;
  top: 43%;
  left: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
`;

const BackgroundWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const TitleWrapper = styled.div`
  position: relative;
`;

const StyledTitleDecoration = styled(TitleDecoration)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TitleText = styled(Text)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-48%, -49%);
  min-width: 138px;
  text-align: center;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-start;
  padding: 0 15px;
`;

const Tag = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${colors.gray900};
  padding: 6px 16px;
  color: ${colors.gray200};
`;

const Message = styled(Text)`
  margin: 20px 0;
  padding: 0 16px;
  overflow-y: scroll;
  text-align: center;
`;

const SoptLogoWrapper = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translate(-50%, -50%);
`;
