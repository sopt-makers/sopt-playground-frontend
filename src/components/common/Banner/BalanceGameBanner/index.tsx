import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { MB_BASE_MEDIA_QUERY } from '@/styles/mediaQuery';
import matchMemberBannerDesktop from '@/public/icons/img/banner_balancegame_desktop.png';
import matchMemberBannerMobile from '@/public/icons/img/banner_balancegame_mobile.png';
import { playgroundLink } from 'playground-common/export';

const BalanceGameBanner = () => {
  const router = useRouter();

  return (
    <>
      <BannerContainer onClick={() => router.push(playgroundLink.memberList())}>
        <BannerImageWrapper>
          <picture>
            <source media={MB_BASE_MEDIA_QUERY} srcSet={matchMemberBannerMobile.src} />
            <BannerImage src={matchMemberBannerDesktop.src} alt='매칭 배너' />
          </picture>
        </BannerImageWrapper>
      </BannerContainer>
    </>
  );
};

export default BalanceGameBanner;

const BannerContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  width: 100%;
  min-height: 168px;
  overflow: hidden;
`;

const BannerImageWrapper = styled.div`
  @media ${MB_BASE_MEDIA_QUERY} {
    width: 100%;
    height: auto;
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: 168px;
  object-fit: cover;

  @media ${MB_BASE_MEDIA_QUERY} {
    width: 100%;
    height: auto;
  }
`;
