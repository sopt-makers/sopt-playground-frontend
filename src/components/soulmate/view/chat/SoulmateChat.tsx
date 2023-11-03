import styled from '@emotion/styled';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { colors } from '@sopt-makers/colors';
import { FC, FormEvent, ReactNode } from 'react';

import { cardStyle } from '@/components/soulmate/view/common/commonStyles';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface SoulmateChatProps {
  className?: string;
  children?: ReactNode;
}

const SoulmateChat: FC<SoulmateChatProps> = ({ className, children }) => {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <Container className={className}>
      <ScrollRoot type='auto'>
        <ScrollViewport>{children}</ScrollViewport>
        <Scrollbar orientation='vertical'>
          <ScrollbarThumb />
        </Scrollbar>
        <Scrollbar orientation='horizontal'>
          <ScrollbarThumb />
        </Scrollbar>
        <ScrollbarCorner />
      </ScrollRoot>
      <SubmitArea onSubmit={handleSubmit}>
        <Input placeholder='미션을 수행해주세요.' rows={1} />
        <SubmitButton type='submit'>{submitIcon}</SubmitButton>
      </SubmitArea>
    </Container>
  );
};

const submitIcon = (
  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g filter='url(#filter0_b_6244_90835)'>
      <path
        d='M9.05852 12.011H2.75943C2.40616 12.011 2.26036 11.5581 2.54728 11.352L13.894 3.2016C14.1468 3.02001 14.496 3.21928 14.4683 3.5293L13.2264 17.4294C13.195 17.7815 12.7305 17.8862 12.551 17.5817L9.37176 12.1899C9.30637 12.0791 9.18724 12.011 9.05852 12.011Z'
        fill='currentColor'
      />
    </g>
    <defs>
      <filter
        id='filter0_b_6244_90835'
        x='0.940962'
        y='1.67827'
        width='14.9833'
        height='17.538'
        filterUnits='userSpaceOnUse'
        color-interpolation-filters='sRGB'
      >
        <feFlood flood-opacity='0' result='BackgroundImageFix' />
        <feGaussianBlur in='BackgroundImageFix' stdDeviation='0.727273' />
        <feComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_6244_90835' />
        <feBlend mode='normal' in='SourceGraphic' in2='effect1_backgroundBlur_6244_90835' result='shape' />
      </filter>
    </defs>
  </svg>
);

export default SoulmateChat;

const Container = styled.div`
  ${cardStyle};

  display: flex;
  flex-direction: column;
  height: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 0;
  }
`;

const ScrollRoot = styled(ScrollArea.Root)`
  position: relative;
  flex-grow: 1;
  flex-shrink: 0;
`;

const ScrollViewport = styled(ScrollArea.Viewport)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 40px 40px 20px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 20px 20px 10px;
  }
`;

const SCROLLBAR_SIZE = '10px';

const Scrollbar = styled(ScrollArea.Scrollbar)`
  display: flex;
  transition: background-color 160ms ease-out;
  margin-top: 30px;
  background-color: ${colors.gray800};
  padding: 2;
  user-select: none;
  touch-action: none;

  &:hover {
    background-color: ${colors.gray700};
  }

  &[data-orientation='vertical'] {
    width: ${SCROLLBAR_SIZE};
  }

  &[data-orientation='horizontal'] {
    flex-direction: column;
    height: ${SCROLLBAR_SIZE};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 10px;
  }
`;

const ScrollbarThumb = styled(ScrollArea.Thumb)`
  position: relative;
  flex: 1;
  border-radius: 5px;
  background-color: ${colors.gray400};

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    min-width: 44;
    height: 100%;
    min-height: 44;
    content: '';
  }
`;

const ScrollbarCorner = styled.div`
  background-color: ${colors.gray700};
`;

const SubmitArea = styled.form`
  display: flex;
  border-radius: 14px;
  background-color: ${colors.gray800};
`;

const Input = styled.textarea`
  flex-grow: 1;
  flex-shrink: 0;
  border-radius: 14px 0 0 14px;
  background-color: inherit;
  padding: 24px 20px;
  resize: none;
  color-scheme: dark;

  ${textStyles.SUIT_16_M};

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 16px;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  transition: color 0.3s;
  border-radius: 0 14px 14px 0;
  cursor: pointer;
  padding: 0 20px;
  color: ${colors.white};

  & > svg {
    width: 20px;
    height: 20px;
  }
`;
