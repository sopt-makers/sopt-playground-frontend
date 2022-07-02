import FormTitle from '@/components/project/upload/FormTitle';
import MemberForm from '@/components/project/upload/MemberForm';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';
import styled from '@emotion/styled';
import { FC } from 'react';
import Text from '@/components/common/Text';
import { Member } from '@/components/project/upload/MemberForm/useMemberForm';

interface ProjectMembersProps {
  members: Member[];
  onClickAdd: () => void;
  onDelete: (memberKey: number) => void;
  onChange: (member: Member) => void;
}

const ProjectMembers: FC<ProjectMembersProps> = ({ members, ...props }) => {
  return (
    <StyledContainer>
      <FormTitle essential>프로젝트 팀원</FormTitle>
      <StyledDescription color={colors.gray100}>
        회원가입을 한 사람만 팀원 등록이 가능해요 <StyledSignupLink>회원가입 링크 복사</StyledSignupLink>
      </StyledDescription>
      <StyledLinkWrapper></StyledLinkWrapper>
      <MemberForm members={members} {...props} />
    </StyledContainer>
  );
};

export default ProjectMembers;

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin: 60px 0 0;

  & > span {
    margin: 14px 0 18px;
  }
`;

const StyledDescription = styled(Text)`
  color: ${colors.gray100};
`;

const StyledSignupLink = styled(Text)`
  cursor: pointer;
  text-decoration: underline;
  color: ${colors.gray100};
`;

const StyledLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.gray100};
  ${textStyles.SUIT_14_M};
`;
