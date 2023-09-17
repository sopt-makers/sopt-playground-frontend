import styled from '@emotion/styled';
import { FC } from 'react';

import Text from '@/components/common/Text';
import FormTitle from '@/components/projects/upload/FormTitle';
import MemberForm from '@/components/projects/upload/MemberForm';
import SignUpLink from '@/components/projects/upload/SignUpLink';
import { colors } from '@sopt-makers/colors';

interface ProjectMembersProps {
  type: string;
}

const ProjectMembers: FC<ProjectMembersProps> = ({ type }) => {
  return (
    <StyledContainer>
      <FormTitle essential>{`${type} 팀원`}</FormTitle>
      <StyledDescription color={colors.gray100}>
        회원가입을 한 사람만 팀원 등록이 가능해요 <SignUpLink />
      </StyledDescription>
      <MemberForm name='members' />
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
