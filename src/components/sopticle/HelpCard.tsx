import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface HelpCardProps {
  className?: string;
  href?: string;
  title: string;
  content: string;
  highlight?: boolean;
}

const HelpCard: FC<HelpCardProps> = ({ className, href, title, content, highlight }) => {
  return (
    <StyledHelpCard className={className} href={href} target='_blank' highlight={highlight}>
      <Title>
        <div className='question'>{title}</div>
        {goOutSvg}
      </Title>
      <Content>{content}</Content>
    </StyledHelpCard>
  );
};

export default HelpCard;

const StyledHelpCard = styled.a<{ highlight?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: background-color 0.3s, box-shadow 0.3s;
  margin-top: 35px;
  border-radius: 10px;
  background-color: ${colors.gray700};
  cursor: pointer;
  padding: 19px 15px 18px;
  animation: 1.5s ease-out infinite alternate both running glow;

  &:hover {
    background-color: ${colors.gray600};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }

  @keyframes glow {
    0% {
      box-shadow: 0 0 6px 1px rgb(60 61 64 / 20%);
    }

    100% {
      box-shadow: 0 0 6px 1px rgb(60 61 64 / 100%);
    }
  }
`;

const Content = styled.div`
  line-height: 140%;
  white-space: pre-line;
  color: ${colors.gray300};

  ${textStyles.SUIT_14_M}
`;

const Title = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;

  ${textStyles.SUIT_14_M}

  & > svg {
    width: 16px;
    height: 16px;
  }
`;

const goOutSvg = (
  <svg width='1em' height='1em' viewBox='0 0 17 16' fill='none'>
    <path
      d='M13.25 3.502a.526.526 0 00-.08-.103.532.532 0 00-.388-.155H5.238a.533.533 0 000 1.067h6.268l-7.534 7.534a.533.533 0 10.754.754l7.535-7.534v6.268a.533.533 0 101.066 0V3.778c0-.101-.028-.195-.076-.276z'
      fill='#FCFCFC'
    />
  </svg>
);
