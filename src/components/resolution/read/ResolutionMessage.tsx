import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { useGetResolution } from '@/api/endpoint/resolution/getResolution';
import Text from '@/components/common/Text';
import { SoptLogo } from '@/components/resolution/read/images';
import { TitleDecoration } from '@/components/resolution/read/images';
import ResolutionBackground from '@/components/resolution/read/ResolutionBackground';

interface ResolutionMessageProps {
  isMessageExist: boolean;
}

const ResolutionMessage = ({ isMessageExist }: ResolutionMessageProps) => {
  const { data: resolutionData } = useGetResolution(isMessageExist);
  const { data: myData } = useGetMemberOfMe();

  return (
    <ResolutionMessageWrapper>
      <BackgroundWrapper>
        <ResolutionBackground />
      </BackgroundWrapper>
      <Contents>
        <TitleWrapper>
          <TitleText color={colors.white} typography='SUIT_18_B'>
            {`AND SOPT를\n마친 ${myData?.name.slice(1)}에게`}
          </TitleText>
          <StyledTitleDecoration />
        </TitleWrapper>
        <TagWrapper>
          {isMessageExist &&
            resolutionData?.tags.map((tag) => (
              <Tag key={tag} color={colors.gray200} typography='SUIT_14_SB'>
                {tag}
              </Tag>
            ))}
        </TagWrapper>
        {isMessageExist ? (
          <Message color={colors.gray10} typography='SUIT_14_M'>
            {resolutionData?.content}
          </Message>
        ) : (
          <EmptyMessageWrapper>
            <Message color={colors.gray10} typography='SUIT_14_M'>
              {`35기 솝트 활동은 어떠셨나요?\n\n이번 기수에 작성하신 다짐 메시지는 없지만,\n만족스러운 AND SOPT로 기억되길 바라요!`}
            </Message>
          </EmptyMessageWrapper>
        )}
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
  top: 0;
  left: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
  margin-top: 13px;
  width: 100%;
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
  text-align: center;
  white-space: pre;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
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
  text-align: center;
  white-space: pre-line;
  word-break: keep-all;
`;

const EmptyMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 320px;
`;

const SoptLogoWrapper = styled.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translate(-50%, -50%);
`;
