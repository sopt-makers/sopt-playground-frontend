import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { useGetMemberOfMe } from '@/apiHooks';
import useAuth from '@/components/auth/useAuth';
import DesktopHeader from '@/components/common/Header/desktop/DesktopHeader';
import MobileHeader from '@/components/common/Header/mobile/MobileHeader';
import { LinkRenderer } from '@/components/common/Header/types';
import { playgroundLink } from '@/constants/links';
import useMediaQuery from '@/hooks/useMediaQuery';
import { MOBILE_MAX_WIDTH } from '@/styles/mediaQuery';

const Header: FC = () => {
  const isMobile = useMediaQuery(MOBILE_MAX_WIDTH);
  const router = useRouter();
  const { logout } = useAuth();

  const { data: me } = useGetMemberOfMe();

  const user = me ? { id: `${me.id}`, image: me.profileImage ?? undefined, name: me.name } : null;

  const renderLink: LinkRenderer = ({ href, children }) => {
    if (href === playgroundLink.groupList()) {
      return <a href={href}>{children}</a>;
    }
    return <Link href={href}>{children}</Link>;
  };

  return isMobile ? (
    <MobileHeader user={user} onLogout={logout} />
  ) : (
    <DesktopHeader
      user={user}
      onLogout={logout}
      renderLink={renderLink}
      activePathMatcher={(path) => router.pathname?.startsWith(path)}
    />
  );
};

export default Header;
