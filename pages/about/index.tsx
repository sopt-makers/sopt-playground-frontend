import styled from '@emotion/styled';
import { FC } from 'react';

import AboutMakers from '@/components/about/AboutMakers';
import { makersGenerationsData } from '@/components/about/data';
import MakersMembers from '@/components/about/MakersMembers';

const AboutPage: FC = () => {
  return (
    <StyledAboutPage>
      <AboutMakers />
      <StyledMakersMembers generations={makersGenerationsData} />
    </StyledAboutPage>
  );
};

export default AboutPage;

const StyledAboutPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledMakersMembers = styled(MakersMembers)`
  margin-top: 80px;
`;
