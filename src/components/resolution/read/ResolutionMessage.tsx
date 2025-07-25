import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { useGetResolution } from '@/api/endpoint/resolution/getResolution';
import Text from '@/components/common/Text';
import { fonts } from '@sopt-makers/fonts';
import { TAG } from '@/components/resolution/constants';
import resolutionBG from '@/public/icons/img/resolution/resolutionBG.png';

interface ResolutionMessageProps {
  isMessageExist: boolean;
}

const Tag = ({ selectedTagValues }: { selectedTagValues: string[] }) => {
  const filteredTags = TAG.filter((tagItem) => selectedTagValues.includes(tagItem.key));
  const itemCount = filteredTags.length;

  if (itemCount === 5) {
    const firstRowTags = filteredTags.slice(0, 3);
    const secondRowTags = filteredTags.slice(3, 5);
    return (
      <>
        <TagWrapper itemCount={3} nonPadding='padding-bottom'>
          {firstRowTags.map((tag, index) => (
            <StyledTagItem key={'tagItem' + index}>
              <StyledImage src={tag.image.select} alt={tag.value} />
              <StyledTagText typography='SUIT_14_SB' color={colors.white}>
                {tag.value}
              </StyledTagText>
            </StyledTagItem>
          ))}
        </TagWrapper>
        <TagWrapper itemCount={2} nonPadding='padding-top'>
          {secondRowTags.map((tag, index) => (
            <StyledTagItem key={'tagItem' + index}>
              <StyledImage src={tag.image.select} alt={tag.value} />
              <StyledTagText typography='SUIT_14_SB' color={colors.white}>
                {tag.value}
              </StyledTagText>
            </StyledTagItem>
          ))}
        </TagWrapper>
      </>
    );
  }
  return (
    <TagWrapper itemCount={itemCount}>
      {filteredTags.map((tag, index) => (
        <StyledTagItem key={'tagItem' + index}>
          <StyledImage src={tag.image.select} alt={tag.value} />
          <StyledTagText typography='SUIT_14_SB' color={colors.white}>
            {tag.value}
          </StyledTagText>
        </StyledTagItem>
      ))}
    </TagWrapper>
  );
};

const ResolutionMessage = ({ isMessageExist }: ResolutionMessageProps) => {
  const { data: resolutionData } = useGetResolution(isMessageExist);
  const { data: { name } = {} } = useGetMemberOfMe();

  return (
    <ResolutionMessageWrapper>
      <ResolutionBackground src={resolutionBG.src} />
      <Contents>
        <TitleText color={colors.white}>
          {`AT SOPT를 마친\n`}
          <Text color={colors.secondary} typography='SUIT_18_B'>{`${name?.slice(1)}`}</Text>
          에게
        </TitleText>
        {isMessageExist && resolutionData?.tags && <Tag selectedTagValues={resolutionData?.tags} />}
        {isMessageExist ? (
          <MessageWrapper>
            <Message color={colors.gray10} typography='SUIT_14_M'>
              {resolutionData?.content}
            </Message>
            <MessageFrom>From. 3월의 {`${name?.slice(1)}`}</MessageFrom>
          </MessageWrapper>
        ) : (
          <MessageWrapper>
            <Message color={colors.gray10} typography='SUIT_14_M'>
              <>
                {`(`}
                <Text color={colors.secondary} typography='SUIT_14_M'>{`${name?.slice(1)}`}</Text>
                {`님은 OT날 타임캡솝을 작성하지 않아,\n메이커스가 직접 편지를 준비했어요)\n\n안녕하세요, SOPT makers입니다.\n한 학기 동안 바쁘고 치열한 일정 속에서도\n끝까지 AT SOPT으로서 여정을 마쳐주셔서 감사합니다.\n\n여러분이 보여준 도전과 협업의 과정은,\n분명 어디서든 빛날 수 있는 힘이 되어줄 거라 믿습니다.\n수료를 진심으로 축하드리며, 앞으로의 여정에도\n늘 응원과 박수를 보냅니다.\n고생 많으셨습니다. 감사합니다!`}
              </>
            </Message>
            <MessageFrom>From. 메이커스🧡</MessageFrom>
          </MessageWrapper>
        )}
      </Contents>
    </ResolutionMessageWrapper>
  );
};

export default ResolutionMessage;

const ResolutionMessageWrapper = styled.main`
  position: relative;
  width: 100%;
  height: 604px;
`;

const ResolutionBackground = styled.img`
  border-radius: 20px;
  background: linear-gradient(to bottom right, #191919, #777);
  padding: 1px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
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
  padding: 16px 0;
  width: 100%;
  height: 100%;
`;

const TitleText = styled(Text)`
  text-align: center;
  white-space: pre;
  ${fonts.HEADING_18_B}
`;

const TagWrapper = styled.div<{ itemCount: number; nonPadding?: string }>`
  display: grid;
  grid-template-columns: repeat(${({ itemCount }) => (itemCount === 4 ? 2 : itemCount)}, 90px);
  gap: 8px;
  justify-content: center;
  margin-top: 12px;
  padding: 0 14px;
  ${({ nonPadding }) => nonPadding && `${nonPadding}: 0;`}
`;

const StyledTagItem = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  width: 90px;
  height: 90px;
`;

const StyledImage = styled.img`
  display: block;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  object-fit: cover;
`;

const StyledTagText = styled(Text)`
  position: absolute;
  top: 58px;
`;

const Message = styled(Text)`
  flex: 1 1 0;
  align-content: center;
  margin: 12px 0;
  padding: 0 16px;
  width: 100%;
  text-align: center;
  line-height: 22px;
  white-space: pre-line;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const MessageWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: inherit;
`;

const MessageFrom = styled.p``;
