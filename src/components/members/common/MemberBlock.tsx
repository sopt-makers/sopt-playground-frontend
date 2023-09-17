import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FC, useState } from 'react';

import ResizedImage from '@/components/common/ResizedImage';
import { colors } from '@sopt-makers/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MemberBlockProps {
  name: string;
  position?: string;
  imageUrl?: string;
  clickable?: boolean;
  onClick?: () => void;
  badges?: string[];
  as?: keyof JSX.IntrinsicElements;
}

const MemberBlock: FC<MemberBlockProps> = ({
  name,
  position,
  onClick,
  imageUrl,
  badges = [],
  as = 'div',
  clickable = false,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <StyledRawPersonBlock as={as} clickable={clickable} onClick={onClick}>
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
            width={58}
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
};

export default MemberBlock;

const StyledRawPersonBlock = styled.a<{ clickable: boolean }>`
  display: flex;

  ${(props) =>
    props.clickable
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

  /* 
  /  Fallback 이미지 준비되면 적용하기
  clip-path: inset(0% 0% 0% 0% round 35%); 
  */

  @media ${MOBILE_MEDIA_QUERY} {
    width: 52px;
    height: 52px;
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
  flex-wrap: wrap;
  margin-top: 6px;
`;

const Badge = styled.div`
  margin-right: 4px;
  border-radius: 3px;
  background-color: ${colors.black40};
  padding: 2px 6px;
  color: ${colors.gray20};

  ${textStyles.SUIT_14_M};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_12_M};
  }
`;
