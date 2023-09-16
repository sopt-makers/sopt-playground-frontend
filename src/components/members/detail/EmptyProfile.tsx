import styled from '@emotion/styled';
import ProfileIcon from 'public/icons/icon-profile.svg';

import { legacyColors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export default function EmptyProfile() {
  return (
    <Container>
      <EmptyProfileImage>
        <ProfileIcon />
      </EmptyProfileImage>
      <Description>{`이 멤버는 아직 프로필을 \n등록하지 않았어요.`}</Description>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyProfileImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 120px;
  border-radius: 36px;
  background: #2c2d2e;
  width: 120px;
  height: 120px;

  & > svg {
    width: 37.19px;
    height: 44.63px;

    @media ${MOBILE_MEDIA_QUERY} {
      width: 24.8px;
      height: 29.75px;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 24px;
    width: 80px;
    height: 80px;
  }
`;

const Description = styled.div`
  margin-top: 24px;
  line-height: 30px;
  color: ${legacyColors.gray80};
  font-size: 24px;
  font-weight: 400;

  @media ${MOBILE_MEDIA_QUERY} {
    text-align: center;
    line-height: 25px;
    white-space: pre-line;
    font-size: 20px;
  }
`;
