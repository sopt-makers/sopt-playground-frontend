import Text from '@/components/common/Text';
import FormTitle from '@/components/projects/upload/FormTitle';
import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import { FC } from 'react';
import MemberForm from '@/components/projects/upload/MemberForm';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import SignupLink from '@/components/projects/upload/SignupLink';

const ProjectReleaseMembers: FC = () => {
  return (
    <StyledContainer>
      <FormTitle>추가 합류한 팀원</FormTitle>
      <StyledDescription color={colors.gray100}>
        릴리즈에 합류한 팀원들의 이름을 적어주세요
        <span className='extra'>. 회원가입을 한 사람만 팀원 등록이 가능해요 </span>
        <SignupLink />
      </StyledDescription>
      <MemberForm name='releaseMembers' />
    </StyledContainer>
  );
};

export default ProjectReleaseMembers;

const StyledContainer = styled.section`
  margin: 60px 0 0;
`;

const StyledDescription = styled(Text)`
  display: block;
  margin: 12px 0 18px;
  color: ${colors.gray100};

  @media ${MOBILE_MEDIA_QUERY} {
    .extra {
      display: none;
    }
  }
`;

const StyledSignupLink = styled(Text)`
  cursor: pointer;
  text-decoration: underline;
  color: ${colors.gray100};

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
`;
