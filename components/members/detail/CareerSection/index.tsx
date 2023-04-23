import styled from '@emotion/styled';
import Link from 'next/link';
import LinkIcon from 'public/icons/icon-link.svg';

import { MemberLink } from '@/api/members/type';
import CareerItem from '@/components/members/detail/CareerSection/CareerItem';
import InfoItem from '@/components/members/detail/InfoItem';
import MemberDetailSection from '@/components/members/detail/MemberDetailSection';
import { Career } from '@/components/members/detail/types';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface CareerSectionProps {
  careers: Career[];
  links: MemberLink[];
  skill: string;
}

export default function CareerSection({ careers, links, skill }: CareerSectionProps) {
  return (
    <StyledMemberDetailSection>
      {careers.length > 0 && (
        <InfoItem label='커리어'>
          {careers.map((career, idx) => (
            <CareerItem key={idx} career={career} />
          ))}
        </InfoItem>
      )}
      {skill.length > 0 && <InfoItem label='스킬' content={skill} />}
      {links.length > 0 && (
        <InfoItem
          label='링크'
          content={
            <LinkItems>
              {links.map((item, idx) => (
                <Link passHref href={item.url} key={idx} target='_blank'>
                  <LinkIcon />
                  <span>{item.title}</span>
                </Link>
              ))}
            </LinkItems>
          }
        />
      )}
    </StyledMemberDetailSection>
  );
}

const StyledMemberDetailSection = styled(MemberDetailSection)`
  gap: 35px;
`;

const LinkItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  & > a {
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
    @media ${MOBILE_MEDIA_QUERY} {
      gap: 6px;

      span {
        box-sizing: border-box;
        border-bottom: 1.5px solid #3c3d40;
        padding: 5px 0;
      }
    }
  }

  svg {
    width: 26px;
    height: auto;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 21px;
  }
`;
