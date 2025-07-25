import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import { useEffect, useState } from 'react';

import { useGetLuckyPick } from '@/api/endpoint/resolution/getLuckyPick';
import { useGetMemberProfileOfMe } from '@/api/endpoint_LEGACY/hooks';
import AuthRequired from '@/components/auth/AuthRequired';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import LuckyLoading from '@/components/luckydraw/LuckyLoading';
import LuckyReady from '@/components/luckydraw/LuckyReady';
import LuckyResult from '@/components/luckydraw/LuckyResult';
import LuckyWinnerGuide from '@/components/luckydraw/LuckyWinnerGuide';
import { setLayout } from '@/utils/layout';

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

  const { logSubmitEvent } = useEventLogger();

  const handleClickButton = () => {
    if (isWinner) {
      goToWinnerGuide();
    } else {
      logSubmitEvent('luckyTimeCapsule', { event_winner: false });
      sessionStorage.removeItem('LUCKY_ENTRY');
      router.push(playgroundLink.feedList());
    }
  };

  const handleClickFinalButton = () => {
    logSubmitEvent('luckyTimeCapsule', { event_winner: true });
    sessionStorage.removeItem('LUCKY_ENTRY');
    window.open('http://pf.kakao.com/_sxaIWG', '_blank');
    router.push(playgroundLink.feedList());
  };

  useEffect(() => {
    const canEnter = sessionStorage.getItem('LUCKY_ENTRY');

    if (!canEnter) {
      router.replace('/');
      return;
    }
  }, [router]);

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

setLayout(Lucky, 'header');

export default Lucky;
