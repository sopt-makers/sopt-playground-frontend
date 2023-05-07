import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { FC } from 'react';

import Timer from '@/components/common/Banner/Timer';
import Responsive from '@/components/common/Responsive';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface SOPTMATEBannerProps {}

const LINK = 'GOOGLE_FORM_LINK';
const TARGET_DATE = dayjs('2023-05-11T15:00:00.000Z').toDate(); // 한국시간 2023-05-12 00:00

const SOPTMATEBanner: FC<SOPTMATEBannerProps> = ({}) => {
  return (
    <Container href={LINK} target='_blank'>
      <Responsive only='desktop'>
        <DesktopFrame>
          <Title>
            <span>🏃 솝커톤 SOPTMATE 모집 - </span>
            <span>YB들에게 도움을 줄 수 있는 명예회원분들을 찾고 있습니다️</span>
          </Title>
          <SubTitle>
            <Timer targetDate={TARGET_DATE} prefix='멘토 모집 마감까지 ' endMessage='☑️ 현재 모집이 마감되었습니다' />
          </SubTitle>
        </DesktopFrame>
      </Responsive>
      <Responsive only='mobile'>
        <MobileFrame>
          <Title>🏃 솝커톤 SOPTMATE 모집</Title>
          <Title>{'>'}</Title>
        </MobileFrame>
      </Responsive>
    </Container>
  );
};

export default SOPTMATEBanner;

const Container = styled.a`
  display: block;
  background: linear-gradient(105.53deg, #000 -7.46%, #8f00ff 37.12%, #00ffd1 157.8%), #000;
`;

const Title = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

  ${textStyles.SUIT_26_B}

  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: space-between;
    margin-bottom: 0;

    ${textStyles.SUIT_20_B}
  }
`;

const SubTitle = styled.div`
  white-space: pre-wrap;

  ${textStyles.SUIT_16_M}
`;

const DesktopFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 26px 0 20px;
`;

const MobileFrame = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 16px;
`;
