import FormTitle from '@/components/projects/upload/FormTitle';
import MemberForm from '@/components/projects/upload/MemberForm';
import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import { FC } from 'react';
import Text from '@/components/common/Text';
import FormItem from '@/components/common/form/FormItem';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { Toast } from '@/components/projects/upload/types';
import ProjectSignupLink from '@/components/projects/upload/ProjectSignupLink';

interface ProjectMembersProps {
  type: string;
  setToast: (toast: Toast) => void;
}

const ProjectMembers: FC<ProjectMembersProps> = ({ type, setToast }) => {
  return (
    <StyledContainer>
      <FormTitle essential>{`${type} 팀원`}</FormTitle>
      <StyledDescription color={colors.gray100}>
        회원가입을 한 사람만 팀원 등록이 가능해요 <ProjectSignupLink setToast={setToast} />
      </StyledDescription>
      <FormItem>
        <MemberForm name='members' />
      </FormItem>
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

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;
