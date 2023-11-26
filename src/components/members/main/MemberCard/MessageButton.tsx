import styled from '@emotion/styled';
import * as Tooltip from '@radix-ui/react-tooltip';
import { colors } from '@sopt-makers/colors';
import { FC, MouseEvent } from 'react';

import IconMessage from '@/public/icons/icon-message.svg';
import { textStyles } from '@/styles/typography';

interface MessageButtonProps {
  className?: string;
  name: string;
  onClick?: (e: MouseEvent) => void;
}

const MessageButton: FC<MessageButtonProps> = ({ className, name, onClick }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={300}>
        <Tooltip.Trigger asChild>
          <Button className={className} onClick={onClick}>
            <IconMessage />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <TooltipContent sideOffset={5}>
            {name}님께 하고 싶은 말이 있다면,
            <br />
            작성해 볼까요?
            <TooltipArrow />
          </TooltipContent>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default MessageButton;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  border-radius: 50%;
  background-color: ${colors.gray600};
  width: 32px;
  height: 32px;

  &:hover {
    background-color: ${colors.gray400};
  }

  & svg {
    fill: ${colors.gray100};
    width: 16px;
    height: 16px;
  }
`;

const TooltipContent = styled(Tooltip.Content)`
  border-radius: 4px;
  box-shadow: hsl(206deg 22% 7% / 35%) 0 10px 38px -10px, hsl(206deg 22% 7% / 20%) 0 10px 20px -15px;
  background-color: ${colors.gray700};
  padding: 17px 26px;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  text-align: center;
  line-height: 1;
  font-size: 15px;
  will-change: transform, opacity;
  user-select: none;

  ${textStyles.SUIT_12_M}

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
  fill: ${colors.gray700};
`;
