import styled from '@emotion/styled';
import { FC } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import { useGetMemberOfMe } from '@/apiHooks';
import useAuth from '@/components/auth/useAuth';
import DesktopHeader from '@/components/common/Header/desktop/DesktopHeader';
import MobileHeader from '@/components/common/Header/mobile/MobileHeader';
import useMediaQuery from '@/hooks/useMediaQuery';
import { MOBILE_MAX_WIDTH } from '@/styles/mediaQuery';

const ProperHeader: FC = () => {
  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);
  const { logout } = useAuth();

  const { data: me } = useGetMemberOfMe();

  const user = me ? { id: `${me.id}`, image: me.profileImage ?? undefined, name: me.name } : null;

  return (
    <FixedSlot className={RemoveScroll.classNames.zeroRight}>
      {isMobile ? <MobileHeader user={user} onLogout={logout} /> : <DesktopHeader user={user} onLogout={logout} />}
    </FixedSlot>
  );
};

export default ProperHeader;

const FixedSlot = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
`;
