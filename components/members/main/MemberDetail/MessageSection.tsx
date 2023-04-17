import styled from '@emotion/styled';
import WarningIcon from 'public/icons/icon-warning.svg';

import Responsive from '@/components/common/Responsive';
import MemberDetailSection from '@/components/members/main/MemberDetail/Section';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MessageSectionProps {
  name: string;
  email: string;
  onClick: () => void;
}

export default function MessageSection({ name, email, onClick }: MessageSectionProps) {
  return (
    <Container>
      <div>
        <Title>{name}에게 하고 싶은 질문이 있나요?</Title>
        <Subtitle>“저에게 궁금한게 있다면 편하게 남겨주세요~”</Subtitle>
      </div>
      <ButtonWrapper>
        <Button onClick={onClick} disabled={email.length < 1} className='message-button'>
          쪽지 보내기
        </Button>
        {(email.length < 1 || email === null) && (
          <Responsive only='desktop'>
            <NoMessageTooltip className='no-message-tooltip'>
              <WarningIcon />
              <div className='content'>{`해당 유저는 이메일을 등록하지 않아\n쪽지를 보낼 수 없어요.`}</div>
            </NoMessageTooltip>
          </Responsive>
        )}
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled(MemberDetailSection)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 36px;
  padding-bottom: 36px;

  .message-button:hover + .no-message-tooltip {
    opacity: 1;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 24px;
  }
`;

const Title = styled.div`
  color: ${colors.white100};
  ${textStyles.SUIT_18_SB}
  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_16_SB}
  }
`;

const Subtitle = styled.div`
  margin-top: 12px;
  color: ${colors.gray60};
  ${textStyles.SUIT_16_M}
  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_M}
  }
`;

const Button = styled.div<{ disabled: boolean }>`
  border-radius: 14px;
  background-color: ${({ disabled }) => (disabled ? colors.black60 : colors.purple100)};
  cursor: pointer;
  padding: 15px 36px;
  color: ${({ disabled }) => (disabled ? colors.gray60 : colors.white100)};

  ${textStyles.SUIT_15_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 34px;
    padding: 15px;
    width: 100%;
    text-align: center;
    ${textStyles.SUIT_16_SB}
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
  width: max-content;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;

const NoMessageTooltip = styled.div`
  display: flex;
  position: absolute;
  bottom: -80px;
  gap: 6px;
  visibility: 0;

  /* opacity: 0; */
  border-radius: 10px;
  background-color: ${colors.black60};
  padding: 17px;
  width: max-content;

  &::before {
    position: absolute;
    top: -9px;
    left: 23px;
    border-top: 0 solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 10px solid ${colors.black60};
    border-left: 6px solid transparent;
    content: '';
  }

  & .content {
    white-space: pre-line;
    color: ${colors.gray30};

    ${textStyles.SUIT_12_M}
  }
`;
