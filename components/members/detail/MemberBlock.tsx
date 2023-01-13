import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { FC, useState } from 'react';

import ResizedImage from '@/components/common/ResizedImage';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberBlockProps {
  name: string;
  position?: string;
  imageUrl?: string;
  link?: string;
  onClick?: () => void;
  badges?: string[];
}

const MemberBlock: FC<MemberBlockProps> = ({ name, position, link, onClick, imageUrl, badges = [] }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const content = (
    <StyledRawPersonBlock active={link !== undefined} onClick={onClick}>
      <ImageBox>
        <StyledImage
          src='/icons/icon-profile-fallback.svg'
          alt=''
          loading='lazy'
          decoding='async'
          hide={isImageLoaded}
        />
        {imageUrl && (
          <StyledResizedImage
            src={imageUrl}
            alt=''
            onLoad={() => setIsImageLoaded(true)}
            hide={!isImageLoaded}
            width={48}
          />
        )}
      </ImageBox>
      <ContentBox>
        <Name>
          {name}
          {position && <Po>{` ∙ ${position}`}</Po>}
        </Name>
        <BadgeContainer>
          {badges.map((badge, idx) => (
            <Badge key={idx}>{badge}</Badge>
          ))}
        </BadgeContainer>
      </ContentBox>
    </StyledRawPersonBlock>
  );

  if (link !== undefined) {
    return (
      <Link href={link} passHref legacyBehavior>
        {content}
      </Link>
    );
  }

  return content;
};

export default MemberBlock;

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
  position: relative;
  width: 58px;
  height: 58px;
  clip-path: circle(50%);

  @media ${MOBILE_MEDIA_QUERY} {
    width: 40px;
    height: 40px;
  }
`;

const StyledImage = styled.img<{ hide?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${(props) =>
    props.hide
      ? css`
          visibility: hidden;
        `
      : ''};
`;

const StyledResizedImage = styled(ResizedImage)<{ hide?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${(props) =>
    props.hide
      ? css`
          visibility: hidden;
        `
      : ''};
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
`;

const Name = styled.h3`
  width: 100%;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${textStyles.SUIT_18_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_16_M}
  }
`;

const Po = styled.span`
  color: ${colors.gray40};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M};
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  margin-top: 6px;
`;

const Badge = styled.div`
  margin-right: 4px;
  border-radius: 3px;
  background-color: ${colors.black60};
  padding: 2px 6px;
  color: ${colors.gray20};

  ${textStyles.SUIT_14_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_12_M};
  }
`;
