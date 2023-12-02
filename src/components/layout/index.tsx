import EmptyLayout from '@/components/layout/EmptyLayout';
import FullScreenLayout from '@/components/layout/FullScreenLayout';
import HeaderFooterLayout from '@/components/layout/HeaderFooterLayout';
import HeaderLayout from '@/components/layout/HeaderLayout';
import HeaderOnlyDesktopLayout from '@/components/layout/HeaderOnlyDesktopLayout';

export const preDefinedLayouts = {
  header: HeaderLayout,
  empty: EmptyLayout,
  headerFooter: HeaderFooterLayout,
  headerOnlyDesktop: HeaderOnlyDesktopLayout,
  fullScreen: FullScreenLayout,
};
