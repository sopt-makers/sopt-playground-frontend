import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import { IconCheck } from '@sopt-makers/icons';
import { Tag } from '@sopt-makers/ui';

import Text from '@/components/common/Text';

import { SelectMeetingOptionItemProps } from './types';

export default function SelectMeetingOptionItem({ meetingInfo, onClick }: SelectMeetingOptionItemProps) {
  return (
    <OptionItem onClick={() => onClick(meetingInfo)}>
      <OptionContent>
        <OptionImage src={meetingInfo.imageUrl} alt={meetingInfo.title} />
        <OptionText>
          <OptionHead>
            <OptionTag variant={'primary'}>{meetingInfo.category}</OptionTag>
            <OptionTitle>{meetingInfo.title}</OptionTitle>
          </OptionHead>
          <OptionCategory>{meetingInfo.contents}</OptionCategory>
        </OptionText>
      </OptionContent>
    </OptionItem>
  );
}

const OptionItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s ease;
  margin-bottom: 8px;
  border-radius: 8px;
  background-color: ${colors.gray800};
  cursor: pointer;
  padding: 8px 12px;

  &:hover {
    background-color: ${colors.gray700};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const OptionContent = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const OptionHead = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const OptionTag = styled(Tag)`
  flex-shrink: 0;
`;

const OptionImage = styled.img`
  border-radius: 6px;
  width: 48px;
  height: 48px;
  object-fit: cover;
`;

const OptionText = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionTitle = styled(Text)`
  ${fonts.BODY_16_M}

  display: box;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${colors.white};
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const OptionCategory = styled(Text)`
  ${fonts.BODY_13_R}

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.gray400};
`;
