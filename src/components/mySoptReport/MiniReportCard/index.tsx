import { CardConfig, getCardConfig, Value, WordChainGameStats } from '@/components/mySoptReport/constants';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

interface MiniReportCardProps {
  type: string;
  value: Value;
}

interface TypeConfig {
  [key: string]: {
    value: string;
  };
}

const index = ({ type, value }: MiniReportCardProps) => {
  const cardConfig: CardConfig = getCardConfig(type, value);

  const typeConfig: TypeConfig = {
    '새로 오솝군요!': {
      value: '새로\n오솝군요!',
    },
    '솝플루언서': {
      value: '솝플루언서',
    },
    '인간 솝크드인': {
      value: '인간\n솝크드인',
    },
    '서비스 익솝플로러': {
      value: '서비스\n익솝플로러',
    },
    '우리말 솝고수': {
      value: '우리말\n솝고수',
    },
    '얼죽솝': {
      value: '얼죽솝',
    },
    '솝만추': {
      value: '솝만추',
    },
  };

  return (
    <Wrapper $bgColor={cardConfig?.bgColor}>
      {type === 'myType' ? (
        <>
          <Title>내 플그 활동 유형은</Title>
          <TypeValue $isSecondLine={typeConfig[value as string]?.value.length >= 6}>
            {typeConfig[value as string]?.value}
          </TypeValue>
        </>
      ) : (
        <>
          <Title $titleColor={cardConfig.strongColor}>{cardConfig.miniTitle}</Title>
          {type === 'myWordChainGameStats' ? (
            <>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <ReportValue $marginTop={5} $color={cardConfig.strongColor!}>
                  {(value as WordChainGameStats).playCount}번
                </ReportValue>
                &nbsp;&nbsp;
                <Title $titleColor={cardConfig.strongColor}>중</Title>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <Title $titleColor={cardConfig.strongColor}>우승 횟수는</Title>
                <ReportValue
                  $marginTop={16}
                  $color={cardConfig.strongColor!}
                  $fontSize={(value as WordChainGameStats).winCount >= 10 ? '40px' : '56px'}
                >
                  {(value as WordChainGameStats).winCount}번
                </ReportValue>
              </div>
            </>
          ) : (
            <ReportValue
              $marginTop={60}
              $color={cardConfig.strongColor!}
              $fontSize={cardConfig?.miniValue && cardConfig?.miniValue?.length >= 6 ? '50px' : '60px'}
            >
              {cardConfig.miniValue}
            </ReportValue>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default index;

const Wrapper = styled.div<{ $bgColor?: string }>`
  flex-shrink: 0;
  border-radius: 32px;
  background-color: ${({ $bgColor }) => $bgColor || colors.gray10};
  padding: 26px 24px;
  width: 236.5px;
  height: 237.5px;
`;

const Title = styled.h2<{ $titleColor?: string }>`
  white-space: pre-line;
  color: ${({ $titleColor }) => $titleColor || colors.gray900};
  ${fonts.TITLE_20_SB};

  font-size: 22px;
`;

const TypeValue = styled.p<{ $isSecondLine?: boolean }>`
  margin-top: ${({ $isSecondLine }) => ($isSecondLine ? '50' : '110')}px;
  ${fonts.HEADING_16_B};

  line-height: 130%;
  white-space: pre-line;
  color: #3e74fd;
  font-size: 42px;
`;

const ReportValue = styled.p<{ $marginTop?: number; $fontSize?: string; $color: string }>`
  margin-top: ${({ $marginTop }) => $marginTop}px;
  ${fonts.HEADING_16_B};

  line-height: 130%;
  white-space: pre-line;
  color: ${({ $color }) => $color};
  font-size: ${({ $fontSize }) => $fontSize || '60px'};
`;
