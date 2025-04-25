import { FC, ReactNode, useEffect, useState } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { useGetMemberProperty } from '@/api/endpoint/members/getMemberProperty';
import { EventLoggerContext } from '@/components/eventLogger/context';
import { createConsoleLogController } from '@/components/eventLogger/controllers/consoleLog';

interface EventLoggerProviderProps {
  children: ReactNode;
  apiKey: string;
}

const AmplitudeProvider: FC<EventLoggerProviderProps> = ({ children, apiKey }) => {
  const [controller, setController] = useState(createConsoleLogController());
  const { data } = useGetMemberOfMe();
  const { data: property } = useGetMemberProperty();

  useEffect(() => {
    if (!apiKey) {
      setController(createConsoleLogController());
      return;
    }
    const initializeAmplitude = async () => {
      try {
        const { createAmplitudeController } = await import('@/components/eventLogger/controllers/amplitude');
        const amplitudeController = createAmplitudeController(apiKey, data?.id ? `${data.id}` : undefined);

        // user_properties 주입
        if (data && property) {
          amplitudeController.setUserProperties({
            id: property.id,
            job: property.job || '',
            major: property.major,
            organization: property.organization,
            generation: property.generation,
            part: property.part,
            coffeeChatStatus: property.coffeeChatStatus,
            receivedCoffeeChatCount: property.receivedCoffeeChatCount,
            sentCoffeeChatCount: property.sentCoffeeChatCount,
          });
        }

        setController(() => amplitudeController);
      } catch (error) {
        console.error('Failed to initialize Amplitude:', error);
      }
    };

    initializeAmplitude();
  }, [apiKey, data, property]);

  return <EventLoggerContext.Provider value={controller}>{children}</EventLoggerContext.Provider>;
};

export default AmplitudeProvider;
