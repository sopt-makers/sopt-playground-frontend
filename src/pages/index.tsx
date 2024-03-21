import type { NextPage } from 'next';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import AuthRequired from '@/components/auth/AuthRequired';
import useModalState from '@/components/common/Modal/useModalState';
import FeedHomePage from '@/components/feed/page/FeedHomePage';
import ResolutionModal from '@/components/resolution/ResolutionModal';
import { setLayout } from '@/utils/layout';

const Home: NextPage = () => {
  const {
    isOpen: isOpenResolutionModal,
    onOpen: onOpenResolutionModal,
    onClose: onCloseResolutionModal,
  } = useModalState();

  // 서버에 resolution GET 요청시 프로필이미지링크 주도록 요청함. 추후 변경 필요
  const { data: me } = useGetMemberOfMe();

  return (
    <AuthRequired>
      {/* 이 부분은 테스트코드로, 환영배너 컴포넌트로 옮겨질 예정 */}
      <button onClick={onOpenResolutionModal}>모달테스트</button>
      {isOpenResolutionModal && (
        <ResolutionModal
          profileImageUrl={me && me.profileImage ? me.profileImage : ''}
          onClose={onCloseResolutionModal}
        />
      )}
      <FeedHomePage />
    </AuthRequired>
  );
};

setLayout(Home, 'header');

export default Home;
