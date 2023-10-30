import styled from '@emotion/styled';
import { Content, Description, Portal } from '@radix-ui/react-dialog';
import { colors } from '@sopt-makers/colors';
import { useEffect, useRef, useState } from 'react';

import Responsive from '@/components/common/Responsive';
import { COMMUNITY_RULES_PREVIW } from '@/components/feed/upload/UsingRules/constants';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import BubbleTip from '@/public/icons/polygon.svg';

export default function UsingRulesPreview() {
  const rulesPreviewRef = useRef<HTMLDivElement>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const onClose = () => {
    setIsPreviewOpen(false);
  };

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', keydownHandler);

    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, []);

  useOnClickOutside(rulesPreviewRef, onClose);

  if (!isPreviewOpen) {
    return null;
  }

  return (
    <>
      <Responsive only='desktop'>
        <Portal>
          <PreviewBox>
            <BubbleTip />
            <RulesDescription>{COMMUNITY_RULES_PREVIW}</RulesDescription>
          </PreviewBox>
        </Portal>
      </Responsive>
      <Responsive only='mobile'>
        <RulesWrapper>{COMMUNITY_RULES_PREVIW}</RulesWrapper>
      </Responsive>
    </>
  );
}

const PreviewBox = styled(Content)`
  display: flex;
  position: relative;
  right: 107px;
  flex-direction: column;
  flex-wrap: wrap;
`;

const RulesDescription = styled(Description)`
  margin-top: -8px;
  border-radius: 10px;
  background-color: ${colors.gray800};
  padding: 16px;
  width: 358px;
  word-break: break-all;
`;

const RulesWrapper = styled.div`
  background-color: ${colors.gray800};
  word-break: break-all;
`;
