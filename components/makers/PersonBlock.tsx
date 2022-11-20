import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface PersonBlockProps {
  name: string;
  position?: string;
  imageUrl?: string;
  link?: string;
  onClick?: () => void;
}

const PersonBlock: FC<PersonBlockProps> = ({ name, position, link, onClick, imageUrl }) => {
  const content = (
    <StyledRawPersonBlock active={link !== undefined} onClick={onClick}>
      <ImageBox>
        {imageUrl ? (
          <StyledImage src={imageUrl} alt={name} />
        ) : (
          <StyledImage src='/icons/icon-profile-fallback.svg' alt='' />
        )}
      </ImageBox>
      <ContentBox>
        <Name>{name}</Name>
        {position ? <Position>{position}</Position> : null}
      </ContentBox>
    </StyledRawPersonBlock>
  );

  if (link !== undefined) {
    return (
      <Link href={link} passHref>
        {content}
      </Link>
    );
  }

  return content;
};

export default PersonBlock;

const StyledRawPersonBlock = styled.a<{ active: boolean }>`
  display: flex;

  ${(props) =>
    props.active
      ? css`
          cursor: pointer;
        `
      : ''};
`;

const ImageBox = styled.div`
  clip-path: circle(50%);
  width: 48px;
  height: 48px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 40px;
    height: 40px;
  }
`;

const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
`;

const Name = styled.h3`
  ${textStyles.SUIT_18_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_16_M}
  }
`;

const Position = styled.p`
  width: 100%;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.gray60};

  ${textStyles.SUIT_14_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_12_M}
  }
`;
