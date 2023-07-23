import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { FC } from 'react';

import { MakersLogoDark, OwnershipShape, ZigzagShape } from '@/components/common/Banner/RecruitingBanner/icons';
import Timer from '@/components/common/Banner/Timer';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const LINK =
  'https://docs.google.com/forms/d/e/1FAIpQLSch_qyaKaef03DnU4WeFuc0G-XkHdnsiEv7BD6LSDG39MA9Hw/viewform?usp=sf_link';

const TARGET_DATE = dayjs('2023-07-28T14:59:00.000Z').toDate(); // 한국시간 2023-07-28 23:59

interface RecruitingBannerProps {}

const RecruitingBanner: FC<RecruitingBannerProps> = ({}) => {
  return (
    <a href={LINK} target='_blank'>
      <Container>
        <ShapesArea>
          <ZigzagShape />
          <ZigzagShape />
          <ZigzagShape />
          <StyledOwnershipShape />
        </ShapesArea>
        <ContentArea>
          <Logo />
          <Title>3기 모집설명회 신청</Title>
          <SubTitle>
            <span>
              <Timer targetDate={TARGET_DATE} prefix='신청 마감일까지 ' endMessage='☑️ 현재 신청이 마감되었습니다' />
            </span>
            <span>{' >'}</span>
          </SubTitle>
        </ContentArea>
        <Arrow>{'>'}</Arrow>
      </Container>
    </a>
  );
};

export default RecruitingBanner;

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #ff6e1d;

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: space-between;
  }
`;

const ShapesArea = styled.div`
  display: flex;
  gap: 3px;
  margin: 10px;

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const StyledOwnershipShape = styled(OwnershipShape)`
  margin-left: 7px;
`;

const ContentArea = styled.div`
  display: grid;
  flex-grow: 1;
  grid:
    'a logo title b' auto
    'a logo subtitle b' auto / 1fr auto auto 1.3fr;
  row-gap: 10px;
  margin: 22px 0;

  @media ${MOBILE_MEDIA_QUERY} {
    grid: 'logo title arrow' auto / auto 1fr auto;
    margin: 12px;
  }
`;

const Title = styled.div`
  grid-area: title;
  color: ${colors.black100};

  ${textStyles.SUIT_26_B}

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_20_B}
  }
`;

const SubTitle = styled.div`
  grid-area: subtitle;
  color: ${colors.black80};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const Logo = styled(MakersLogoDark)`
  grid-area: logo;
  align-self: center;
  margin-right: 40px;
  height: 52px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-right: 20px;
    height: 24px;
  }
`;

const Arrow = styled.div`
  display: none;
  grid-area: arrow;
  color: ${colors.black100};

  ${textStyles.SUIT_20_B}

  @media ${MOBILE_MEDIA_QUERY} {
    display: block;
    margin-right: 16px;
  }
`;
