import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { m } from 'framer-motion';
import Link from 'next/link';
import { FC, useCallback, useState } from 'react';

import {
  AndroidIcon,
  AppleIcon,
  ArrowIcon,
  Icon,
  MakersIcon,
  PlaygroundIcon,
  SOPTIcon,
} from '@/components/intro/sections/CatchPhrase/icons';
import Typer from '@/components/intro/sections/CatchPhrase/Typer';
import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface CatchPhraseSectionProps {}

const shineColorList = ['#5DDBFF', '#FDBBF9', '#FFCA00'];

const CatchPhraseSection: FC<CatchPhraseSectionProps> = ({}) => {
  const [shineColor, setShineColor] = useState(shineColorList[0]);

  const handleSentenceChange = useCallback((_: unknown, idx: number) => {
    setShineColor(shineColorList[idx] ?? 'transparent');
  }, []);

  return (
    <Container>
      <BackgroundLayer>
        <Shine color={shineColor} />
        <StyledBackImage />
      </BackgroundLayer>
      <ContentLayer>
        <PlaygroundIconBox>
          <PlaygroundIcon />
        </PlaygroundIconBox>
        <PhraseBox>
          <div>SOPT 구성원들과</div>
          <TyperBox>
            {' '}
            {/* 높이 유지용 의도된 빈칸 */}
            <Typer
              sequence={[
                [{ text: '연결', style: { color: shineColorList[0] } }, { text: '되는 공간' }],
                [{ text: '기회', style: { color: shineColorList[1] } }, { text: '를 공유하는 공간' }],
                [{ text: '즐거움', style: { color: shineColorList[2] } }, { text: '을 느끼는 공간' }],
              ]}
              span={{
                fill: 1000,
                full: 1000,
                erase: 800,
                empty: 300,
              }}
              onSentenceChange={handleSentenceChange}
            />{' '}
          </TyperBox>
        </PhraseBox>
        <LinkBox>
          <SiteLink href={playgroundLink.makers()}>
            <MakersIcon />
            <StyledArrowIcon />
          </SiteLink>
          <SiteLink href='https://sopt.org' rel='noreferrer' target='_blank'>
            <SOPTIcon />
            <StyledArrowIcon />
          </SiteLink>
          <SiteLink href='https://apps.apple.com/kr/app/sopt/id6444594319' rel='noreferrer' target='_blank'>
            <StyledAppleIcon />
            <span>{`Download 'SOPT' iOS`}</span>
          </SiteLink>
          <SiteLink
            href='https://play.google.com/store/apps/details?id=org.sopt.official'
            rel='noreferrer'
            target='_blank'
          >
            <StyledAndroidIcon />
            <span>{`Download 'SOPT' Android`}</span>
          </SiteLink>
        </LinkBox>
      </ContentLayer>
    </Container>
  );
};

export default CatchPhraseSection;

const Container = styled.div`
  position: relative;
`;

const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const StyledBackImage = styled(Icon)`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 447px;
  height: fit-content;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 180px;
  }
`;

const Shine = styled(m.div)<{ color: string }>`
  transform: translateY(10%);
  transition: background-color 1s;
  margin: 0 auto;
  border-radius: 50%;
  mix-blend-mode: soft-light;
  background-color: ${(props) => props.color};
  width: 500px;
  height: 300px;
  will-change: transform;
  filter: blur(80px);

  @media ${MOBILE_MEDIA_QUERY} {
    visibility: collapse;
  }
`;

const ContentLayer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  padding-top: 120px;
  padding-bottom: 80px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding-top: 60px;
  }
`;

const PlaygroundIconBox = styled.div`
  height: 50px;

  & > svg {
    height: 100%;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    height: 26px;
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
