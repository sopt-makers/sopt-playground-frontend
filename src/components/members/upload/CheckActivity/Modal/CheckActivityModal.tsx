import CheckModal from '@/components/members/upload/CheckActivity/Modal/CheckModal';
import CheckPopup from '@/components/members/upload/CheckActivity/Modal/CheckPopup';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { useEffect, useState } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import { MOBILE_MAX_WIDTH } from '@/styles/mediaQuery';

function CheckActivity() {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(true);
  const [isMount, setIsMount] = useState(false);
  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);

  const handleClose = () => {
    setModalOpen(false);
  };

  const moveToCheck = () => {
    router.push({
      pathname: playgroundLink.memberCheckSoptActivity(),
      query: { ob: true },
    });
  };

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount) return <></>;

  return (
    <>
      {!isMobile ? (
        <CheckPopup isOpen={isModalOpen} onClose={handleClose} moveToCheck={moveToCheck} />
      ) : (
        <CheckModal isOpen={isModalOpen} onClose={handleClose} moveToCheck={moveToCheck} />
      )}
    </>
  );
}

export default CheckActivity;
