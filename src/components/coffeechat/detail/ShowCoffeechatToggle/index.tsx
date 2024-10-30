import { getCoffeechatDetail } from '@/api/endpoint/coffeechat/getCoffeechatDetail';
import { changeIsBlindCoffeechat } from '@/api/endpoint/coffeechat/postCoffeechatIsBlind';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Toggle } from '@sopt-makers/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';

interface ShowCoffeechatToggleProps {
  isBlind: boolean;
  memberId: string;
}

export default function ShowCoffeechatToggle({ isBlind, memberId }: ShowCoffeechatToggleProps) {
  const { logSubmitEvent } = useEventLogger();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: (open: boolean) => changeIsBlindCoffeechat.request(open),
  });

  const handlChangeIsBlind = () => {
    mutate(!isBlind, {
      onSuccess: async () => {
        // logSubmitEvent('isBlindCoffeechat');
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
  color: ${colors.gray300};
  ${fonts.BODY_16_R};
`;
