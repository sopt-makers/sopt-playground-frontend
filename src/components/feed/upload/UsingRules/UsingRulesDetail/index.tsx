import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import { BottomSheet } from '@/components/common/BottomSheet';
import Modal from '@/components/common/Modal';
import Responsive from '@/components/common/Responsive';
import { COMMUNITY_RULES_DETAIL } from '@/components/feed/upload/UsingRules/constants';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface UsingRulesDetailProps {
  isOpen?: boolean;
  onClose: () => void;
}

export default function UsingRulesDetail({ isOpen = false, onClose }: UsingRulesDetailProps) {
  return (
    <>
      <Responsive only='desktop'>
        <Modal isOpen={isOpen} onClose={onClose} hideCloseButton className='rules-detail'>
          <ModalContents>
            <Title>커뮤니티 이용규칙</Title>
            <Detail>{COMMUNITY_RULES_DETAIL}</Detail>
          </ModalContents>
        </Modal>
      </Responsive>
      <Responsive only='mobile'>
        <BottomSheet header={<Title>커뮤니티 이용규칙</Title>} isOpen={isOpen} onClose={onClose}>
          <Detail>{COMMUNITY_RULES_DETAIL}</Detail>
        </BottomSheet>
      </Responsive>
    </>
  );
}

const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 8px 0;
  max-width: 358px;
  max-height: 496px;
  overflow: scroll;
`;

const Title = styled.h1`
  padding: 0 8px;
  ${colors.gray10};
  ${textStyles.SUIT_20_B};

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 0 16px;
  }
`;

const Detail = styled.div`
  margin-top: 12px;
  padding: 0 8px;
  ${colors.gray10};
  ${fonts.BODY_13_L};
`;
