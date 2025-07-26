import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import Text from '@/components/common/Text';

import { SelectMeetingOptionItemProps } from './types';

export default function SelectMeetingOptionItem({ meetingInfo, onClick }: SelectMeetingOptionItemProps) {
  return (
    <OptionItem onClick={() => onClick(meetingInfo)}>
      <OptionContentSection>
        <OptionImage src={meetingInfo.imageUrl} alt={meetingInfo.title} />
        <OptionInfo>
          <OptionTitleSection>
            <OptionCategory>{meetingInfo.category}</OptionCategory>
            <OptionTitle>{meetingInfo.title}</OptionTitle>
          </OptionTitleSection>
          <OptionContent>{meetingInfo.contents}</OptionContent>
        </OptionInfo>
      </OptionContentSection>
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
  padding: 8px 10px;
  margin-bottom: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.gray700};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const OptionContentSection = styled.div`
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

const OptionText = styled.p`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const OptionTitleSection = styled.div`
  flex-type: 'verticalCenter';
`;

const OptionInfo = styled.div``;
const OptionContent = styled.div`
  ${fonts.BODY_13_R};
  color: ${colors.gray300};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const OptionTitle = styled(Text)`
  ${fonts.TITLE_14_SB};
  color: ${colors.gray10};
`;

const OptionCategory = styled(Text)`
  ${fonts.LABEL_14_SB};
  color: ${colors.secondary};
  margin-right: 8px;
`;
