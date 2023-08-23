import styled from '@emotion/styled';
import { GetStaticProps } from 'next';
import { FC } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import { getMakersProfile } from '@/api/endpoint/makers/getMakersProfile';
import Footer from '@/components/common/Footer';
import SwitchableHeader from '@/components/common/Header/SwitchableHeader';
import AboutMakers from '@/components/makers/AboutMakers';
import { makersGenerationsData } from '@/components/makers/data';
import MakersMembers from '@/components/makers/MakersMembers';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { setLayout } from '@/utils/layout';

interface MakersPageProps {
  memberMetadataList: { id: number; profileImage: string; currentCompany: string | null; generations: number[] }[];
}

const MakersPage: FC<MakersPageProps> = ({ memberMetadataList }) => {
  return (
    <>
      <FixedSlot className={RemoveScroll.classNames.zeroRight}>
        <SwitchableHeader />
      </FixedSlot>
      <StyledMakersPage>
        <AboutMakers />
        <StyledMakersMembers generations={makersGenerationsData} metadataList={memberMetadataList} />
      </StyledMakersPage>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<MakersPageProps> = async () => {
  const memberList = await getMakersProfile.request();

  const memberMetadataList = memberList.map((member) => {
    const sortedCareers = member.careers.filter((career) => career.isCurrent);
    const currentCompany = sortedCareers.length > 0 ? sortedCareers.at(-1)?.companyName ?? null : null;
    const generations = member.activities.map((value) => value.generation).sort((a, b) => a - b);

    return {
      id: member.id,
      profileImage: member.profileImage ?? '',
      currentCompany,
      generations,
    };
  });

  return {
    props: {
      memberMetadataList,
    },
  };
};

setLayout(MakersPage, 'empty');

export default MakersPage;

const FixedSlot = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
`;

const StyledMakersPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  padding-bottom: 100px;
`;

const StyledMakersMembers = styled(MakersMembers)`
  margin-top: 80px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 48px;
  }
`;
