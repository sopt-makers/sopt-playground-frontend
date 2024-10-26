import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import {Select,SelectV2} from '@sopt-makers/ui'
import { SearchField } from '@sopt-makers/ui';

import { CAREER_FILTER_OPTIONS, categoryList, PART_FILTER_OPTIONS, TOPIC_FILTER_OPTIONS } from '@/components/coffeechat/constants';
import { MB_BIG_MEDIA_QUERY, PCTA_BIG_MEDIA_QUERY, PCTA_SM_MEDIA_QUERY } from '@/styles/mediaQuery';

export default function CoffeeChatCategory() {
    
    return <Container>
        <Header>
        <Title>
            어떤 분야가 궁금하신가요?
        </Title>
        </Header>
        <CategoryList>
        {categoryList.categoryList.map((option)=>(
            <CategoryCard key={option.categoryName}>
                <CardIcon src={option.icon}></CardIcon>
                <CardName>{option.categoryName}</CardName>
            </CategoryCard>
        ))}
        </CategoryList>
        <FilterArea>
        <SelectFilterArea>
        <SelectV2.Root type='text' visibleOptions={3}>
          <SelectV2.Trigger>
            <SelectV2.TriggerContent placeholder='주제' />
          </SelectV2.Trigger>
          <SelectV2.Menu>
            {TOPIC_FILTER_OPTIONS.map((option)=>(
                <SelectV2.MenuItem key={option.value} option={option}/>))}
          </SelectV2.Menu>
        </SelectV2.Root>
        <SelectV2.Root  type='text' visibleOptions={3}>
          <SelectV2.Trigger>
            <SelectV2.TriggerContent placeholder='경력' />
          </SelectV2.Trigger>
          <SelectV2.Menu>
          {CAREER_FILTER_OPTIONS.map((option)=>(
                <SelectV2.MenuItem key={option.value} option={option}/>))}
          </SelectV2.Menu>
        </SelectV2.Root>
        <SelectV2.Root type='text' visibleOptions={3}>
          <SelectV2.Trigger>
            <SelectV2.TriggerContent placeholder='파트' />
          </SelectV2.Trigger>
          <SelectV2.Menu>
          {PART_FILTER_OPTIONS.map((option)=>(
                <SelectV2.MenuItem key={option.value} option={option}/>))}
          </SelectV2.Menu>
        </SelectV2.Root>
        </SelectFilterArea>
        <SearchField  placeholder='회사, 학교, 이름을 검색해보세요!' value={''}
        style={{"fontSize":"16px","minWidth":"335px"}}
        onSubmit={function (): void {
                throw new Error('Function not implemented.');
            } } onReset={function (): void {
                throw new Error('Function not implemented.');
            } } />
        </FilterArea>
        
    </Container>
}

const Container=styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 48px;

  media ${PCTA_SM_MEDIA_QUERY}{
    width:420px;
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
@media ${PCTA_SM_MEDIA_QUERY}{
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

&::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`


const CategoryCard=styled.button`
display: flex;
flex-shrink: 0;
gap: 8px;
align-items: center;
justify-content: center;
border-radius: 12px;
background-color: ${colors.gray800};
padding: 20px 40px;
width: 148px;

&:hover{
    background-color: ${colors.gray700};
}

&:active{
    background-color: ${colors.gray600};
}
`

const CardIcon=styled.img``

const CardName=styled.div`
${fonts.TITLE_16_SB}

white-space: nowrap;
`

const FilterArea=styled.div`
display: flex;
justify-content: space-between;
margin-top:48px;
width: 1300px;
@media ${PCTA_BIG_MEDIA_QUERY}{
    width:860px;
}
`
const SelectFilterArea=styled.div`

display:flex;
gap:12px`