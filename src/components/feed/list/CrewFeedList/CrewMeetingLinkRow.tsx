import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconChevronRight } from '@sopt-makers/icons';
import { useRouter } from 'next/router';

import Text from '@/components/common/Text';
import { crewLink } from '@/constants/links';
import { textStyles } from '@/styles/typography';

interface CrewMeetingLinkRowProps {
  category: string;
  title: string;
  meetingId: number;
}

const CrewMeetingLinkRow = ({ category, title, meetingId }: CrewMeetingLinkRowProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(crewLink.groupDetail(meetingId));
  };

  return (
    <Container onClick={handleClick}>
      <LabelContainer>
        <CategoryText>{category}</CategoryText>
        <TitleText>{title}</TitleText>
      </LabelContainer>
      <StyledChevronRight />
    </Container>
  );
};

export default CrewMeetingLinkRow;

const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  background-color: ${colors.gray800};
  padding: 14px 16px;
  width: 100%;
`;

const LabelContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledChevronRight = styled(IconChevronRight)`
  width: 20px;
  height: 20px;
  color: ${colors.gray200};
`;

const CategoryText = styled(Text)`
  flex-shrink: 0;

  ${textStyles.SUIT_14_M};

  color: ${colors.secondary};
`;

const TitleText = styled(Text)`
  ${textStyles.SUIT_14_M};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.gray30};
`;
