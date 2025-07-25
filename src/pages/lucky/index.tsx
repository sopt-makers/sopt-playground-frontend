import AuthRequired from '@/components/auth/AuthRequired';
import { setLayout } from '@/utils/layout';
import { useState } from 'react';
import { useGetMemberProfileOfMe } from '@/api/endpoint_LEGACY/hooks';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import LuckyLoading from '@/components/luckydraw/LuckyLoading';
import LuckyResult from '@/components/luckydraw/LuckyResult';
import LuckyWinnerGuide from '@/components/luckydraw/LuckyWinnerGuide';
import LuckyReady from '@/components/luckydraw/LuckyReady';
import { useGetLuckyPick } from '@/api/endpoint/resolution/getLuckyPick';

type Step = 'ready' | 'loading' | 'result' | 'winnerGuide';

const Lucky = () => {
  const router = useRouter();
  const [step, setStep] = useState<Step>('ready');
  const { data: { name } = {}, isLoading: isNameLoading } = useGetMemberProfileOfMe();
  const { data: luckyPickResult, isLoading: isLuckyPickLoading } = useGetLuckyPick(step === 'loading');

  const isWinner = luckyPickResult?.isWinner ?? false;

  const goToLoading = () => setStep('loading');
  const goToResult = () => setStep('result');
  const goToWinnerGuide = () => setStep('winnerGuide');

  const handleClickButton = () => {
    if (isWinner) {
      goToWinnerGuide();
    } else {
      router.push(playgroundLink.feedList());
    }
  };

  const handleClickFinalButton = () => {
    window.open('http://pf.kakao.com/_sxaIWG', '_blank');
    router.push(playgroundLink.feedList());
  };

  return (
    <AuthRequired>
      {step === 'ready' && <LuckyReady onStart={goToLoading} />}
      {step === 'loading' && <LuckyLoading onComplete={goToResult} />}
      {step === 'result' &&
        (isNameLoading || isLuckyPickLoading ? (
          <LuckyLoading onComplete={goToResult} />
        ) : (
          <LuckyResult isWinner={isWinner} username={name || ''} onClickButton={handleClickButton} />
        ))}
      {step === 'winnerGuide' && <LuckyWinnerGuide onClickNext={handleClickFinalButton} />}
    </AuthRequired>
  );
};

export default Lucky;
