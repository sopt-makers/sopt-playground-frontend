import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import useAuth from '@/components/auth/useAuth';
import DesktopHeader from '@/components/common/Header/desktop/DesktopHeader';
import MobileHeader from '@/components/common/Header/mobile/MobileHeader';
import { LinkRenderer } from '@/components/common/Header/types';
import Responsive from '@/components/common/Responsive';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { playgroundLink } from '@/constants/links';

const Header: FC = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const { logClickEvent } = useEventLogger();

  const { data: me } = useGetMemberOfMe();

  const user = me ? { id: `${me.id}`, image: me.profileImage ?? undefined, name: me.name } : null;

  const renderLink: LinkRenderer = ({ href, children }) => {
    if (href === playgroundLink.groupList()) {
      return <a href={href}>{children}</a>;
    }
    if (me && href.includes(playgroundLink.memberDetail(`${me.id}`))) {
      return (
        <Link href={href} onClick={() => logClickEvent('myProfile')}>
          {children}
        </Link>
      );
    }
    if (href === playgroundLink.blog()) {
      return (
        <Link href={href} onClick={() => logClickEvent('reviewUpload')}>
          {children}
        </Link>
      );
    }
    return <Link href={href}>{children}</Link>;
  };
  const activePathMatcher = (path: string) => router.pathname?.startsWith(path);

  return (
    <>
      <Responsive only='mobile'>
        <MobileHeader user={user} onLogout={logout} renderLink={renderLink} activePathMatcher={activePathMatcher} />
      </Responsive>
      <Responsive only='desktop'>
        <DesktopHeader user={user} onLogout={logout} renderLink={renderLink} activePathMatcher={activePathMatcher} />
      </Responsive>
    </>
  );
};

export default Header;
