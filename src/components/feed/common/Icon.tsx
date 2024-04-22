import { colors } from '@sopt-makers/colors';
import { HTMLAttributes } from 'react';

export interface IconProps extends HTMLAttributes<SVGElement> {
  size?: number;
  color?: string;
  fill?: string;
}

export const IconMoreHoriz = ({ size = 20, color = colors.gray400, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    color={color}
    {...props}
  >
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M5.75 11.25C6.43788 11.25 7 10.6879 7 10C7 9.31212 6.43788 8.75 5.75 8.75C5.06212 8.75 4.5 9.31212 4.5 10C4.5 10.6879 5.06212 11.25 5.75 11.25Z'
      fill='currentColor'
    />
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M9.99967 11.25C10.6876 11.25 11.2497 10.6879 11.2497 10C11.2497 9.31212 10.6876 8.75 9.99967 8.75C9.31179 8.75 8.74967 9.31212 8.74967 10C8.74967 10.6879 9.31179 11.25 9.99967 11.25Z'
      fill='currentColor'
    />
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M14.2498 8.75C13.5619 8.75 12.9998 9.31212 12.9998 10C12.9998 10.6879 13.5619 11.25 14.2498 11.25C14.9376 11.25 15.4998 10.6879 15.4998 10C15.4998 9.31212 14.9376 8.75 14.2498 8.75Z'
      fill='currentColor'
    />
  </svg>
);

export const IconChevronLeft = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M16.6622 3.23086C16.9622 3.53086 16.9622 4.02086 16.6622 4.32086L8.98219 12.0009L16.6622 19.6809C16.9622 19.9809 16.9622 20.4709 16.6622 20.7709C16.3622 21.0709 15.8722 21.0709 15.5722 20.7709L7.34219 12.5509C7.04219 12.2509 7.04219 11.7609 7.34219 11.4609L15.5622 3.23086C15.8622 2.93086 16.3522 2.93086 16.6522 3.23086H16.6622Z'
      fill='#FCFCFC'
    />
  </svg>
);

export const IconChevronRight = () => (
  <svg width='15' height='16' viewBox='0 0 15 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M5.40156 2.55234L10.4328 7.58359C10.6641 7.81484 10.6641 8.18984 10.4328 8.42109L5.40156 13.4523C5.17031 13.6836 4.79531 13.6836 4.56406 13.4523C4.33281 13.2211 4.33281 12.8461 4.56406 12.6148L9.17656 8.00234L4.56406 3.38984C4.33281 3.15859 4.33281 2.78359 4.56406 2.55234C4.79531 2.32109 5.17031 2.32109 5.40156 2.55234Z'
      fill='#66666D'
    />
  </svg>
);

export const IconShare = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M11.4374 2.43353C11.7499 2.12111 12.2564 2.12111 12.5688 2.43353L16.5688 6.43353C16.8812 6.74595 16.8812 7.25248 16.5688 7.5649C16.2564 7.87732 15.7499 7.87732 15.4374 7.5649L12.8031 4.93059V13.9992C12.8031 14.441 12.445 14.7992 12.0031 14.7992C11.5613 14.7992 11.2031 14.441 11.2031 13.9992V4.93059L8.56881 7.5649C8.25639 7.87732 7.74986 7.87732 7.43744 7.5649C7.12502 7.25248 7.12502 6.74595 7.43744 6.43353L11.4374 2.43353Z'
      fill='#FCFCFC'
    />
    <path
      d='M5.00312 10.7992C4.89495 10.7992 4.80313 10.891 4.80313 10.9992V19.9992C4.80313 20.1074 4.89495 20.1992 5.00312 20.1992H19.0031C19.1113 20.1992 19.2031 20.1074 19.2031 19.9992V10.9992C19.2031 10.891 19.1113 10.7992 19.0031 10.7992H16.0031C15.5613 10.7992 15.2031 10.441 15.2031 9.99922C15.2031 9.55739 15.5613 9.19922 16.0031 9.19922H19.0031C19.995 9.19922 20.8031 10.0074 20.8031 10.9992V19.9992C20.8031 20.991 19.995 21.7992 19.0031 21.7992H5.00312C4.0113 21.7992 3.20312 20.991 3.20312 19.9992V10.9992C3.20312 10.0074 4.0113 9.19922 5.00312 9.19922H8.00313C8.44495 9.19922 8.80313 9.55739 8.80313 9.99922C8.80313 10.441 8.44495 10.7992 8.00313 10.7992H5.00312Z'
      fill='#FCFCFC'
    />
  </svg>
);

export const IconMoreVert = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12.0031 7.19961C12.7181 7.19961 13.3031 6.61461 13.3031 5.89961C13.3031 5.18461 12.7181 4.59961 12.0031 4.59961C11.2881 4.59961 10.7031 5.18461 10.7031 5.89961C10.7031 6.61461 11.2881 7.19961 12.0031 7.19961Z'
      fill='#FCFCFC'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12.0031 10.6996C11.2881 10.6996 10.7031 11.2846 10.7031 11.9996C10.7031 12.7146 11.2881 13.2996 12.0031 13.2996C12.7181 13.2996 13.3031 12.7146 13.3031 11.9996C13.3031 11.2846 12.7181 10.6996 12.0031 10.6996Z'
      fill='#FCFCFC'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12.0031 16.7996C11.2881 16.7996 10.7031 17.3846 10.7031 18.0996C10.7031 18.8146 11.2881 19.3996 12.0031 19.3996C12.7181 19.3996 13.3031 18.8146 13.3031 18.0996C13.3031 17.3846 12.7181 16.7996 12.0031 16.7996Z'
      fill='#FCFCFC'
    />
  </svg>
);

export const IconMember = ({ size = 32, ...props }) => (
  <svg width={size} height={size} viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <circle cx='16' cy='16' r='16' fill='#2C2D2E' />
    <ellipse cx='16' cy='11.2773' rx='3' ry='3' fill='#515159' />
    <path
      d='M10.3862 18.4183C10.7072 17.0048 11.9245 16.0059 13.3259 16.0059H18.5973C19.9371 16.0059 21.1167 16.9204 21.4947 18.2521L21.8754 19.5932C22.4443 21.5973 20.9942 23.6053 18.978 23.6053H13.0214C11.0739 23.6053 9.63558 21.7236 10.0816 19.7594L10.3862 18.4183Z'
      fill='#515159'
    />
  </svg>
);

export const IconSendFill = () => (
  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_2323_29771)'>
      <path
        d='M16.8621 4.73784C17.2221 3.74201 16.2571 2.77701 15.2613 3.13784L3.09046 7.53951C2.09129 7.90117 1.97046 9.26451 2.88963 9.79701L6.77463 12.0462L10.2438 8.57701C10.401 8.42521 10.6115 8.34121 10.83 8.34311C11.0485 8.34501 11.2575 8.43265 11.412 8.58716C11.5665 8.74166 11.6541 8.95067 11.656 9.16917C11.6579 9.38767 11.5739 9.59817 11.4221 9.75534L7.95296 13.2245L10.203 17.1095C10.7346 18.0287 12.098 17.907 12.4596 16.9087L16.8621 4.73784Z'
        fill='#FCFCFC'
      />
    </g>
    <defs>
      <clipPath id='clip0_2323_29771'>
        <rect width='20' height='20' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

export const IconHeart = ({ fill = '#F04251' }) => (
  <svg width='22' height='22' viewBox='0 0 22 22' fill={fill} xmlns='http://www.w3.org/2000/svg'>
    <g id='Icon / Interaction / heart'>
      <path
        id='Icon'
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M10.9939 5.95914C9.62516 3.20813 6.10493 1.98885 3.80863 3.95086C1.51234 5.91286 1.18905 9.19324 2.99234 11.5137C4.49166 13.443 9.02912 17.5121 10.5163 18.8291C10.6826 18.9765 10.7658 19.0501 10.8629 19.0791C10.9475 19.1043 11.0402 19.1043 11.1249 19.0791C11.2219 19.0501 11.3051 18.9765 11.4715 18.8291C12.9586 17.5121 17.4961 13.443 18.9954 11.5137C20.7987 9.19324 20.5149 5.89223 18.1791 3.95086C15.8434 2.00949 12.3752 3.20813 10.9939 5.95914Z'
        stroke={fill === 'none' ? '#66666D' : '#F04251'}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </g>
  </svg>
);
