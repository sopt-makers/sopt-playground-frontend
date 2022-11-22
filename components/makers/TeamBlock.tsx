import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';

import IconLinkOutgoing from '@/public/icons/icon-link-outgoing.svg';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface TeamBlockProps {
  title: string;
  description?: string;
  link?: string;
  children: ReactNode;
  className?: string;
}

const TeamBlock: FC<TeamBlockProps> = ({ title, description, link, children, className }) => {
  return (
    <StyledTeamBlock className={className}>
      <TitleBox href={link} target='_blank'>
        {title}
        {link && <StyledLinkIcon />}
      </TitleBox>
      {description && <Description>{description}</Description>}
      <ChildrenBox>{children}</ChildrenBox>
    </StyledTeamBlock>
  );
};

export default TeamBlock;

const StyledTeamBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleBox = styled.a`
  ${textStyles.SUIT_24_B};

  display: flex;
  align-items: center;
  align-self: flex-start;
  transition: border-bottom 0.2s;
  border-bottom: 1px dashed transparent;

  ${(props) =>
    props.href
      ? css`
          &:hover {
            border-bottom: 1px dashed gray;
          }
        `
      : ''}
`;

const Description = styled.p`
  margin-top: 4px;
  color: ${colors.gray60};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M}
  }
`;

const ChildrenBox = styled.div`
  margin-top: 24px;
`;

const StyledLinkIcon = styled(IconLinkOutgoing)`
  margin-left: 8px;
  width: 24px;
  height: 24px;
`;
