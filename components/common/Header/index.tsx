import { FC } from 'react';

import { useGetMemberOfMe } from '@/api';
import useAuth from '@/components/auth/useAuth';
import DesktopHeader from '@/components/common/Header/desktop/DesktopHeader';
import MobileHeader from '@/components/common/Header/mobile/MobileHeader';
import useMediaQuery from '@/hooks/useMediaQuery';
import { MOBILE_MAX_WIDTH } from '@/styles/mediaQuery';

const Header: FC = () => {
  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);
  const { logout } = useAuth();

  const { data: me } = useGetMemberOfMe();

  const user = me ? { id: `${me.id}`, image: me.profileImage ?? undefined, name: me.name } : null;

  return isMobile ? <MobileHeader user={user} onLogout={logout} /> : <DesktopHeader user={user} onLogout={logout} />;
};

export default Header;
