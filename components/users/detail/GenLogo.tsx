import {
  Time,
  Time12,
  Time14,
  Time15,
  Time16,
  Time17,
  Time18,
  Time19,
  Time20,
  Time21,
  Time22,
  Time23,
  Time24,
  Time25,
  Time26,
  Time27,
  Time28,
  Time29,
  Time30,
  Time31,
} from 'public/icons/logo';
import { FC } from 'react';

type GenLogoProps = {
  gen: string;
};

const GenLogo: FC<GenLogoProps> = ({ gen }) => {
  switch (gen) {
    case '31':
      return <Time31 />;
    case '30':
      return <Time30 />;
    case '29':
      return <Time29 />;
    case '28':
      return <Time28 />;
    case '27':
      return <Time27 />;
    case '26':
      return <Time26 />;
    case '25':
      return <Time25 />;
    case '24':
      return <Time24 />;
    case '23':
      return <Time23 />;
    case '22':
      return <Time22 />;
    case '21':
      return <Time21 />;
    case '20':
      return <Time20 />;
    case '19':
      return <Time19 />;
    case '18':
      return <Time18 />;
    case '17':
      return <Time17 />;
    case '16':
      return <Time16 />;
    case '15':
      return <Time15 />;
    case '14':
      return <Time14 />;
    // case '13':
    //   return <Time13 />;
    case '12':
      return <Time12 />;
    default:
      return <Time />;
  }
};

export default GenLogo;
