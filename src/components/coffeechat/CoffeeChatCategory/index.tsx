import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import {SelectV2} from '@sopt-makers/ui'
import { SearchField } from '@sopt-makers/ui';
import { useState } from 'react';

import { useGetMembersCoffeeChat } from '@/api/endpoint/members/getMembersCoffeeChat';
import CoffeeChatCard from '@/components/coffeechat/CoffeeChatCard';
import { CAREER_FILTER_OPTIONS, categoryList, PART_FILTER_OPTIONS, SECTION_FILTER_OPTIONS,TOPIC_FILTER_OPTIONS } from '@/components/coffeechat/constants';
import Loading from '@/components/common/Loading';
import Responsive from '@/components/common/Responsive';
import { MB_BIG_MEDIA_QUERY, MB_MID_MEDIA_QUERY, MOBILE_MEDIA_QUERY, PCTA_BIG_MEDIA_QUERY, PCTA_MID_MEDIA_QUERY, PCTA_S_MEDIA_QUERY, PCTA_SM_MEDIA_QUERY, PCTA_SM_WIDTH } from '@/styles/mediaQuery';


export default function CoffeeChatCategory() {
    const [section,setSection]=useState("");
    const [topicType,setTopicType]=useState("");
    const [career,setCareer]=useState("");
    const [part,setPart]=useState("")
    const [search,setSearch]=useState("")
    const [clientSearch,setClientSearch]=useState("")
    const queryParams = {
      ...(section && section !== "전체" && { section: section === "프론트엔드" ? "프론트" : section }),
      ...(topicType && topicType !== "전체" && { topicType }),
      ...(career && career !== "전체" && { career }),
      ...(part && part !== "전체" && { part }),
      ...(search && { search }), // search는 빈 문자열이 아닌 경우만 추가
    };
    const {data,isLoading}=useGetMembersCoffeeChat(queryParams);
    const isEmpty = (data?.coffeeChatList.length===0) == null;

    const SelectionArea = (): JSX.Element => {
      return (
        <>
          <SelectV2.Root 
            onChange={(e: number) => setTopicType(TOPIC_FILTER_OPTIONS[e - 1].label)} 
            type="text" 
            defaultValue={TOPIC_FILTER_OPTIONS.find(option => option.label===topicType)}
            visibleOptions={4}
          >
            <SelectV2.Trigger>
              <SelectV2.TriggerContent placeholder="주제" />
            </SelectV2.Trigger>
            <SelectV2.Menu>
              {TOPIC_FILTER_OPTIONS.map((option) => (
                <SelectV2.MenuItem key={option.value} option={option} />
              ))}
            </SelectV2.Menu>
          </SelectV2.Root>
    
          <SelectV2.Root 
          onChange={(e: number) => setCareer(CAREER_FILTER_OPTIONS[e - 1].label)}
          defaultValue={CAREER_FILTER_OPTIONS.find(option => option.label===career)}
          type="text"
          visibleOptions={4}
          >
            <SelectV2.Trigger>
              <SelectV2.TriggerContent placeholder="경력" />
            </SelectV2.Trigger>
            <SelectV2.Menu>
              {CAREER_FILTER_OPTIONS.map((option) => (
                <SelectV2.MenuItem key={option.value} option={option} />
              ))}
            </SelectV2.Menu>
          </SelectV2.Root>
    
          <SelectV2.Root 
          onChange={(e: number) => setPart(PART_FILTER_OPTIONS[e - 1].label)} 
          defaultValue={PART_FILTER_OPTIONS.find(option => option.label===part)}
          type="text" 
          visibleOptions={4}>
            <SelectV2.Trigger>
              <SelectV2.TriggerContent placeholder="파트" />
            </SelectV2.Trigger>
            <SelectV2.Menu>
              {PART_FILTER_OPTIONS.map((option) => (
                <SelectV2.MenuItem key={option.value} option={option} />
              ))}
            </SelectV2.Menu>
          </SelectV2.Root>
        </>
      );
    }

    return <Container>
        <Header>
        <Title>
            어떤 분야가 궁금하신가요?
        </Title>
        </Header>
        <CategoryList>
        {categoryList.categoryList.map((option)=>(
            <CategoryCard isActive={section===option.categoryName} onClick={()=>setSection(option.categoryName)} key={option.categoryName}>
                <CardIcon src={option.icon}></CardIcon>
                <CardName>{option.categoryName}</CardName>
            </CategoryCard>
        ))}
        </CategoryList>
        <Responsive only='desktop'>
        <FilterArea>
        <SelectFilterArea>
        <SelectionArea/>
        </SelectFilterArea>
        <StyledSearchField  placeholder='회사, 학교, 이름을 검색해보세요!' value={clientSearch}
        onChange={(e)=>setClientSearch(e.target.value)}
        onSubmit={()=>{setSearch(clientSearch)}}
        onReset={()=>setClientSearch("")}
        />
        </FilterArea>
        </Responsive>
        <Responsive only='mobile'>
        <FilterArea>
        <StyledSearchField  placeholder='회사, 학교, 이름을 검색해보세요!' value={search}
        onChange={(e)=>{setSearch(e.target.value)}}
        style={{}}
        onSubmit={function (): void {
                throw new Error('Function not implemented.');
            } } onReset={function (): void {
                throw new Error('Function not implemented.');
            } } />
        <SelectFilterArea>
        <SelectV2.Root 
        onChange={(e: number) => setSection(SECTION_FILTER_OPTIONS[e - 1].label)} 
        defaultValue={SECTION_FILTER_OPTIONS.find(option => option.label===section)}
        type='text' 
        visibleOptions={4}>
          <SelectV2.Trigger>
            <SelectV2.TriggerContent placeholder='분야' />
          </SelectV2.Trigger>
          <SelectV2.Menu>
            {SECTION_FILTER_OPTIONS.map((option)=>(
                <SelectV2.MenuItem key={option.value} option={option}/>))}
          </SelectV2.Menu>
        </SelectV2.Root>
        <SelectionArea/>
        </SelectFilterArea>
        </FilterArea>
        </Responsive>
        {isLoading ?
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
        :<>
        {isEmpty && (
          <StyledEmpty>
            <EmptyTitle>OMG... 검색 결과가 없어요.</EmptyTitle>
            <EmptyDescription>검색어를 바르게 입력했는지 확인하거나, 필터를 변경해보세요.</EmptyDescription>
          </StyledEmpty>
        )}
        <StyledCardList>
          {data?.coffeeChatList?.map((item)=>(<CoffeeChatCard
            key={String(item.memberId)}
      id={String(item.memberId)}
      name={item.name ?? ''}
      topicTypeList={item.topicTypeList ?? ['']}
      career={item.career ?? ''}
      profileImage={item.profileImage ?? ''}
      organization={item.organization ?? ''}
      companyJob={item.companyJob ?? ''}
      soptActivities={item.soptActivities ?? ['']}
      title={item.bio ?? ''}
      isBlurred={item.isBlind ?? ''}
      isMine={item.isMine ?? ''}>
          </CoffeeChatCard>))}
          </StyledCardList></>}
    </Container>
}

const Container=styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 48px;

  @media ${PCTA_S_MEDIA_QUERY}{
    margin-top: 28px;
  }
  @media ${MB_BIG_MEDIA_QUERY}{
    margin-top:0;
  }

  `

const Header = styled.div`
display: flex;
gap:24px;
align-items: flex-start;
justify-content: space-between;
margin-bottom:24px;
width: 1300px;
@media ${PCTA_BIG_MEDIA_QUERY}{
    width:860px;
}

@media ${PCTA_S_MEDIA_QUERY}{
    display: none;
}
`
const Title = styled.div`
  width: 100%;
  max-height:56px;
  text-align: start;
   
  ${fonts.HEADING_24_B}

  color: ${colors.white};


  @media ${MB_BIG_MEDIA_QUERY} {
    /* Heading/18_B */
    line-height: 28px; /* 155.556% */
    letter-spacing: -0.36px;
    white-space: pre-wrap;
    font-size: 18px;
  }
`;

const CategoryList=styled.div`

display: flex;
gap:16px;
width:1300px;
overflow: scroll;
  -webkit-overflow-scrolling: touch;

&::-webkit-scrollbar {
    width: 0;
    height: 0;
  } 
@media ${PCTA_BIG_MEDIA_QUERY}{
    width:860px;
}
@media ${PCTA_MID_MEDIA_QUERY}{
    padding-left:20px;
    width:100vw;
}
@media ${PCTA_S_MEDIA_QUERY}{
    display: none;
    
}
`


interface CategoryCardProps {
  isActive?: boolean;
}
const CategoryCard=styled.button<CategoryCardProps>`
display: flex;
flex-shrink: 0;
gap: 8px;
align-items: center;
justify-content: center;
border-radius: 12px;
background-color: ${({ isActive }) => {
    if (isActive) return colors.blueAlpha200;
    return colors.gray800;
  }};
padding: 20px 40px;
width: 148px;

&:hover{
  background-color: ${({ isActive }) => {
    if (isActive) return colors.blueAlpha200;
    else return colors.gray700;
  }};
}

&:active{
  background-color: ${({ isActive }) => {
    if (isActive) return colors.blueAlpha200;
    else return colors.gray600;
  }};
}
`

const CardIcon=styled.img``

const CardName=styled.div`
${fonts.TITLE_16_SB}

white-space: nowrap;
`

const FilterArea=styled.div`
display: flex;
gap:12px;
justify-content: space-between;
margin-top:48px;
width: 1300px;
@media ${PCTA_BIG_MEDIA_QUERY}{
    width:860px;
}
@media ${PCTA_SM_MEDIA_QUERY}{
    padding-right:30px;
    padding-left:30px;
    width:100%;
}
@media ${PCTA_S_MEDIA_QUERY}{
    flex-direction: column;
    align-items: center;
    margin-top:0;
    padding-right:182px;
    padding-left:172px;
}
@media ${MB_BIG_MEDIA_QUERY}{
    margin-right:20px;
    margin-left:20px;
    padding:0;
    width: 100%;

}
@media ${MB_BIG_MEDIA_QUERY}{
    width: 358px;
}
@media ${MB_MID_MEDIA_QUERY}{
    width: 320px;
}

`
const SelectFilterArea=styled.div`
display:flex;
gap:12px;
width: 100%;
-webkit-overflow-scrolling: touch; 

&::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  div{
    white-space: nowrap;
  }
@media ${PCTA_S_MEDIA_QUERY}{
display: block;
gap:0;
max-width: 424px;
max-height:48px;
overflow-x: scroll;
white-space: nowrap;

div{
    margin-right:4px;
    width: auto;
    min-width:100px;
}
}
`

const StyledSearchField=styled(SearchField)`
min-width: 335px;
font-size:16px;
@media ${PCTA_SM_MEDIA_QUERY}{
    width :272px ;
}
@media ${PCTA_S_MEDIA_QUERY}{
    width :424px;
}
@media ${MB_BIG_MEDIA_QUERY}{
    margin: 11px 20px;
    width :100%;

}
@media ${MB_MID_MEDIA_QUERY}{
    width :320px;
}
`
const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 238px;

  @media ${PCTA_MID_MEDIA_QUERY} {
    height: 206px;
  }

  @media ${PCTA_SM_MEDIA_QUERY} {
    height: 164px;
  }
`;
const StyledCardList=styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top:28px;
  margin-right:300px;
  margin-left: 300px;
  width: 1300px;

  @media ${PCTA_BIG_MEDIA_QUERY}{
    grid-template-columns: repeat(2, 1fr);
    width: 860px;
  }
  @media ${PCTA_SM_MEDIA_QUERY}{
    grid-template-columns: repeat(1, 1fr);
    width: auto;
  }
`
const StyledEmpty = styled.div`
display: flex;
flex: 1;
flex-direction: column;
gap: 12px;
align-items: center;
justify-content: center;
margin-top:200px;
margin-bottom:346px;
width: 100%;
max-height: 100%;

& > span {
  display: block;
}

@media ${MOBILE_MEDIA_QUERY} {
  gap: 12px;
}
`;

const EmptyTitle = styled.span`
${fonts.HEADING_32_B};

@media ${MOBILE_MEDIA_QUERY} {
  ${fonts.HEADING_24_B};
}
`;

const EmptyDescription = styled.span`
color: ${colors.gray400};
${fonts.BODY_16_M};

@media ${MOBILE_MEDIA_QUERY} {
  ${fonts.BODY_14_M}
}
`;