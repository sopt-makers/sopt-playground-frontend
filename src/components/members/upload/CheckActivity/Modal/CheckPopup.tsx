import * as Dialog from '@radix-ui/react-dialog';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import BubbleTip from '@/public/icons/polygon.svg';
import dynamic from 'next/dynamic';
import { css } from '@emotion/react';

const DialogPortal = dynamic(() => import('@radix-ui/react-dialog').then(({ Portal }) => Portal), { ssr: false });

interface CheckPopupProps {
  isOpen: boolean;
  onClose: () => void;
  moveToCheck: () => void;
}

function CheckPopup({ isOpen, onClose, moveToCheck }: CheckPopupProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <PopupOverlay zIndex={200}>
          <PopupContent>
            <BubbleTipIcon />
            <ContentWrapper>
              <Title>활동 정보를 확인해주세요</Title>
              <Desc>
                현재 일부 회원의 활동 정보가 정확하게 등록되어 있지 않아요. 본인의 활동 정보를 한번 더 확인해주세요.
              </Desc>
              <Button onClick={moveToCheck}>활동 정보 확인하기</Button>
            </ContentWrapper>
          </PopupContent>
        </PopupOverlay>
      </DialogPortal>
    </Dialog.Root>
  );
}

export default CheckPopup;

const PopupOverlay = styled(Dialog.Overlay)<{ zIndex?: number }>`
  display: flex;
  position: fixed;
  inset: 0;
  align-items: right;
  justify-content: right;
  background-color: rgb(0 0 0 / 30%);

  ${({ zIndex }) =>
    zIndex &&
    css`
      z-index: ${zIndex};
    `}
`;

const PopupContent = styled(Dialog.Content)`
  display: flex;
  position: absolute;
  top: 70px;
  right: 20px;
  flex-direction: column;
  align-items: flex-end;
  z-index: 9999;
  width: 224px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -8px;
  border-radius: 10px;
  background-color: ${colors.gray800};
  padding: 20px;
  text-align: center;
  color: ${colors.gray50};
  ${fonts.BODY_13_L};
`;

const Title = styled.div`
  margin-bottom: 10px;
  width: 100%;
  letter-spacing: -0.21px;
  color: ${colors.gray10};
  ${fonts.TITLE_14_SB}
`;

const Desc = styled.div`
  margin-bottom: 24px;
  letter-spacing: -0.195px;
  color: ${colors.gray100};
  ${fonts.BODY_13_R};
`;

const Button = styled(Dialog.Close)`
  display: flex;
  justify-content: center;
  border-radius: 8px;
  background: ${colors.white};
  padding: 9px 14px;
  width: 100%;
  letter-spacing: -0.28px;
  color: ${colors.black};
  ${fonts.LABEL_14_SB};
`;

const BubbleTipIcon = styled(BubbleTip)`
  margin: 0 33px 5px 0;
`;
