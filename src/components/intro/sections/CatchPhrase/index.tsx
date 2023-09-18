import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import { AndroidIcon, AppleIcon, ArrowIcon, MakersIcon, SOPTIcon } from '@/components/intro/sections/CatchPhrase/icons';
import Typer from '@/components/intro/sections/CatchPhrase/Typer';
import { playgroundLink } from '@/constants/links';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface CatchPhraseSectionProps {}

const CatchPhraseSection: FC<CatchPhraseSectionProps> = ({}) => {
  return (
    <Container>
      <PlaygroundChip>SOPT Playground</PlaygroundChip>
      <PhraseBox>
        <div>SOPT 구성원들과</div>
        <TyperBox>
          {' '}
          {/* 높이 유지용 의도된 빈칸 */}
          <Typer
            sequence={[
              [{ text: '연결', style: { color: '#5DDBFF' } }, { text: '되는 공간' }],
              [{ text: '기회', style: { color: '#FDBBF9' } }, { text: '를 공유하는 공간' }],
              [{ text: '즐거움', style: { color: '#FFCA00' } }, { text: '을 느끼는 공간' }],
            ]}
            span={{
              fill: 1000,
              full: 1000,
              erase: 800,
              empty: 300,
            }}
          />{' '}
        </TyperBox>
      </PhraseBox>
      <LinkBox>
        <SiteLink href={playgroundLink.makers()}>
          <MakersIcon />
          <StyledArrowIcon />
        </SiteLink>
        <SiteLink href='https://sopt.org' target='_blank'>
          <SOPTIcon />
          <StyledArrowIcon />
        </SiteLink>
        <SiteLink href='https://sopt.org' target='_blank'>
          <StyledAppleIcon />
          <span>{`Download 'SOPT' iOS`}</span>
        </SiteLink>
        <SiteLink href='https://sopt.org' target='_blank'>
          <StyledAndroidIcon />
          <span>{`Download 'SOPT' Android`}</span>
        </SiteLink>
      </LinkBox>
    </Container>
  );
};

export default CatchPhraseSection;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 120px;
  padding-bottom: 80px;
`;

const PlaygroundChip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.gray80};
  border-radius: 68px;
  padding: 10px 24px;

  ${textStyles.SUIT_16_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_12_B};
  }
`;

const PhraseBox = styled.div`
  margin-top: 17px;
  text-align: center;
  line-height: 120%;
  letter-spacing: -1.2px;

  ${textStyles.SUIT_60_B};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 15px;

    ${textStyles.SUIT_32_B}
  }
`;

const TyperBox = styled.div`
  white-space: pre-wrap;
`;

const LinkBox = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 72px;

  ${textStyles.SUIT_14_M};

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const SiteLink = styled(Link)`
  display: flex;
  align-items: center;
  transition: color 0.3s;
  color: ${colors.gray60};

  &:hover {
    color: ${colors.white};
  }
`;

const StyledArrowIcon = styled(ArrowIcon)`
  margin-left: 4px;
`;

const StyledAppleIcon = styled(AppleIcon)`
  margin-right: 10px;
`;

const StyledAndroidIcon = styled(AndroidIcon)`
  margin-right: 10px;
`;
