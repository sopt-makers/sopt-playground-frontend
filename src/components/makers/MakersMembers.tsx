import styled from '@emotion/styled';
import * as Tabs from '@radix-ui/react-tabs';
import Link from 'next/link';
import { FC, Fragment, useMemo } from 'react';

import useAuth from '@/components/auth/useAuth';
import { MakersGeneration } from '@/components/makers/data/types';
import TeamBlock from '@/components/makers/TeamBlock';
import MemberBlock from '@/components/members/common/MemberBlock';
import { playgroundLink } from '@/constants/links';
import { colors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

interface MakersMembersProps {
  className?: string;
  generations: MakersGeneration[];
  metadataList: { id: number; profileImage: string; currentCompany: string | null; generations: number[] }[];
}

const MakersMembers: FC<MakersMembersProps> = ({ className, generations, metadataList }) => {
  const { isLoggedIn } = useAuth();

  const metadataMap = useMemo(() => new Map(metadataList.map((member) => [member.id, member])), [metadataList]);

  const showNeedLogin = () => {
    alert('프로필을 보려면 로그인 해주세요.');
  };

  const resolveGenerations = (generations: number[] | null) => {
    if (!generations) {
      return null;
    }
    return `${generations.map(String).join(', ')}기`;
  };

  return (
    <StyledMakersMembers className={className}>
      <Tabs.Root defaultValue='0'>
        <Tabs.List>
          <TabList>
            {generations.map((generation, idx) => (
              <Tabs.Trigger key={idx} value={`${idx}`} asChild>
                <TabButton>{generation.title}</TabButton>
              </Tabs.Trigger>
            ))}
          </TabList>
        </Tabs.List>
        <TabBottomLine />
        {generations.map((generation, genIdx) => (
          <Tabs.Content key={genIdx} value={`${genIdx}`}>
            {generation.message && <GenerationMessage>{generation.message}</GenerationMessage>}
            {generation.teams.map((team, teamIdx) => (
              <StyledTeamBlock key={teamIdx} title={team.title} description={team.description} link={team.link}>
                <PeopleBox>
                  {team.people.map((person, personIdx) => (
                    <Fragment key={personIdx}>
                      {person.type === 'member' ? (
                        (() => {
                          const metadata = metadataMap.get(person.id);

                          return (
                            <Link
                              href={playgroundLink.memberDetail(person.id)}
                              onClick={() => metadata && !isLoggedIn && showNeedLogin()}
                            >
                              <MemberBlock
                                name={person.name}
                                position={person.position}
                                imageUrl={metadata?.profileImage}
                                badges={[
                                  resolveGenerations(metadata?.generations ?? null),
                                  metadata?.currentCompany,
                                ].filter((badge): badge is string => !!badge)}
                              />
                            </Link>
                          );
                        })()
                      ) : (
                        <MemberBlock name={person.name} position={person.position} />
                      )}
                    </Fragment>
                  ))}
                </PeopleBox>
              </StyledTeamBlock>
            ))}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </StyledMakersMembers>
  );
};

export default MakersMembers;

const StyledMakersMembers = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 800px;
`;

const TabButton = styled.a`
  transition: border-bottom-color 0.2s, color 0.2s;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 12px 24px;
  color: ${colors.gray60};

  &[data-state='active'] {
    border-bottom: 2px solid ${colors.white};
    color: ${colors.white};
  }

  ${textStyles.SUIT_20_B};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_18_B};
  }
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

const GenerationMessage = styled.div`
  margin-top: 50px;
  border-radius: 16px;
  background-color: ${colors.black80};
  padding: 32px;
  color: ${colors.gray30};

  ${textStyles.SUIT_18_M}

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 33px;
    padding: 20px;

    ${textStyles.SUIT_14_M}
  }
`;

const StyledTeamBlock = styled(TeamBlock)`
  margin-top: 80px;
`;

const PeopleBox = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  row-gap: 24px;
  column-gap: 6px;

  @media ${MOBILE_MEDIA_QUERY} {
    grid-template-columns: minmax(0, 1fr);
  }
`;
