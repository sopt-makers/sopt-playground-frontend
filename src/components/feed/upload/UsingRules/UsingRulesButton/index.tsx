import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import Responsive from '@/components/common/Responsive';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import HelpIc from '@/public/icons/icon_help.svg';
import ArrowIc from '@/public/icons/icon_more.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface UsingRulesButtonProp {
  onClick: () => void;
}

export default function UsingRulesButton({ onClick }: UsingRulesButtonProp) {
  const { logClickEvent } = useEventLogger();

  const handleShowUsingRules = () => {
    logClickEvent('communityRulesClick');
    onClick();
  };

  return (
    <>
      <ShowMoreButton type='button' onClick={handleShowUsingRules}>
        <Responsive only='desktop'>
          <ButtonWrapper>
            <HelpIc />
            <p>커뮤니티 이용규칙</p>
          </ButtonWrapper>
        </Responsive>
        <Responsive only='mobile'>
          <ButtonWrapper>
            <p>커뮤니티 이용규칙</p>
            <ArrowIc />
          </ButtonWrapper>
        </Responsive>
      </ShowMoreButton>
    </>
  );
}

const ShowMoreButton = styled.button`
  display: flex;
  align-items: center;

  ${textStyles.SUIT_13_R};

  color: ${colors.gray300};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  cursor: pointer;
  height: 22px;

  @media ${MOBILE_MEDIA_QUERY} {
    height: 16px;
  }
`;
