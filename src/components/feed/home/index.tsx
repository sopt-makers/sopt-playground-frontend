import PopularArea from '@/components/feed/home/PopularArea';
import QuestionArea from '@/components/feed/home/RecentArea';
import SopticleArea from '@/components/feed/home/SopticleArea';

const Hot = () => {
  return (
    <>
      <QuestionArea />
      <PopularArea />
      <SopticleArea />
    </>
  );
};

export default Hot;
