import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Button, useToast } from '@sopt-makers/ui';

import { useGetResolutionValidation } from '@/api/endpoint/resolution/getResolutionValidation';
import Modal, { ModalProps } from '@/components/common/Modal';
import { ModalContent, ModalFooter } from '@/components/common/Modal/parts';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import useImageDownload from '@/components/resolution/read/hooks/useImageDownload';
import ResolutionMessage from '@/components/resolution/read/ResolutionMessage';
import { MB_MID_MEDIA_QUERY, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { zIndex } from '@/styles/zIndex';
import { useGetResolution } from '@/api/endpoint/resolution/getResolution';
import Responsive from '@/components/common/Responsive';
import { ModalBottomSheet } from '@/components/common/BottomSheet/ModalBottomSheet';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

const ResolutionReadModal = ({ isOpen, onClose }: ModalProps) => {
  const { ref: imageRef, onClick: onDownloadButtonClick } = useImageDownload('at-sopt-다짐메시지');
  const { open } = useToast();

  const { data: { isRegistration } = {} } = useGetResolutionValidation();
  const { data: resolutionData } = useGetResolution(isRegistration ?? false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleClickDownloadButton = () => {
    onDownloadButtonClick();
    onClose();
    open({
      icon: 'success',
      content: '이미지가 저장되었어요. 친구와 공유해보세요!',
      style: {
        content: {
          whiteSpace: 'pre-wrap',
        },
      },
    });
  };

  const handleClickLucky = () => {
    try {
      queryClient.setQueryData(['getResolution'], (oldData: typeof resolutionData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          hasDrawnLuckyPick: true,
        };
      });
      sessionStorage.setItem('LUCKY_ENTRY', '1');
      router.push('/lucky').catch(() => {
        // 라우팅 실패 시 상태 롤백
        queryClient.invalidateQueries({ queryKey: ['getResolution'] });
        sessionStorage.removeItem('LUCKY_ENTRY');
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Responsive only='desktop'>
        <StyledModal isOpen={isOpen} onClose={onClose} zIndex={zIndex.헤더 + 100}>
          <StyledModalContent ref={imageRef}>
            <ResolutionMessage isMessageExist={isRegistration ?? false} />
          </StyledModalContent>
          <StyledModalFooter align='stretch'>
            <LoggingClick eventKey='saveResolutionImage'>
              <Button size='md' theme='black' onClick={handleClickDownloadButton}>
                이미지로 저장하기
              </Button>
            </LoggingClick>
            <LoggingClick eventKey='luckyTimeCapsule'>
              <Button size='md' onClick={handleClickLucky} disabled={resolutionData?.hasDrawnLuckyPick}>
                행운의 타임캡솝 뽑기
              </Button>
            </LoggingClick>
          </StyledModalFooter>
        </StyledModal>
      </Responsive>
      <Responsive only='mobile'>
        <ModalBottomSheet isOpen={isOpen ?? false} onClose={onClose}>
          <BottomSheetContent>
            <StyledModalContent ref={imageRef}>
              <ResolutionMessage isMessageExist={isRegistration ?? false} />
            </StyledModalContent>
            <StyledModalFooter align='stretch'>
              <LoggingClick eventKey='saveResolutionImage'>
                <Button size='md' theme='black' onClick={handleClickDownloadButton}>
                  이미지로 저장하기
                </Button>
              </LoggingClick>
              <LoggingClick eventKey='luckyTimeCapsule'>
                <Button
                  style={{ width: 140 }}
                  size='md'
                  onClick={handleClickLucky}
                  disabled={resolutionData?.hasDrawnLuckyPick}
                >
                  행운의 타임캡솝 뽑기
                </Button>
              </LoggingClick>
            </StyledModalFooter>
          </BottomSheetContent>
        </ModalBottomSheet>
      </Responsive>
    </>
  );
};

export default ResolutionReadModal;

const StyledModal = styled(Modal)`
  background-color: ${colors.gray900};
  padding: 48px 0 20px;
  width: 375px;
  max-height: 100vh;
  overflow-y: auto;

  @supports (height: 100dvh) {
    max-height: 100dvh;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 100%;
  }
`;

const BottomSheetContent = styled.div`
  padding: 42px 16px 20px;
  width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const StyledModalContent = styled(ModalContent)`
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 0 20px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0;
    width: 100%;
  }
`;

const StyledModalFooter = styled(ModalFooter)`
  display: flex;
  gap: 7px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 0 24px;
  width: 100%;

  button {
    flex: 1 1 0;
    height: 44px;
    font-size: 14px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0;
  }

  @media ${MB_MID_MEDIA_QUERY} {
    margin-left: 0;
  }
`;
