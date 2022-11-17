import styled from '@emotion/styled';
import { FC } from 'react';

import AboutMakers from '@/components/makers/AboutMakers';
import { makersGenerationsData } from '@/components/makers/data';
import MakersMembers from '@/components/makers/MakersMembers';

const MakersPage: FC = () => {
  return (
    <StyledMakersPage>
      <AboutMakers />
      <StyledMakersMembers generations={makersGenerationsData} />
    </StyledMakersPage>
  );
};

export default MakersPage;

const StyledMakersPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledMakersMembers = styled(MakersMembers)`
  margin-top: 80px;
`;
