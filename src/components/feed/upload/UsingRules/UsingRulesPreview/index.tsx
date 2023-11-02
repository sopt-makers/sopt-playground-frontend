import styled from '@emotion/styled';
import { Content, Overlay, Portal, Root } from '@radix-ui/react-dialog';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { useEffect, useState } from 'react';

import Responsive from '@/components/common/Responsive';
import { COMMUNITY_RULES_PREVIEW } from '@/components/feed/upload/UsingRules/constants';
import BubbleTip from '@/public/icons/polygon.svg';
import { textStyles } from '@/styles/typography';

export default function UsingRulesPreview() {
  const [isOpen, setIsOpen] = useState(true);

  const handlePreviewModal = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 5000);
  }, []);

  return (
    <>
      <Responsive only='desktop'>
        <Root open={isOpen} onOpenChange={handlePreviewModal}>
          <Portal>
            <Overlay />
            <PreviewBox>
              <BubbleTipIcon />
              <RulesDescription>{COMMUNITY_RULES_PREVIEW}</RulesDescription>
            </PreviewBox>
          </Portal>
        </Root>
      </Responsive>
      <Responsive only='mobile'>
        <RulesWrapper>{COMMUNITY_RULES_PREVIEW}</RulesWrapper>
      </Responsive>
    </>
  );
}

const PreviewBox = styled(Content)`
  display: flex;
  position: fixed;
  right: 107px;
  flex-direction: column;
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
  position: absolute;
  top: 0;
  right: 48px;
`;

const RulesWrapper = styled.div`
  margin-bottom: 8px;
  width: 100%;
  word-break: break-all;
  color: ${colors.gray500};

  ${textStyles.SUIT_12_R}
`;
