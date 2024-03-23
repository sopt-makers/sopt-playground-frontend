import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import Link from 'next/link';
import { playgroundLink } from 'playground-common/export';
import ProfileIcon from 'public/icons/icon-profile.svg';

import Button from '@/components/common/Button';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

export default function EmptyProfile() {
  return (
    <Container>
      <EmptyProfileImage>
        <ProfileIcon />
      </EmptyProfileImage>
      <Description>{`이 멤버는 아직 프로필을 \n등록하지 않았어요.`}</Description>
      <Link href={playgroundLink.memberUpload()}>
        <Button variant='primary'>프로필 등록하기</Button>
      </Link>
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
  margin: 24px 0;
  line-height: 30px;
  color: ${colors.gray400};
  font-size: 24px;
  font-weight: 400;

  @media ${MOBILE_MEDIA_QUERY} {
    text-align: center;
    line-height: 25px;
    white-space: pre-line;
    font-size: 20px;
  }
`;
