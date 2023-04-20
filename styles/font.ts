import localFont from 'next/font/local';

export const SUIT = localFont({
  src: [
    {
      path: '../public/fonts/SUIT-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/SUIT-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/SUIT-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/SUIT-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
});
