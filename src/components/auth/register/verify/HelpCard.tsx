import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC } from 'react';

import IconArrowRight from '@/public/icons/icon-arrow-right.svg';
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
        <IconArrowRight />
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
  border-radius: 6px;
  background-color: ${colors.gray700};
  cursor: pointer;
  padding: 19px 15px 18px;

  &:hover {
    background-color: ${colors.gray600};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }

  ${(props) =>
    props.highlight
      ? css`
          animation: 1.5s ease-out infinite alternate both running glow;

          @keyframes glow {
            0% {
              box-shadow: 0 0 6px 1px rgb(60 61 64 / 20%);
            }

            100% {
              box-shadow: 0 0 6px 1px rgb(60 61 64 / 100%);
            }
          }
        `
      : ''}
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
`;
