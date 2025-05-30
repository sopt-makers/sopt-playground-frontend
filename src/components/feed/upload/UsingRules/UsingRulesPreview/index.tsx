import styled from '@emotion/styled';
import { Content, Overlay, Root } from '@radix-ui/react-dialog';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import dynamic from 'next/dynamic';

import { COMMUNITY_RULES_PREVIEW } from '@/components/feed/upload/UsingRules/constants';
import BubbleTip from '@/public/icons/polygon.svg';
import { textStyles } from '@/styles/typography';

const Portal = dynamic(() => import('@radix-ui/react-dialog').then((res) => res.Portal), { ssr: false });

interface UsingRulesPreviewProp {
  isOpen: boolean;
  onClose: () => void;
}

export default function UsingRulesPreview({ isOpen, onClose }: UsingRulesPreviewProp) {
  return <RulesWrapper>{COMMUNITY_RULES_PREVIEW}</RulesWrapper>;
}

const PreviewBox = styled(Content)`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  flex-direction: column;
  align-items: flex-end;
  margin: 45px 107px 0 0;
  width: 358px;
  height: 166px;
`;

const RulesDescription = styled.div`
  position: absolute;
  bottom: 0;
  margin-top: -8px;
  border-radius: 10px;
  background-color: ${colors.gray800};
  padding: 16px;
  width: 358px;
  word-break: break-all;
  color: ${colors.gray50};

  ${fonts.BODY_13_L};
`;

const BubbleTipIcon = styled(BubbleTip)`
  margin-right: 48px;
`;

const RulesWrapper = styled.div`
  margin-bottom: 8px;
  width: 100%;
  word-break: break-all;
  color: ${colors.gray500};

  ${textStyles.SUIT_12_R}
`;
