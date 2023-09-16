import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';

import SoulmateIcon from '@/components/soulmate/icons/SoulmateIcon';
import { legacyColors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface EntryCardProps {
  entryUrl: string;
  hints?: string[];
}

const EntryCard: FC<EntryCardProps> = ({ entryUrl, hints }) => {
  return (
    <StyledEntryCard>
      <ImageArea>
        <SoulmateIcon />
      </ImageArea>
      <TitleArea>
        너와 나 궁합
        <br />
        어쩌면 99%일지도?
      </TitleArea>
      <EntryLink href={entryUrl}>소울메이트 신청하러 가기 {goIcon}</EntryLink>
      <HintArea>
        {hints && (
          <>
            <HintChip>소울메이트의 힌트가 공개되었어요!</HintChip>
            <HintDetails>
              {hints.map((hint, idx) => (
                <HintChip key={idx}>{hint}</HintChip>
              ))}
            </HintDetails>
          </>
        )}
      </HintArea>
    </StyledEntryCard>
  );
};

export default EntryCard;

const StyledEntryCard = styled.div`
  display: grid;
  grid:
    [row1-start] 'icon hint' auto [row1-end]
    [row2-start] 'title hint' auto [row2-end]
    [row3-start] 'entry hint' auto [row3-end]
    / auto auto;
  justify-content: space-between;
  border-radius: 16px;
  background-color: ${legacyColors.black90};
  padding: 45px;

  @media ${MOBILE_MEDIA_QUERY} {
    grid:
      [row1-start] 'icon title' auto [row1-end]
      [row2-start] 'hint hint' auto [row2-end]
      [row3-start] 'entry entry' auto [row3-end]
      / auto 1fr;
    background-color: inherit;
    padding: 16px 20px;
  }
`;

const ImageArea = styled.div`
  display: flex;
  grid-area: icon;
  justify-self: flex-start;
  height: 50px;

  & > img {
    height: 100%;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    align-self: center;
    height: 40px;
  }
`;

const TitleArea = styled.div`
  grid-area: title;
  margin-top: 8px;
  line-height: 30px;
  letter-spacing: -0.24px;

  ${textStyles.SUIT_24_B};

  @media ${MOBILE_MEDIA_QUERY} {
    justify-self: flex-start;
    margin-top: 0;
    margin-left: 4px;

    ${textStyles.SUIT_20_B};
  }
`;

const EntryLink = styled(Link)`
  display: flex;
  grid-area: entry;
  align-items: center;
  margin-top: 16px;
  padding: 5px 0;
  line-height: 100%;
  letter-spacing: -0.16px;

  ${textStyles.SUIT_16_SB};

  & > svg {
    margin-left: 9px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    border-radius: 12px;
    background-color: ${legacyColors.black90};
    padding: 13px 12px;
    line-height: 100%;
    letter-spacing: -0.16px;

    ${textStyles.SUIT_12_SB};

    & > svg {
      height: 6px;
    }
  }
`;

const HintArea = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: hint;
  gap: 12px;
  align-items: flex-end;
  align-self: center;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 16px;
  }
`;

const HintChip = styled.div`
  border-radius: 8px;
  background-color: ${legacyColors.black60};
  padding: 12px 20px;
  line-height: 120%;
  letter-spacing: -0.16px;

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 6px;
    padding: 10px 16px;

    ${textStyles.SUIT_12_M};
  }
`;

const HintDetails = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

const goIcon = (
  <svg width='7' height='13' viewBox='0 0 7 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M1 1.66797L6 6.66797L1 11.668'
      stroke='#FCFCFC'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
