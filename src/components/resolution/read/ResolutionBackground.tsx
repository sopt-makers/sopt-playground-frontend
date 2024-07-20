import {
  Background0,
  Background1,
  Background2,
  Background3,
  Background4,
  Background5,
} from '@/components/resolution/read/images';

const ResolutionBackground = () => {
  const BackgroundComponents: { [key: number]: JSX.Element } = {
    0: <Background0 />,
    1: <Background1 />,
    2: <Background2 />,
    3: <Background3 />,
    4: <Background4 />,
    5: <Background5 />,
  };

  const randomIndex = Math.floor(Math.random() * Object.keys(BackgroundComponents).length);
  const randomBackground = BackgroundComponents[randomIndex];
  return <>{randomBackground}</>;
};

export default ResolutionBackground;
