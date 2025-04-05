import styled from '@emotion/styled';
import * as Tooltip from '@radix-ui/react-tooltip';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconSend } from '@sopt-makers/icons';
import { FC, MouseEvent } from 'react';

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
          <Button
            className={className}
            onClick={(e) => {
              onClick && onClick(e);
            }}
          >
            <StyledIconSend />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <TooltipContent sideOffset={5}>
            {`${name}님이 궁금하시다면\n쪽지를 보내보세요!`}
            <TooltipArrow />
          </TooltipContent>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default MessageButton;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  border-radius: 50%;
  background-color: ${colors.gray600};
  padding: 5px;
  width: 32px;
  height: 32px;

  &:hover {
    background-color: ${colors.gray400};
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

const StyledIconSend = styled(IconSend)`
  width: 20px;
  height: 20px;
`;
