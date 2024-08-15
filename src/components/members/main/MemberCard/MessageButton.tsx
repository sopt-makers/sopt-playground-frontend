import styled from '@emotion/styled';
import * as Tooltip from '@radix-ui/react-tooltip';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { FC, MouseEvent } from 'react';

import IconSend from '@/public/icons/icon-send.svg';
import IconCoffee from '@/public/icons/icon-coffee.svg';
import { Tag } from '@sopt-makers/ui';
import { Flex } from '@toss/emotion-utils';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';

interface MessageButtonProps {
  className?: string;
  name: string;
  isCoffeeChatActivate: boolean;
  onClick?: (e: MouseEvent) => void;
}

const MessageButton: FC<MessageButtonProps> = ({ className, name, isCoffeeChatActivate, onClick }) => {
  const { logClickEvent } = useEventLogger();

  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={300}>
        <Tooltip.Trigger asChild>
          <Button
            className={className}
            isCoffeeChatActivate={isCoffeeChatActivate}
            onClick={(e) => {
              onClick && onClick(e);
              logClickEvent(isCoffeeChatActivate ? 'coffeechatBadge' : 'memberBadge');
            }}
          >
            {isCoffeeChatActivate ? <IconCoffee /> : <IconSend />}
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <TooltipContent sideOffset={5}>
            {isCoffeeChatActivate ? (
              <Flex style={{ gap: 6 }}>
                <Tag size='sm' shape='rect' variant='primary' type='solid'>
                  NEW
                </Tag>
                커피챗 기능이 오픈됐어요!
              </Flex>
            ) : (
              `${name}님이 궁금하시다면\n쪽지를 보내보세요!`
            )}

            <TooltipArrow />
          </TooltipContent>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default MessageButton;

const Button = styled.div<{ isCoffeeChatActivate: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  border-radius: 50%;
  background-color: ${({ isCoffeeChatActivate }) => (isCoffeeChatActivate ? colors.blue400 : colors.gray600)};
  padding: 5px;
  width: 32px;
  height: 32px;

  &:hover {
    background-color: ${({ isCoffeeChatActivate }) => (isCoffeeChatActivate ? colors.blue200 : colors.gray400)};
  }
`;

const TooltipContent = styled(Tooltip.Content)`
  ${fonts.BODY_14_M};

  border-radius: 14px;
  background-color: ${colors.gray600};
  padding: 10px 20px;
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
