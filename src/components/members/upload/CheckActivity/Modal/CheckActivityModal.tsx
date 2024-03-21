import Responsive from '@/components/common/Responsive';
import CheckModal from '@/components/members/upload/CheckActivity/Modal/CheckModal';
import CheckPopup from '@/components/members/upload/CheckActivity/Modal/CheckPopup';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { useState } from 'react';

function CheckActivity() {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(true);

  const handleClose = () => {
    setModalOpen(false);
  };

  const moveToCheck = () => {
    router.push(playgroundLink.memberCheckSoptActivity());
  };

  return (
    <>
      <Responsive only='desktop'>
        <CheckPopup isOpen={isModalOpen} onClose={handleClose} moveToCheck={moveToCheck} />
      </Responsive>
      <Responsive only='mobile'>
        <CheckModal isOpen={isModalOpen} onClose={handleClose} moveToCheck={moveToCheck} />
      </Responsive>
    </>
  );
}

export default CheckActivity;
