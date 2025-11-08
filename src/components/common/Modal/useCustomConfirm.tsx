import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { m } from 'framer-motion';
import React, { ReactNode, useCallback, useState } from 'react';

// 기존 Modal 컴포넌트 가져오기
import Modal from '@/components/common/Modal';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface ConfirmOptions {
  title: ReactNode;
  description: ReactNode;
  cancelButtonText: string;
  okButtonText: string;
  okButtonColor?: string;
  okButtonTextColor?: string;
  zIndex?: number;
  width?: number;
}

const useCustomConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({
    title: '',
    description: '',
    cancelButtonText: 'Cancel',
    okButtonText: 'Confirm',
  });

  const [resolvePromise, setResolvePromise] = useState<(value: boolean) => void>(() => {
    undefined;
  });

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    setOptions(options);
    setIsOpen(true);

    return new Promise<boolean>((resolve) => {
      setResolvePromise(() => resolve);
    });
  }, []);

  const handleConfirm = () => {
    setIsOpen(false);
    resolvePromise(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    resolvePromise(false);
  };

  const ConfirmComponent = isOpen ? (
    <StyledBackground zIndex={options.zIndex}>
      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
        <StyledModalContainer width={options.width}>
          <m.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
            <StyledModalContent>
              <StyledModalTitle>{options.title}</StyledModalTitle>
              <StyledModalDescription>{options.description}</StyledModalDescription>
              <StyledFooter align='right'>
                <StyledButton onClick={handleCancel} background='dark'>
                  {options.cancelButtonText}
                </StyledButton>
                <StyledButton
                  onClick={handleConfirm}
                  background='light'
                  style={{
                    backgroundColor: options.okButtonColor || colors.white,
                    color: options.okButtonTextColor || colors.black,
                  }}
                >
                  {options.okButtonText}
                </StyledButton>
              </StyledFooter>
            </StyledModalContent>
          </m.div>
        </StyledModalContainer>
      </m.div>
    </StyledBackground>
  ) : null;

  return { confirm, ConfirmComponent };
};

export default useCustomConfirm;

const StyledBackground = styled.div<{ zIndex?: number }>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  z-index: ${({ zIndex }) => zIndex || 1000};
  background: rgb(0 0 0 / 50%);
  padding-bottom: 20px;
  width: 100%;
  height: 100%;
`;

const StyledModalContainer = styled.div<{ width?: number }>`
  position: relative;
  border-radius: 14px;
  box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
  background: ${colors.gray800};
  width: ${({ width }) => width || 400}px;
  height: auto;
  overflow: hidden;
  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 303px;
    height: auto;
  }
`;
export const StyledModalTitle = styled.h1`
  margin-bottom: 12px;
  line-height: 30px;

  ${textStyles.SUIT_20_B}
  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_18_B}

    margin-bottom: 8px;
    line-height: 28px;
  }
`;
const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  @media ${MOBILE_MEDIA_QUERY} {
    padding: 20px;
  }
`;

const StyledModalDescription = styled.div`
  width: 100%;
  line-height: 26px;
  white-space: pre-wrap;
  color: ${colors.gray100};
  @media ${MOBILE_MEDIA_QUERY} {
    line-height: 22px;
    font-size: 14px;
  }
`;
const StyledFooter = styled.div<{ align: 'left' | 'right' | 'stretch'; stack?: 'horizontal' | 'vertical' }>`
  display: grid;
  margin-top: 36px;

  ${(props) =>
    props.stack !== 'vertical' &&
    css`
      grid-auto-flow: column;
      column-gap: 8px;
    `}

  ${(props) =>
    props.align === 'stretch' &&
    css`
      grid-auto-columns: minmax(10px, 1fr);
    `}
  ${(props) =>
    props.align === 'left' &&
    css`
      grid-auto-columns: max-content;
    `}
    ${(props) =>
    props.align === 'right' &&
    css`
      grid-auto-columns: max-content;
      justify-content: end;
    `}
    @media ${MOBILE_MEDIA_QUERY} {
    grid-auto-columns: minmax(10px, 1fr);
    margin-top: 24px;
  }
`;

const StyledButton = styled.button<{ background: 'dark' | 'light' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 12px 20px;
  height: 44px;

  ${({ background }) =>
    background === 'dark' &&
    css`
      background-color: ${colors.gray700};
      color: ${colors.gray10};
    `}
  ${({ background }) =>
    background === 'light' &&
    css`
      background-color: ${colors.white};
      color: ${colors.black};
    `}

  ${textStyles.SUIT_14_SB};
`;
