import { colors } from '@sopt-makers/colors';
import type { NextPage } from 'next';

import { useGetResolutionValidation } from '@/api/endpoint/resolution/getResolutionValidation';
import AuthRequired from '@/components/auth/AuthRequired';
import ActiveBannerSlot from '@/components/common/Banner/ActiveBannerSlot';
import useAlert from '@/components/common/Modal/useAlert';
import useModalState from '@/components/common/Modal/useModalState';
import FeedHomePage from '@/components/feed/page/FeedHomePage';
import ResolutionModal from '@/components/resolution/ResolutionModal';
import { zIndex } from '@/styles/zIndex';
import { setLayout } from '@/utils/layout';

const Home: NextPage = () => {
  const {
    isOpen: isOpenResolutionModal,
    onOpen: onOpenResolutionModal,
    onClose: onCloseResolutionModal,
  } = useModalState();

  const { alert } = useAlert();
  const { data: { memberProfileImgUrl, isRegistration } = {} } = useGetResolutionValidation();

  const handleModalOpen = () => {
    if (isRegistration) {
      alert({
        title: '편지는 한번만 전송할 수 있어요',
        description: '전송된 편지는 종무식 때 열어볼 수 있어요!',
        buttonText: '확인',
        maxWidth: 400,
        zIndex: zIndex.헤더,
        buttonColor: colors.white,
        buttonTextColor: colors.black,
        hideCloseButton: true,
      });
    } else {
      onOpenResolutionModal();
    }
  };

  return (
    <AuthRequired>
      {/* 이 부분은 테스트코드로, 환영배너 컴포넌트로 옮겨질 예정 */}
      <button onClick={handleModalOpen}>모달테스트</button>
      {isOpenResolutionModal && (
        <ResolutionModal profileImageUrl={memberProfileImgUrl ?? ''} onClose={onCloseResolutionModal} />
      )}
      <ActiveBannerSlot />
      <FeedHomePage />
    </AuthRequired>
  );
};

setLayout(Home, 'header');

export default Home;
