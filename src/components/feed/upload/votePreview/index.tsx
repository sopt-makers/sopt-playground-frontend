import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconAlertCircle, IconCheckSquare, IconDotsVertical, IconTrash, IconWrite } from '@sopt-makers/icons';
import { Flex } from '@toss/emotion-utils';

import Text from '@/components/common/Text';
import FeedDropdown from '@/components/feed/common/FeedDropdown';

interface VotePreviewProps {
  onOpenVoteModal: () => void;
  resetVote: () => void;
}

const VotePreview = ({ onOpenVoteModal, resetVote }: VotePreviewProps) => {
  return (
    <StyledVotePreview>
      <PreviewBox>
        <Flex>
          <StyledIconCheckSquare />
          <StyledContent>
            <Text typography='SUIT_14_SB' color={colors.gray10}>
              투표
            </Text>
            <Text typography='SUIT_13_M' color={colors.gray100}>
              응답 n개, 복수 선택 가능
            </Text>
          </StyledContent>
        </Flex>
        <FeedDropdown
          trigger={
            <button css={{ height: '20px' }}>
              <StyledIconDotsVertical />
            </button>
          }
        >
          <FeedDropdown.Item onClick={onOpenVoteModal}>
            <Flex align='center' css={{ gap: '10px', color: `${colors.gray10}` }}>
              <IconWrite css={{ width: '16px', height: '16px' }} />
              수정
            </Flex>
          </FeedDropdown.Item>
          <FeedDropdown.Item type='danger' onClick={resetVote}>
            <Flex align='center' css={{ gap: '10px' }}>
              <IconTrash css={{ width: '16px', height: '16px' }} />
              삭제
            </Flex>
          </FeedDropdown.Item>
        </FeedDropdown>
      </PreviewBox>

      <AlertBox>
        <StyledIconAlertCircle />
        <Text typography='SUIT_12_SB'>글을 올린 후, 투표는 수정 및 삭제가 불가능해요.</Text>
      </AlertBox>
    </StyledVotePreview>
  );
};

export default VotePreview;

const StyledVotePreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
  width: 100%;
  height: 102px;
`;

const PreviewBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-radius: 12px;
  background-color: ${colors.gray800};
  padding: 16px;
  width: 100%;
  height: 74px;
`;

const StyledIconCheckSquare = styled(IconCheckSquare)`
  margin-right: 8px;
  width: 20px;
  height: 20px;
`;

const StyledIconDotsVertical = styled(IconDotsVertical)`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AlertBox = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  color: ${colors.gray300};
`;

const StyledIconAlertCircle = styled(IconAlertCircle)`
  width: 14px;
  height: 14px;
`;
