import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import { BottomSheet } from '@/components/common/BottomSheet';
import Modal from '@/components/common/Modal';
import useModalState from '@/components/common/Modal/useModalState';
import Responsive from '@/components/common/Responsive';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';
import carbonCodeBlockImg from '@/public/icons/img/carbon_code_block.png';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const CARBON_LINK = 'https://carbon.now.sh/';

export default function CodeUploadButton() {
  const { isOpen, onClose, onOpen } = useModalState();

  return (
    <LoggingClick eventKey='communityUploadCodeButton'>
      <>
        <Button onClick={onOpen} type='button'>
          {codeSvg}코드
        </Button>
        <Responsive only='desktop' asChild>
          <Modal onClose={onClose} isOpen={isOpen} hideCloseButton>
            <Modal.Content style={{ width: 'fit-content' }}>
              <UnsupportedCodeMessage />
            </Modal.Content>
            <StyledModalFooter align='stretch'>
              <StyledModalButton action='close'>확인</StyledModalButton>
            </StyledModalFooter>
          </Modal>
        </Responsive>
        <Responsive only='mobile' asChild>
          <StyledBottomSheet isOpen={isOpen} onClose={onClose}>
            <UnsupportedCodeMessage />
            <BottomSheetButton onClick={onClose}>확인</BottomSheetButton>
          </StyledBottomSheet>
        </Responsive>
      </>
    </LoggingClick>
  );
}

function UnsupportedCodeMessage() {
  return (
    <>
      <Title>코드블럭은 아직 지원하지 않아요.</Title>
      <Description>
        메이커스에서 열심히 개발하고 있으니 잠시만 기다려주세요 (ㅠ,ㅠ) 대신 우선 코드블럭 이미지를 활용해보는건
        어떤가요?{' '}
        <CarbonLink href={CARBON_LINK} target='_blank' rel='noopener noreferrer'>
          Carbon
        </CarbonLink>
        을 이용하면 아래와 같은 코드블럭 이미지를 쉽게 만들 수 있어요!
      </Description>
      <CarbonCodeBlockImage src={carbonCodeBlockImg.src} alt='carbon-code-block' />
    </>
  );
}

const Button = styled.button`
  display: flex;
  gap: 5px;
  align-items: center;
  border-radius: 21px;
  background-color: ${colors.gray800};
  padding: 6px 12px;
  color: ${colors.gray10};

  ${textStyles.SUIT_13_M}
`;

const codeSvg = (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M9.80213 3.04308C9.86215 3.06973 9.91633 3.10794 9.96158 3.15554C10.0068 3.20313 10.0423 3.25917 10.0658 3.32046C10.0894 3.38175 10.1007 3.44709 10.099 3.51274C10.0974 3.57839 10.0828 3.64306 10.0561 3.70308L6.05613 12.7031C6.0023 12.8243 5.90251 12.9191 5.77874 12.9668C5.65496 13.0144 5.51734 13.0109 5.39613 12.9571C5.27493 12.9032 5.18008 12.8035 5.13244 12.6797C5.08481 12.5559 5.08829 12.4183 5.14213 12.2971L9.14213 3.29708C9.16879 3.23706 9.207 3.18288 9.2546 3.13763C9.30219 3.09238 9.35823 3.05695 9.41952 3.03336C9.48081 3.00978 9.54614 2.99849 9.61179 3.00016C9.67744 3.00183 9.74212 3.01641 9.80213 3.04308ZM4.33213 5.37608C4.38112 5.41981 4.42101 5.47275 4.44953 5.5319C4.47805 5.59105 4.49464 5.65523 4.49836 5.72079C4.50207 5.78635 4.49284 5.852 4.47118 5.91399C4.44952 5.97598 4.41587 6.03309 4.37213 6.08208L2.66913 8.00008L4.37413 9.91808C4.41773 9.96719 4.45123 10.0244 4.47272 10.0865C4.4942 10.1485 4.50325 10.2142 4.49935 10.2798C4.49545 10.3453 4.47868 10.4095 4.44999 10.4686C4.42129 10.5276 4.38125 10.5805 4.33213 10.6241C4.28302 10.6677 4.2258 10.7012 4.16374 10.7227C4.10168 10.7441 4.03599 10.7532 3.97044 10.7493C3.90488 10.7454 3.84073 10.7286 3.78165 10.6999C3.72258 10.6712 3.66973 10.6312 3.62613 10.5821L1.62613 8.33208C1.54488 8.24057 1.5 8.12245 1.5 8.00008C1.5 7.8777 1.54488 7.75958 1.62613 7.66808L3.62613 5.41808C3.66973 5.36895 3.72257 5.32889 3.78164 5.3002C3.84072 5.2715 3.90487 5.25472 3.97043 5.25082C4.03599 5.24692 4.10168 5.25597 4.16374 5.27746C4.22581 5.29896 4.28303 5.33247 4.33213 5.37608ZM11.6671 5.37608C11.7162 5.33247 11.7735 5.29896 11.8355 5.27746C11.8976 5.25597 11.9633 5.24692 12.0288 5.25082C12.0944 5.25472 12.1585 5.2715 12.2176 5.3002C12.2767 5.32889 12.3295 5.36895 12.3731 5.41808L14.3731 7.66808C14.4544 7.75958 14.4993 7.8777 14.4993 8.00008C14.4993 8.12245 14.4544 8.24057 14.3731 8.33208L12.3731 10.5821C12.3295 10.6312 12.2767 10.6712 12.2176 10.6999C12.1585 10.7286 12.0944 10.7454 12.0288 10.7493C11.9633 10.7532 11.8976 10.7441 11.8355 10.7227C11.7735 10.7012 11.7162 10.6677 11.6671 10.6241C11.618 10.5805 11.578 10.5276 11.5493 10.4686C11.5206 10.4095 11.5038 10.3453 11.4999 10.2798C11.496 10.2142 11.5051 10.1485 11.5266 10.0865C11.548 10.0244 11.5815 9.96719 11.6251 9.91808L13.3301 8.00008L11.6251 6.08208C11.5815 6.03297 11.548 5.97575 11.5265 5.91369C11.505 5.85163 11.496 5.78594 11.4999 5.72038C11.5038 5.65481 11.5206 5.59066 11.5493 5.53159C11.578 5.47251 11.618 5.41967 11.6671 5.37608Z'
      fill='white'
    />
  </svg>
);

const Title = styled.div`
  margin-bottom: 12px;
  line-height: 28px;
  letter-spacing: -0.2px;
  color: ${colors.gray10};

  ${textStyles.SUIT_20_B}
`;

const Description = styled.div`
  margin-bottom: 10px;
  max-width: 326px;
  line-height: 22px;
  letter-spacing: -0.14px;
  white-space: pre-line;
  color: ${colors.gray10};

  ${textStyles.SUIT_14_R}

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 100%;
  }
`;

const CarbonCodeBlockImage = styled.img`
  max-width: 326px;

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 100%;
    min-height: 180px;
  }
`;

const CarbonLink = styled.a`
  text-decoration-line: underline;
  color: ${colors.success};
`;

const StyledModalFooter = styled(Modal.Footer)`
  padding: 0 16px 16px;
`;

const unsupportedCodeMessageButtonStyle = css`
  background-color: ${colors.white};
  color: ${colors.black};

  ${textStyles.SUIT_16_SB}
`;

const StyledModalButton = styled(Modal.Button)`
  ${unsupportedCodeMessageButtonStyle};
`;

const StyledBottomSheet = styled(BottomSheet)`
  padding: 24px 16px;
`;

const BottomSheetButton = styled.button`
  margin-top: 24px;
  border-radius: 10px;
  padding: 12px 0;
  width: 100%;

  ${unsupportedCodeMessageButtonStyle};
`;
