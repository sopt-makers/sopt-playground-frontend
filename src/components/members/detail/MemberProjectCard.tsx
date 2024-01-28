import Link from 'next/link';
import { FC } from 'react';

import { MemberProject } from '@/api/endpoint_LEGACY/members/type';
import ContentsCard from '@/components/common/ContentsCard';
import { PROJECT_CATEGORY_LABEL } from '@/components/members/detail/constants';
import { playgroundLink } from '@/constants/links';

const MemberProjectCard: FC<MemberProject> = ({
  id,
  name,
  category,
  generation,
  serviceType,
  summary,
  thumbnailImage,
  logoImage,
}) => {
  const projectCategory = generation
    ? `${serviceType} | ${generation}기 ${PROJECT_CATEGORY_LABEL[category]}`
    : PROJECT_CATEGORY_LABEL[category];

  console.log(id);

  return (
    <Link href={playgroundLink.projectDetail(id)}>
      <ContentsCard
        thumbnail={thumbnailImage ? thumbnailImage : logoImage}
        title={name}
        top={projectCategory}
        bottom={summary}
      />
    </Link>
  );
};

export default MemberProjectCard;
