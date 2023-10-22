import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import dayjs from 'dayjs';
import { FC } from 'react';

import { MakersLogoWhite } from '@/components/common/Banner/RecruitingBanner/icons';
import Timer from '@/components/common/Banner/Timer';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const LINK =
  'https://makers.sopt.org/recruit?utm_source=playground&utm_medium=banner&utm_campaign=recruiting&utm_id=3rd_makers';

const TARGET_DATE = dayjs('2023-08-07T14:59:00.000Z').toDate(); // 한국시간 2023-08-07 23:59

interface RecruitingBannerProps {}

const Recruiting3thBanner: FC<RecruitingBannerProps> = ({}) => {
  return (
    <a href={LINK} target='_blank'>
      <Container>
        <ContentArea>
          <Logo />
          <Title>3기 지원하러 가기</Title>
          <SubTitle>
            <span>
              <Timer targetDate={TARGET_DATE} prefix='신청 마감일까지 ' endMessage='☑️ 현재 신청이 마감되었습니다' />
            </span>
            <span>{' >'}</span>
          </SubTitle>
          <Arrow>{'>'}</Arrow>
        </ContentArea>
      </Container>
    </a>
  );
};

export default Recruiting3thBanner;

const Container = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(
    130deg,
    #875c13 0%,
    #8e4b1c 12.52%,
    #834528 27.06%,
    #664562 39.49%,
    #46557d 55.44%,
    #7895b3 70.36%,
    #856583 88.69%
  );

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: space-between;
  }
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
    grid: 'logo title arrow' auto / 109px 1fr 13px;
    margin: 12px;
  }
`;

const Title = styled.div`
  grid-area: title;
  color: ${colors.white};

  ${textStyles.SUIT_26_B}

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_20_B}
  }
`;

const SubTitle = styled.div`
  display: flex;
  grid-area: subtitle;
  justify-content: space-between;
  width: 214px;
  color: ${colors.white};

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;

const Logo = styled(MakersLogoWhite)`
  grid-area: logo;
  align-self: center;
  margin-right: 40px;
  height: 52px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-right: 20px;
    width: 89px;
    height: 24px;
  }
`;

const Arrow = styled.div`
  display: none;
  grid-area: arrow;
  color: ${colors.gray10};

  ${textStyles.SUIT_20_B}

  @media ${MOBILE_MEDIA_QUERY} {
    display: block;
    margin-right: 4px;
  }
`;
