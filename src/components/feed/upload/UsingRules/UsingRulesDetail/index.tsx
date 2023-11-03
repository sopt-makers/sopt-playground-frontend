import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import { BottomSheet } from '@/components/common/BottomSheet';
import Responsive from '@/components/common/Responsive';
import { COMMUNITY_RULES_DETAIL } from '@/components/feed/upload/UsingRules/UsingRulesDetail/constants';
import { textStyles } from '@/styles/typography';

interface UsingRulesDetailProps {
  isOpen?: boolean;
  onClose: () => void;
}

export default function UsingRulesDetail({ isOpen, onClose }: UsingRulesDetailProps) {
  return (
    <>
      <Responsive only='desktop'>
        <></>
      </Responsive>
      <Responsive only='mobile'>
        <BottomSheet header={<Title>커뮤니티 이용규칙</Title>} isOpen={isOpen} onClose={onClose}>
          <Detail>{COMMUNITY_RULES_DETAIL}</Detail>
        </BottomSheet>
      </Responsive>
    </>
  );
}

const Title = styled.h1`
  padding: 0 16px;
  ${colors.gray10};
  ${textStyles.SUIT_20_B};
`;

const Detail = styled.div`
  padding: 0 8px;
  ${colors.gray10};
  ${fonts.BODY_13_L};
`;
