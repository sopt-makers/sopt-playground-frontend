import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Toggle } from '@sopt-makers/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';

import { getCoffeechatDetail } from '@/api/endpoint/coffeechat/getCoffeechatDetail';
import { changeIsBlindCoffeechat } from '@/api/endpoint/coffeechat/postCoffeechatIsBlind';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface ShowCoffeechatToggleProps {
  isBlind: boolean;
  memberId: string;
}

export default function ShowCoffeechatToggle({ isBlind, memberId }: ShowCoffeechatToggleProps) {
  const { logClickEvent } = useEventLogger();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: (open: boolean) => changeIsBlindCoffeechat.request(open),
  });

  const handlChangeIsBlind = () => {
    mutate(!isBlind, {
      onSuccess: async () => {
        if (isBlind) {
          logClickEvent('coffeechatToggleOn');
        } else {
          logClickEvent('coffeechatToggleOff');
        }
        queryClient.invalidateQueries({ queryKey: getCoffeechatDetail.cacheKey(memberId) });
        await router.push(playgroundLink.coffeechatDetail(memberId));
      },
    });
  };

  return (
    <ToggleSection>
      <>커피챗 숨기기</>
      <Toggle checked={!isBlind} size='lg' onClick={handlChangeIsBlind} />
    </ToggleSection>
  );
}

const ToggleSection = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 85px;
  color: ${colors.gray300};
  ${fonts.BODY_16_R};

  @media ${MOBILE_MEDIA_QUERY} {
    float: left;
    margin-top: 0;
    margin-bottom: 0;
  }

  @media (max-width: 360px) {
    float: right;
  }
`;
