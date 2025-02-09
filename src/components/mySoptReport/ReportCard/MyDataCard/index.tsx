import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import { getCardConfig, Value } from '@/components/mySoptReport/constants';
import CardHeader from '@/components/mySoptReport/ReportCard/CardHeader';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface MyTypeCardProps {
  type: string;
  value: Value;
}

const index = ({ type, value }: MyTypeCardProps) => {
  const cardConfig = getCardConfig(type, value);

  return (
    <Wrapper $bgColor={cardConfig.bgColor}>
      <CardHeader type={type} value={value} />
      <Title
        $titleColor={cardConfig.titleColor}
        $strongColor={cardConfig.strongColor}
        dangerouslySetInnerHTML={{ __html: cardConfig.title }}
      />
      {cardConfig.description && (
        <Description $strongColor={cardConfig.strongColor}>{cardConfig.description}</Description>
      )}
      {type === 'myCrewStats' && (
        <CrewContainer>
          {cardConfig.crewList!.length > 0 ? (
            cardConfig.crewList!.slice(0, 3).map((crew: string, idx: number) => (
              <CrewItem key={idx} $index={idx}>
                <CrewText>{crew}</CrewText>
              </CrewItem>
            ))
          ) : (
            <CrewItem $index={0}>작년에 신청한 모임이 없어요</CrewItem>
          )}
          {}
        </CrewContainer>
      )}

      {type === 'myWordChainGameStats' && (
        <WordChainContainer>
          {cardConfig.wordList!.length > 0 ? (
            cardConfig
              .wordList!.slice(0, 5)
              .map((word: string, idx: number) => <WordChainChip key={idx}>{word}</WordChainChip>)
          ) : (
            <CrewItem $index={0}>작년에 참여한 끝말잇기가 없어요</CrewItem>
          )}
          {}
        </WordChainContainer>
      )}
      {cardConfig?.subImage && <TypeImg src={cardConfig?.subImage as string} />}
    </Wrapper>
  );
};

export default index;

const Wrapper = styled.div<{ $bgColor?: string }>`
  border-radius: 12px;
  background-color: ${({ $bgColor }) => $bgColor || colors.gray100};
  padding: 28.8px;
  width: 100%;
  height: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 10px;
    padding: 24px;
  }
`;

const Title = styled.h2<{ $titleColor?: string; $strongColor?: string }>`
  margin-top: 28px;
  white-space: pre-line;
  color: ${({ $titleColor }) => $titleColor || colors.black};
  ${fonts.TITLE_24_SB};

  .highlight {
    color: ${({ $strongColor }) => $strongColor || colors.black};
    ${fonts.TITLE_28_SB};

    @media ${MOBILE_MEDIA_QUERY} {
      ${fonts.TITLE_24_SB};
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 24px;
    ${fonts.TITLE_20_SB};
  }
`;

const Description = styled.p<{ $strongColor?: string }>`
  margin-top: 12px;
  ${fonts.BODY_16_R};

  white-space: pre-line;
  color: ${({ $strongColor }) => $strongColor || colors.gray600};
  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.BODY_13_R};
  }
`;

const TypeImg = styled.img`
  margin-top: 14px;
`;

const CrewContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  margin-top: 28px;
  color: ${colors.gray50};

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 6px;
    margin-top: 24px;
  }
`;

const CrewItem = styled.li<{ $index: number }>`
  ${fonts.BODY_13_M};

  border-radius: 4px;
  background-color: ${({ $index }) =>
    $index === 0 ? 'rgba(15, 15, 18, 0.60)' : $index === 1 ? 'rgba(15, 15, 18, 0.40)' : 'rgba(15, 15, 18, 0.20)'};
  padding: 9.6px 12px;
  width: 100%;
  @media ${MOBILE_MEDIA_QUERY} {
    ${fonts.LABEL_12_SB};

    padding: 8px 10px;
  }
`;

const CrewText = styled.p`
  /* stylelint-disable */
  display: -webkit-box;

  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const WordChainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 40px;
  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 35px;
  }
`;

const WordChainChip = styled.div`
  display: flex;
  padding: 7.2px 14.4px;
  justify-content: center;
  align-items: center;
  ${fonts.LABEL_14_SB};
  background-color: #bc60a7;
  border-radius: 120px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 6px 12px;

    ${fonts.LABEL_11_SB};
  }
`;
