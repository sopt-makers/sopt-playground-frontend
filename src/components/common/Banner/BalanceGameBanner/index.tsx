import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useRouter } from 'next/router';

import Responsive from '@/components/common/Responsive';
import Text from '@/components/common/Text';
import MatchMemberModal from '@/components/matchmember/MatchMemberModal';
import useModalState from '@/components/common/Modal/useModalState';
import { useMatchMemberEvent } from '@/components/matchmember/hooks/useMatchMemberEvent';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import matchMemberBannerDesktop from '@/public/icons/img/banner_balancegame_desktop.png';
import matchMemberBannerMobile from '@/public/icons/img/banner_balancegame_mobile.png';
import { playgroundLink } from 'playground-common/export';

const BalanceGameBanner = () => {
  const { canOpenModal } = useMatchMemberEvent();
  const { isOpen, onOpen, onClose } = useModalState();
  const router = useRouter();

  const handleClickBanner = () => {
    if (canOpenModal) {
      onOpen();
    } else {
      router.push(playgroundLink.memberList());
    }
  };

  return (
    <>
      <BannerContainer onClick={handleClickBanner}>
        <BannerImageWrapper>
          <Responsive only='desktop'>
            <BannerImage src={matchMemberBannerDesktop.src} alt='매칭 배너 데스크탑' />
          </Responsive>
          <Responsive only='mobile'>
            <BannerImage src={matchMemberBannerMobile.src} alt='매칭 배너 모바일' />
          </Responsive>
        </BannerImageWrapper>
      </BannerContainer>
      {canOpenModal && <MatchMemberModal isOpen={isOpen} onClose={onClose} />}
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
  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    max-width: 768px;
  }
`;

const FakeBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.gray800};
  width: 100%;
  height: 168px;
  color: ${colors.gray200};
`;

const BannerImage = styled.img`
  width: 100%;
  height: 168px;
  object-fit: cover;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    max-width: 768px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 168px;
`;

const CTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  background: ${colors.gray10};
  padding: 9px 14px;

  &:hover {
    background: ${colors.gray30};
  }
`;

const WelcomText = styled(Text)`
  text-align: center;
  line-height: 28px;
  white-space: pre-wrap;

  @media ${MOBILE_MEDIA_QUERY} {
    line-height: 24px;
    font-size: 16px;
  }
`;
