import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import {fonts} from '@sopt-makers/fonts'
import { Tag } from '@sopt-makers/ui';
import { action } from '@storybook/addon-actions';
import { Flex } from '@toss/emotion-utils';
import { m } from 'framer-motion';
import { useRouter } from 'next/router';
import { playgroundLink } from 'playground-common/export';
import {useEffect, useState } from 'react';

import Divider from '@/components/common/Divider/Divider';
import HorizontalScroller from '@/components/common/HorizontalScroller';
import ResizedImage from '@/components/common/ResizedImage';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import MessageModal, { MessageCategory } from '@/components/members/detail/MessageSection/MessageModal';
import { MessageModalState } from '@/components/members/main/MemberList';
import { MB_BIG_MEDIA_QUERY, MB_BIG_WIDTH, MB_MID_MEDIA_QUERY, MB_MID_WIDTH, MB_SM_MEDIA_QUERY, MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
interface MentoringCardProps {
  id: string;
  title: string;
  isEmptyData?: boolean;
  topicTypeList:Array<string>;
  profileImage: string;
  name: string;
  career?:string
  organization: string;
  companyJob?: string;
  soptActivities?:Array<string>;
  isBlurred?:boolean,
  isMine?:boolean,
}

export default function CoffeeChatCard({
  id,
  title,
  isEmptyData,
  topicTypeList,
  profileImage,
  name,
  career,
  organization,
  companyJob,
  soptActivities
  ,isBlurred,
  isMine
}: MentoringCardProps) {
  const router = useRouter();
  const [messageModalState, setMessageModalState] = useState<MessageModalState>({ show: false });
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [sortedActivities, setSortedActivities] = useState<string[]>([]);
  const { logClickEvent } = useEventLogger();
  if(career=="아직 없어요"){
    career=undefined
  }


  useEffect(() => {
    // 중복 제거 및 정렬
    const uniqueSortedActivities = Array.from(new Set(soptActivities)).sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)![0]); // 문자열에서 숫자 추출
      const numB = parseInt(b.match(/\d+/)![0]);
      return numB - numA; // 내림차순 정렬
    });
    
    // 정렬된 결과를 상태에 저장
    setSortedActivities(uniqueSortedActivities);
  }, [soptActivities]);


  return (
    <>
      <Container
        whileHover={{
          y: -4,
        }}
        onClick={() => {
          router.push(playgroundLink.memberDetail(id));
          logClickEvent('coffeechatCard');
        }}
        isEmptyData={isEmptyData}
        isBlurred={isBlurred}
      >
        <TitleSection>
          <Title>{title}</Title>
          <TagSection>
              {topicTypeList
                ?.map((topic) => topic.trim())
                .filter(Boolean)
                .map((topic) => (
                  <Tag size='md' shape='rect' variant='secondary' type='solid' key={topic}>
                    {topic}
                  </Tag>
                ))}
          </TagSection>
          </TitleSection>
        <Divider color='#3F3F47'/>
        <ProfileSection>
          <ImageBox>
            <EmptyProfileImage hide={isImageLoaded}>
              <DefaultImage src='/icons/icon-profile.svg' loading='lazy' decoding='async' />
            </EmptyProfileImage>
            {profileImage && (
              <ResizedProfileImage
                src={profileImage}
                onLoad={() => setIsImageLoaded(true)}
                hide={!isImageLoaded}
                width={68}
              />
            )}
          </ImageBox>
          <InfoSection>
            {!career? <UserName> {name}</UserName>: <UserName> {name ? `${name} | ${career}` : career}</UserName>}
          <Career>{companyJob ? `${organization} | ${companyJob}` : organization}</Career>
          <SoptTagSection>
            {sortedActivities
            ?.map((activity)=>(
            <>
            {activity.includes("35")? (
          <Tag key={activity} size="sm" shape="rect" variant="primary" type="solid">
            <TagEllipse alt='' src='/icons/logo/coffeechatCategory/ic_ellipse.svg'></TagEllipse>
          {activity}
          </Tag>
          ) : (
          <Tag key={activity} size="sm" shape="rect" type="solid">
            <TagLabel>{activity}</TagLabel>
          </Tag>
          )}
            </>
            ))}
            
          </SoptTagSection>
          </InfoSection>
        </ProfileSection>
      </Container>
      {messageModalState.show && (
        <MessageModal
          receiverId={messageModalState.data.targetId}
          name={messageModalState.data.name}
          profileImageUrl={messageModalState.data.profileUrl}
          onClose={() => setMessageModalState({ show: false })}
          defaultCategory={MessageCategory.COFFEE_CHAT}
        />
      )}
    </>
  );
}

const Container = styled(m.div)<{ isEmptyData?: boolean; isBlurred?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 11px;
  align-items: flex-start;
  justify-content: space-between;
  border-radius: 24px;
  background: ${colors.gray900};
  cursor: pointer;
  padding: 32px;
  width:420px;
  min-width: 420px;
  height: 280px;
  overflow: hidden;
  ${({ isEmptyData }) =>
    isEmptyData &&
    css`
      pointer-events: none;
    `};
  ${({ isBlurred }) =>
    isBlurred &&
    css`
      filter: blur(5px);
    `};
  
  @media ${MB_BIG_MEDIA_QUERY} {
    gap:4px;
    border-radius: 20px;
    padding: 24px;
    width: 400px;
    min-width:400px;
    height: 234px;
  }
  @media ${MB_MID_MEDIA_QUERY}{
    padding:24px;
    width:320px;
    min-width:320px;
  }
  @media ${MB_SM_MEDIA_QUERY}{
    width:280px;
    max-width:280px;
  }
`;

const Title = styled.div`
  display: ${'-webkit-box'};;
  height: 56px;
  overflow: hidden;
  text-overflow: ellipsis;

  ${fonts.HEADING_18_B}

  white-space: pre-line;
  word-break: break-word;
  color: ${colors.white};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  
  @media ${MB_BIG_MEDIA_QUERY} {
    width:342px;
    max-width:342px;
    height:48px;
    max-height: 48px;
    ${fonts.HEADING_16_B};
  }
  @media ${MB_MID_MEDIA_QUERY}{
    width: 272px;
    max-width:272px;
  }
  @media ${MB_SM_MEDIA_QUERY}{
    width: 232px;
    max-width:232px;
  }
`;

const Career = styled.div`
  /* Label/14_SB */
 ${fonts.TITLE_14_SB}

 max-width:266px;
 overflow: hidden;
 text-overflow: ellipsis;  
  white-space: nowrap;
  color:${colors.gray400};
  @media ${MB_BIG_MEDIA_QUERY} {
    max-width:256px;
    ${fonts.BODY_13_M}
    
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  
  @media ${MOBILE_MEDIA_QUERY} {
    justify-content: flex-end;
  }
`;
const ImageBox = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  clip-path: circle(50%);

`;

const EmptyProfileImage = styled.div<{ hide?: boolean }>`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: ${colors.gray700};
  width: 70px;
  height: 70px;

  ${(props) =>
    props.hide &&
    css`
      visibility: hidden;
    `};


`;

const DefaultImage = styled.img`
  width: 34px;
  height: 34px;
`;

const ResizedProfileImage = styled(ResizedImage)<{ hide?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${(props) =>
    props.hide &&
    css`
      visibility: hidden;
    `};
`;

const TitleSection=styled.div`
display: flex;
flex-direction: column;
gap:16px;
height:96px;
min-height:96px;
@media ${MB_BIG_MEDIA_QUERY}{
  gap:4px;
  height:80px;
  min-height:80px;
}

`
const TagSection=styled.div`
display: flex;
flex-wrap: nowrap;
gap: 4px;
max-width: 100%;
overflow:  hidden;
white-space: nowrap;

div{@media ${MOBILE_MEDIA_QUERY} {
    font-size: 11px  !important;
  }
}
`
const InfoSection=styled.div`
display:flex;
flex-direction: column;
justify-content: center;
margin-left:20px;
`
const UserName=styled.div`
  ${fonts.TITLE_16_SB}

  margin-bottom:2px; 
  max-width:266px;
  overflow: hidden; 
  text-overflow: ellipsis;
  white-space: nowrap;

  @media ${MB_MID_WIDTH} {
    ${fonts.TITLE_14_SB}

    max-width:256px;
  }
`
const SoptTagSection=styled.div`
display: flex;
gap:4px;
margin-top:12px; 
color:${colors.gray200};

div{
  white-space: nowrap;
}
`
const TagEllipse=styled.img`
margin-right:4px;
width:6px;
height:6px;
`
//mds tag 색 커스텀 기능 적용전 임시 스타일링입니다.
const TagLabel=styled.span` 
  ${fonts.LABEL_11_SB};

color:${colors.gray200}
` 