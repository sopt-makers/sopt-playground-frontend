import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { m, useInView } from 'framer-motion';
import { FC, ReactNode, useRef } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface ValueDescriptionProps {
  subTitle: ReactNode;
  description: ReactNode;
  color: string;
}

const ValueDescription: FC<ValueDescriptionProps> = ({ subTitle, description, color }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: '-20%' });

  return (
    <Container ref={containerRef}>
      <Line color={color} animate={{ opacity: inView ? 1 : 0 }} />
      <SubTitle color={color}>{subTitle}</SubTitle>
      <Description>{description}</Description>
    </Container>
  );
};

export default ValueDescription;

const Container = styled.div`
  display: grid;
  grid:
    'line subtitle' auto
    'line description' auto
    / 30px 1fr;
  margin-bottom: 40px;

  @media ${MOBILE_MEDIA_QUERY} {
    grid:
      'line subtitle' auto
      'line description' auto
      / 13px 1fr;
    margin-bottom: 20px;
  }
`;

const Line = styled(m.div)`
  grid-area: line;
  background: ${(props) => props.color};
  background: linear-gradient(
    0deg,
    ${(props) => props.color}00 0%,
    ${(props) => props.color} 50%,
    ${(props) => props.color}00 100%
  );
  width: 2px;
  height: 100%;
`;

const SubTitle = styled(m.div)`
  grid-area: subtitle;
  align-self: end;
  margin-top: 30px;
  color: ${(props) => props.color};

  ${textStyles.SUIT_18_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 0;

    ${textStyles.SUIT_12_SB};
  }
`;

const Description = styled.div`
  grid-area: description;
  margin-top: 10px;
  margin-bottom: 20px;
  white-space: pre-wrap;

  ${textStyles.SUIT_40_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 8px;
    margin-bottom: 0;

    ${textStyles.SUIT_16_SB};
  }
`;
