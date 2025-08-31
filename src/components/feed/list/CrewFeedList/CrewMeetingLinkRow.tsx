import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { IconChevronRight } from '@sopt-makers/icons';
import { useRouter } from 'next/router';

import Text from '@/components/common/Text';
import { crewLink } from '@/constants/links';

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
        <Text color={colors.secondary}>{category}</Text>
        <Text color={colors.gray30}>{title}</Text>
      </LabelContainer>
      <StyledChevronRight />
    </Container>
  );
};

export default CrewMeetingLinkRow;

const Container = styled.button`
  display: flex;
  gap: 16px;
  align-items: center;
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
