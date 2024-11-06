import { FC, ReactNode, useEffect, useState } from 'react';

import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';
import { getMemberProfileOfMe } from '@/api/endpoint_LEGACY/members';
import { EventLoggerContext } from '@/components/eventLogger/context';
import { createConsoleLogController } from '@/components/eventLogger/controllers/consoleLog';

interface EventLoggerProviderProps {
  children: ReactNode;
  apiKey: string;
}

const AmplitudeProvider: FC<EventLoggerProviderProps> = ({ children, apiKey }) => {
  const [controller, setController] = useState(createConsoleLogController());
  const { data } = useGetMemberOfMe();

  useEffect(() => {
    if (!apiKey) {
      setController(createConsoleLogController());
      return;
    }
    const initializeAmplitude = async () => {
      try {
        const profile = await getMemberProfileOfMe();
        const { createAmplitudeController } = await import('@/components/eventLogger/controllers/amplitude');

        const amplitudeController = createAmplitudeController(apiKey, data?.id ? `${data.id}` : undefined);

        // user_properties 설정
        if (data && profile) {
          amplitudeController.setUserProperties({
            id: data.id,
            major: profile.major,
            job: profile.careers.length > 0 ? profile.careers[0].title : '',
            organization:
              profile.careers.length > 0
                ? profile.careers[0].companyName
                : profile.university
                ? profile.university
                : '',
            generation: profile.soptActivities.map((activity) => activity.generation),
            part: [...new Set(profile.soptActivities.map((activity) => activity.part))],
          });
        }

        setController(() => amplitudeController);
      } catch (error) {
        console.error('Failed to initialize Amplitude:', error);
      }
    };

    initializeAmplitude();
  }, [apiKey, data]);

  return <EventLoggerContext.Provider value={controller}>{children}</EventLoggerContext.Provider>;
};

export default AmplitudeProvider;
