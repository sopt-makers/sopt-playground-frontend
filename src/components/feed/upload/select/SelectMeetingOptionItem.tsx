import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconCheck } from '@sopt-makers/icons';

import Text from '@/components/common/Text';

import { SelectMeetingOptionItemProps } from './types';

export default function SelectMeetingOptionItem({ meetingInfo, isSelected, onClick }: SelectMeetingOptionItemProps) {
  return (
    <OptionItem onClick={() => onClick(meetingInfo)}>
      <OptionContent>
        <OptionImage src={meetingInfo.imageUrl} alt={meetingInfo.title} />
        <OptionText>
          <OptionTitle>{meetingInfo.title}</OptionTitle>
          <OptionCategory>{meetingInfo.category}</OptionCategory>
        </OptionText>
      </OptionContent>
      {isSelected && <CheckIcon />}
    </OptionItem>
  );
}

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background-color: ${colors.gray800};
  cursor: pointer;
  padding: 12px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.gray700};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const OptionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const OptionImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 6px;
  object-fit: cover;
`;

const OptionText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const OptionTitle = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.white};
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const OptionCategory = styled(Text)`
  font-size: 12px;
  color: ${colors.gray400};
  line-height: 1.2;
`;

const CheckIcon = styled(IconCheck)`
  width: 20px;
  height: 20px;
  color: ${colors.success};
  flex-shrink: 0;
`;
