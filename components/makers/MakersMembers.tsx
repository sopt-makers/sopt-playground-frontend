import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Tab } from '@headlessui/react';
import { FC, Fragment, useMemo } from 'react';

import { useGetMemberProfile } from '@/apiHooks/members';
import { MakersGeneration, MakersPerson } from '@/components/makers/data/types';
import PersonBlock from '@/components/makers/PersonBlock';
import TeamBlock from '@/components/makers/TeamBlock';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface MakersMembersProps {
  className?: string;
  generations: MakersGeneration[];
}

const MakersMembers: FC<MakersMembersProps> = ({ className, generations }) => {
  const { data, isLoading } = useGetMemberProfile();

  const memberImageMap = useMemo(() => {
    const map = new Map();
    if (!data) {
      return map;
    }
    data.forEach((x) => {
      map.set(x.id, x.profileImage);
    });

    return map;
  }, [data]);

  const resolveProfileImage = (person: MakersPerson) => {
    if (person.type === 'raw') {
      return person.imageUrl;
    }
    if (isLoading && !data) {
      return undefined;
    }

    return memberImageMap.get(person.id) ?? undefined;
  };

  return (
    <StyledMakersMembers className={className}>
      <Tab.Group>
        <Tab.List as={TabList}>
          {generations.map((generation, idx) => (
            <Tab key={idx} as={Fragment}>
              {({ selected }) => <TabButton selected={selected}>{generation.title}</TabButton>}
            </Tab>
          ))}
        </Tab.List>
        <TabBottomLine />
        <Tab.Panels>
          {generations.map((generation, genIdx) => (
            <Tab.Panel key={genIdx}>
              {generation.teams.map((team, teamIdx) => (
                <StyledTeamBlock key={teamIdx} title={team.title} description={team.description} link={team.link}>
                  <PeopleBox>
                    {team.people.map((person, personIdx) => (
                      <PersonBlock
                        key={personIdx}
                        name={person.name}
                        position={person.position}
                        imageUrl={resolveProfileImage(person)}
                        link={person.type === 'member' ? `members/detail?memberId=${person.id}` : undefined}
                      />
                    ))}
                  </PeopleBox>
                </StyledTeamBlock>
              ))}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </StyledMakersMembers>
  );
};

export default MakersMembers;

const StyledMakersMembers = styled.div`
  padding: 20px;
  max-width: 800px;
`;

const TabButton = styled.a<{ selected: boolean }>`
  transition: border-bottom-color 0.2s, color 0.2s;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 12px 24px;

  ${(props) =>
    props.selected
      ? css`
          border-bottom: 2px solid ${colors.white};
        `
      : css`
          color: ${colors.gray60};
        `}

  ${textStyles.SUIT_20_B};
`;

const TabList = styled.div`
  display: flex;
`;

const TabBottomLine = styled.div`
  transform: translateY(-1px);

  /* transform: translateY(-1px); */
  z-index: -1;
  margin: 0;
  border-bottom: 1px solid rgb(255 255 255 / 20%);
`;

const StyledTeamBlock = styled(TeamBlock)`
  margin-top: 80px;
`;

const PeopleBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 24px;
  column-gap: 6px;
`;
