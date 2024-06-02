import styled from '@emotion/styled';
import { Slot } from '@radix-ui/react-slot';
import { colors } from '@sopt-makers/colors';
import Link from 'next/link';

import { MemberLink } from '@/api/endpoint_LEGACY/members/type';
import MemberDetailSection from '@/components/members/detail/ActivitySection/MemberDetailSection';
import CareerItem from '@/components/members/detail/CareerSection/CareerItem';
import InfoItem from '@/components/members/detail/InfoItem';
import { Career } from '@/components/members/detail/types';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import MessageSection from '@/components/members/detail/MessageSection';
import { textStyles } from '@/styles/typography';
import { playgroundLink } from 'playground-common/export';
import { useRouter } from 'next/router';
import { fonts } from '@sopt-makers/fonts';

interface CareerSectionProps {
  careers: Career[];
  links: MemberLink[];
  skill: string;
  name: string;
  email: string;
  profileImage: string;
  memberId: string;
  isMine: boolean;
  shouldNeedOnlyItems?: boolean;
}

export default function CareerSection({
  careers,
  links,
  skill,
  name,
  email,
  profileImage,
  memberId,
  isMine,
  shouldNeedOnlyItems = false,
}: CareerSectionProps) {
  const router = useRouter();
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
                  <CareerItem career={career} isCurrent={career.isCurrent} />
                </CareerWrapper>
              ))}
            </CareerItems>
          </InfoItem>
        )}
        {skill?.length > 0 && <InfoItem label='스킬' content={<SkillContent>{skill}</SkillContent>} />}
        {links?.length > 0 && (
          <InfoItem
            label='링크'
            content={
              <LinkItems>
                {links.map((item, idx) => (
                  <StyledLink href={item.url} key={idx} target='_blank'>
                    <LinkIcon src={getLinkIcon(item.title)} alt={item.title} />
                    <LinkTitle>{item.title}</LinkTitle>
                  </StyledLink>
                ))}
              </LinkItems>
            }
          />
        )}
      </>
      {isMine ? (
        <MoveButton onClick={() => router.push(playgroundLink.feedUpload())}>
          <WriteIcon src='/icons/icon-pencil-simple.svg' />
          직무 경험 SOPT와 공유하기
        </MoveButton>
      ) : (
        <MessageSection name={name} email={email} profileImage={profileImage} memberId={memberId} />
      )}
    </Container>
  );
}

const StyledLink = styled(Link)`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.gray700};
  border-radius: 9999px;
  background: ${colors.gray800};
  padding: 9px 14px;
  height: 42px;
`;

const LinkTitle = styled.span`
  line-height: 18px; /* 128.571% */
  letter-spacing: -0.28px;
  color: ${colors.gray300};
  ${fonts.LABEL_14_SB}
`;

const getLinkIcon = (linkTitle: string) => {
  switch (linkTitle) {
    case 'Facebook':
      return '/icons/icon-facebook-gray.svg';
    case 'LinkedIn':
      return '/icons/icon-linkedin-gray.svg';
    case 'GitHub':
      return '/icons/icon-github-gray.svg';
    case 'Instagram':
      return '/icons/icon-instagram-gray.svg';
    case 'Behance':
      return '/icons/icon-behance-gray.svg';
    default:
      return '/icons/icon-link-gray.svg';
  }
};

const StyledMemberDetailSection = styled(MemberDetailSection)`
  position: relative;
  gap: 35px;
`;

const LinkItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  & > a {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  svg {
    width: 26px;
    height: auto;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 6px;
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
    background-color: ${({ isCurrent }) => (isCurrent ? colors.secondary : colors.gray300)};
    width: 6px;
    height: 6px;
  }

  & > .line {
    position: absolute;
    top: 16px;
    left: 2.5px;
    border-radius: 1px;
    background-color: ${colors.gray300};
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

const LinkIcon = styled.img`
  width: 14px;
  height: 14px;
  color: ${colors.gray300};
`;

const MoveButton = styled.div`
  display: flex;
  position: absolute;
  top: 40px;
  right: 40px;
  gap: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 90px;
  background-color: ${colors.gray10};
  cursor: pointer;
  padding: 12px 20px;
  height: 42px;
  color: ${colors.gray950};

  &:hover {
    background-color: ${colors.gray50};
    color: ${colors.gray950};
  }

  ${textStyles.SUIT_15_SB}

  @media ${MOBILE_MEDIA_QUERY} {
    position: static;
    border-radius: 10px;
    ${textStyles.SUIT_16_SB};
  }
`;

const WriteIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const SkillContent = styled.div`
  width: 512px;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
  }
`;
