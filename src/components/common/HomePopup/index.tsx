import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { useEffect, useState } from 'react';

import Responsive from '@/components/common/Responsive';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import { LoggingImpression } from '@/components/eventLogger/components/LoggingImpression';
import PlaygroundGuideModal from '@/components/resolution/submit/PlaygroundGuideModal';
import TimecapsopSubmitModal from '@/components/resolution/submit/TimecapsopSubmitModal';
import { useOpenResolutionModal } from '@/components/resolution/submit/useOpenResolutionModal';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import ResolutionReadModal from '@/components/resolution/read/ResolutionReadModal';
import useModalState from '@/components/common/Modal/useModalState';
const getKoreanDate = (): string => {
  const koreanTime = new Date();

  // const offset = 9 * 60;
  // const koreanTime = new Date(now.getTime() + offset * 60 * 1000);
  return `${koreanTime.getFullYear()}-${String(koreanTime.getMonth() + 1).padStart(2, '0')}-${String(
    koreanTime.getDate(),
  ).padStart(2, '0')}`;
};

export const HomePopup = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const today = getKoreanDate();

  // 타임캡솝 저장 여부 기록을 위한 코드
  const [isAlreadyRegistration, setIsAlreadyRegistration] = useState(true);
  const onNewRegistration = () => {
    setIsAlreadyRegistration(false);
  };

  const {
    isOpenResolutionModal,
    onCloseResolutionModal,
    handleResolutionModalOpen,
    name,
    isOpenPlaygroundGuideModal,
    onOpenPlaygroundGuideModal,
    onClosePlaygroundGuideModal,
  } = useOpenResolutionModal();

  useEffect(() => {
    const storedDate = localStorage.getItem('popupClosedDate');

    if (storedDate !== today) {
      setPopupVisible(true);
    }
  }, [today]);

  useEffect(() => {
    if (isPopupVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isPopupVisible]);

  const handleCloseForToday = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const today = getKoreanDate();
    localStorage.setItem('popupClosedDate', today);
    setPopupVisible(false);
  };

  const handleClosePopup = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setPopupVisible(false);
    await Promise.resolve();
  };

  // 타입캡솝 모달 띄우기
  const handleOpenModal = async () => {
    await handleClosePopup();
    onOpenResolutionModal();
  };
  const handleSubmitOpenModal = async () => {
    await handleClosePopup();
    handleResolutionModalOpen();
  };
  const {
    isOpen: isOpenReadResolutionModal,
    onClose: onCloseReadResolutionModal,
    onOpen: onOpenResolutionModal,
  } = useModalState();

  return (
    <>
      {isPopupVisible && (
        <StBackground>
          <LoggingImpression eventKey='adPopup'>
            <StPopupModal>
              <Responsive only='desktop'>
                <LoggingClick eventKey='adPopupBody'>
                  <button onClick={handleOpenModal}>
                    {/* <a href='https://playground.sopt.org/feed/547' target='blank'> */}
                    <StImage src='/icons/img/popup/PC.png' />
                    {/* </a> */}
                  </button>
                </LoggingClick>
              </Responsive>
              <Responsive only='mobile'>
                <LoggingClick eventKey='adPopupBody'>
                  <button onClick={handleOpenModal}>
                    {/* <a href='https://playground.sopt.org/feed/547' target='blank'> */}
                    <StImage src='/icons/img/popup/MO.png' />
                    {/* </a> */}
                  </button>
                </LoggingClick>
              </Responsive>
              <StModalFooter>
                <LoggingClick eventKey='hideAdPopupToday'>
                  <StFooterLeftButton onClick={handleSubmitOpenModal}>오늘 하루 그만보기</StFooterLeftButton>
                </LoggingClick>
                <LoggingClick eventKey='adPopupClose'>
                  <StFooterRightButton onClick={handleClosePopup}>닫기</StFooterRightButton>
                </LoggingClick>
              </StModalFooter>
            </StPopupModal>
          </LoggingImpression>
        </StBackground>
      )}

      <ResolutionReadModal isOpen={isOpenReadResolutionModal} onClose={onCloseReadResolutionModal} />

      {/* 신입 기수 들어올 때 타임캡솝 이동 및 플그 가이드 모달 띄우기 */}
      <TimecapsopSubmitModal
        onClose={onCloseResolutionModal}
        userName={name ?? '나'}
        onSuccess={() => {
          onNewRegistration();
          onOpenPlaygroundGuideModal();
        }}
        isOpen={isOpenResolutionModal}
      />
      {/* <PlaygroundGuideModal
        isAlreadyRegistration={isAlreadyRegistration}
        onClose={onClosePlaygroundGuideModal}
        isOpen={isOpenPlaygroundGuideModal}
      /> */}
    </>
  );
};

const StBackground = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  z-index: 201;
  background-color: rgb(23 24 28 / 80%);
  padding-top: 0;
  padding-bottom: 80px;
  width: 100%;
  height: 100%;
  @media ${MOBILE_MEDIA_QUERY} {
    padding-bottom: 100px;
  }
`;
const StPopupModal = styled.div`
  display: flex;
  flex-direction: column;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${colors.gray900};
  width: 422px;
  height: 560px;

  @media ${MOBILE_MEDIA_QUERY} {
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    width: 295px;
    height: 382px;
  }
`;
const StImage = styled.img`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  cursor: pointer;
  width: 100%;
  height: 500px;
  @media ${MOBILE_MEDIA_QUERY} {
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    height: 334px;
  }
`;

const StModalFooter = styled.footer`
  display: flex;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: ${colors.white};
  width: 100%;
  height: 60px;

  @media ${MOBILE_MEDIA_QUERY} {
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
    height: 48px;
  }
`;
const StFooterLeftButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 2px solid rgb(195 195 198);
  width: 243px;
  color: ${colors.black};
  font: ${fonts.LABEL_18_SB};
  font-weight: 600;
  @media ${MOBILE_MEDIA_QUERY} {
    width: 170px;
    ${fonts.LABEL_14_SB};
  }
`;

const StFooterRightButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 179px;
  color: ${colors.black};
  font: ${fonts.LABEL_18_SB};
  font-weight: 600;
  @media ${MOBILE_MEDIA_QUERY} {
    width: 125px;
    ${fonts.LABEL_14_SB};
  }
`;
