import styled from '@emotion/styled';
import { Slot } from '@radix-ui/react-slot';
import Link from 'next/link';
import LinkIcon from 'public/icons/icon-link.svg';

import { MemberLink } from '@/api/endpoint_LEGACY/members/type';
import CareerItem from '@/components/members/detail/CareerSection/CareerItem';
import InfoItem from '@/components/members/detail/InfoItem';
import MemberDetailSection from '@/components/members/detail/MemberDetailSection';
import { Career } from '@/components/members/detail/types';
import { legacyColors } from '@/styles/colors';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface CareerSectionProps {
  careers: Career[];
  links: MemberLink[];
  skill: string;
  shouldNeedOnlyItems?: boolean;
}

export default function CareerSection({ careers, links, skill, shouldNeedOnlyItems = false }: CareerSectionProps) {
  const Container = shouldNeedOnlyItems ? Slot : StyledMemberDetailSection;
  return (
    <Container>
      <>
        {careers?.length > 0 && (
          <InfoItem label='커리어'>
            <CareerItems>
              {careers.map((career, idx) => (
                <CareerWrapper key={idx}>
                  <CareerItemDecoration isCurrent={career.isCurrent} isEnd={idx === careers.length - 1}>
                    <div className='circle' />
                    <div className='line' />
                  </CareerItemDecoration>
                  <CareerItem career={career} />
                </CareerWrapper>
              ))}
            </CareerItems>
          </InfoItem>
        )}
        {skill?.length > 0 && <InfoItem label='스킬' content={skill} />}
        {links?.length > 0 && (
          <InfoItem
            label='링크'
            content={
              <LinkItems>
                {links.map((item, idx) => (
                  <Link href={item.url} key={idx} target='_blank'>
                    <LinkIcon />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </LinkItems>
            }
          />
        )}
      </>
    </Container>
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

const CareerItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CareerItemDecoration = styled.div<{ isCurrent: boolean; isEnd: boolean }>`
  position: relative;
  height: 6px;

  & > .circle {
    margin-top: 6px;
    border-radius: 50%;
    background-color: ${({ isCurrent }) => (isCurrent ? '#CDF47C' : legacyColors.gray60)};
    width: 6px;
    height: 6px;
  }

  & > .line {
    position: absolute;
    top: 16px;
    left: 2.5px;
    border-radius: 1px;
    background-color: ${legacyColors.gray60};
    width: 1px;
    height: 52px;

    ${({ isEnd }) => isEnd && 'display: none;'}

    @media ${MOBILE_MEDIA_QUERY} {
      height: 67px;
    }
  }
`;

const CareerWrapper = styled.div`
  display: flex;
  gap: 12px;
`;
