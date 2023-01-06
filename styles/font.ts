import localFont from '@next/font/local';

export const myFont = localFont({
  src: [
    {
      path: '../public/fonts/SUIT-Medium.woff2',
      weight: '500',
      style: 'Medium',
    },
    {
      path: '../public/fonts/SUIT-SemiBold.woff2',
      weight: '600',
      style: 'SemiBold',
    },
    {
      path: '../public/fonts/SUIT-Bold.woff2',
      weight: '700',
      style: 'Bold',
    },
    {
      path: '../public/fonts/SUIT-ExtraBold.woff2',
      weight: '800',
      style: 'ExtraBold',
    },
  ],
  fallback: ['sans-serif'],
  display: 'swap',
  preload: true,
});
