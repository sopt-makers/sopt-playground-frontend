import styled from '@emotion/styled';
import { FC } from 'react';

import { makersMembers } from '@/components/about/makersMembersData';
import Notifier from '@/components/about/Notifier';
import PersonBlock from '@/components/about/PersonBlock';
import TeamBlock from '@/components/about/TeamBlock';
import { textStyles } from '@/styles/typography';

const AboutMakers: FC = () => {
  return (
    <StyledAbout>
      <MakersLogoBox>
        <StyledLogo src='/logos/logo-full.svg' alt='makers-logo' />
      </MakersLogoBox>
      <Intro>
        sopt makers는 SOPT 구성원들이 가진 불편함을 제품을 통해 해결하여, 2000여명의 구성원들에게 더 많은 가치를
        연결하기 위해 신설된 특수 기구에요.
      </Intro>
      <StyledNotifier />

      {makersMembers.map((page) =>
        page.teams.map((team, teamIdx) => (
          <StyledTeamBlock key={teamIdx} title={team.title} description={team.description}>
            <PeopleBox>
              {team.people.map((person, personIdx) => (
                <PersonBlock key={personIdx} name={person.name} position={person.position} imageUrl={person.imageUrl} />
              ))}
            </PeopleBox>
          </StyledTeamBlock>
        )),
      )}
    </StyledAbout>
  );
};

export default AboutMakers;

const StyledAbout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  max-width: 800px;
`;

const MakersLogoBox = styled.div``;

const StyledLogo = styled.img`
  width: 470px;
`;

const Intro = styled.div`
  ${textStyles.SUIT_28_M}

  margin-top: 80px;
`;

const StyledNotifier = styled(Notifier)`
  margin-top: 80px;
`;

const StyledTeamBlock = styled(TeamBlock)`
  margin-top: 80px;
`;

const PeopleBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 24px;
`;
