import {
  Background0,
  Background1,
  Background2,
  Background3,
  Background4,
  Background5,
} from '@/components/resolution/read/images';

const ResolutionBackground = () => {
  const BackgroundComponents = [
    <Background0 key={0} />,
    <Background1 key={1} />,
    <Background2 key={2} />,
    <Background3 key={3} />,
    <Background4 key={4} />,
    <Background5 key={5} />,
  ];

  const randomBackground = BackgroundComponents[Math.floor(Math.random() * BackgroundComponents.length)];
  return <>{randomBackground}</>;
};

export default ResolutionBackground;
