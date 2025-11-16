import styled from '@emotion/styled';
import * as Tooltip from '@radix-ui/react-tooltip';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { Tag } from '@sopt-makers/ui';
import { Flex } from '@toss/emotion-utils';
import { FC, MouseEvent } from 'react';

import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import IconCoffee from '@/public/icons/icon-coffee.svg';
import { useGetMemberOfMe } from '@/api/endpoint/members/getMemberOfMe';

interface CoffeeChatButtonProps {
  className?: string;
  onClick?: (e: MouseEvent) => void;
  receiver: string;
}

const CoffeeChatButton: FC<CoffeeChatButtonProps> = ({ className, onClick, receiver }) => {
  const { logClickEvent } = useEventLogger();
  const { data: me } = useGetMemberOfMe();

  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={300}>
        <Tooltip.Trigger asChild>
          <Button
            className={className}
            onClick={(e) => {
              onClick && onClick(e);
              logClickEvent('coffeechatBadge');
            }}
          >
            <IconCoffee />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <TooltipContent sideOffset={5}>
            <Flex style={{ gap: 6 }} align='center'>
              <Tag size='sm' shape='rect' variant='primary' type='solid'>
                커피챗
              </Tag>
              {receiver}님이 {me?.name ?? '회원'}님의 제안을 기다려요.
            </Flex>
            <TooltipArrow />
          </TooltipContent>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default CoffeeChatButton;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  border-radius: 50%;
  background-color: ${colors.blue400};
  padding: 5px;
  width: 32px;
  height: 32px;

  &:hover {
    background-color: ${colors.blue200};
  }
`;

const TooltipContent = styled(Tooltip.Content)`
  ${fonts.BODY_14_M};

  border-radius: 12px;
  background-color: ${colors.gray600};
  padding: 10px 12px;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  text-align: center;
  white-space: pre-wrap;
  color: ${colors.gray100};
  will-change: transform, opacity;
  user-select: none;

  &[data-state='delayed-open'] {
    &[data-side='top'] {
      animation-name: slide-down-and-fade;
    }

    &[data-side='bottom'] {
      animation-name: slide-up-and-fade;
    }
  }

  @keyframes slide-up-and-fade {
    0% {
      transform: translateY(2px);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-and-fade {
    0% {
      transform: translateY(-2px);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const TooltipArrow = styled(Tooltip.Arrow)`
  fill: ${colors.gray600};
  width: 11px;
  height: 11px;
`;
