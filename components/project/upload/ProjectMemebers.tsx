import FormTitle from '@/components/project/upload/FormTitle';
import MemberForm from '@/components/project/upload/MemberForm';
import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import { FC } from 'react';
import Text from '@/components/common/Text';
import FormItem from '@/components/common/form/FormItem';
import { useFormContext } from 'react-hook-form';
import { ProjectUploadForm } from '@/pages/project/upload';
import useScreenSize from '@/hooks/useScreenSize';

interface ProjectMembersProps {
  type: string;
}

const ProjectMembers: FC<ProjectMembersProps> = ({ type }) => {
  const {
    formState: { errors },
  } = useFormContext<ProjectUploadForm>();
  const { isMobile } = useScreenSize();

  return (
    <StyledContainer>
      <FormTitle essential>{`${type} 팀원`}</FormTitle>
      <StyledDescription color={colors.gray100}>
        회원가입을 한 사람만 팀원 등록이 가능해요 <StyledSignupLink>회원가입 링크 복사</StyledSignupLink>
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

  @media screen and (max-width: 375px) {
    display: none;
  }
`;
