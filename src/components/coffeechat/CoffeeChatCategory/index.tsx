import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';
import {Select} from '@sopt-makers/ui'
import { SearchField } from '@sopt-makers/ui';

import { categoryList } from '@/components/coffeechat/constants';
import { MB_BIG_MEDIA_QUERY, PCTA_SM_MEDIA_QUERY } from '@/styles/mediaQuery';

export default function CoffeeChatCategory() {
    

    return <Container>
        <Header>
        <Title>
            어떤 분야가 궁금하신가요?
        </Title>
        <CategoryList>
        {categoryList.categoryList.map((option)=>(
            <CategoryCard key={option.categoryName}>
                <CardIcon src={option.icon}></CardIcon>
                <CardName>{option.categoryName}</CardName>
            </CategoryCard>
        ))}
        </CategoryList>
        </Header>
        <FilterArea>
        <SelectFilterArea>
        <Select placeholder="주제" type={"text"} options={[]} onChange={function (value: string | number | boolean): void {
                throw new Error('Function not implemented.');
            } }></Select>
                    <Select placeholder="경력" type={"text"} options={[]} onChange={function (value: string | number | boolean): void {
                throw new Error('Function not implemented.');
            } }></Select>
                    <Select placeholder="파트" type={"text"} options={[]} onChange={function (value: string | number | boolean): void {
                throw new Error('Function not implemented.');
            } }></Select>
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
flex-direction: column;
gap:24px;
align-items: flex-start;
justify-content: space-between;
width: 1300px;
`
const Title = styled.div`
  max-height:56px;
  text-align: start;

  /* Heading/24_B */
  line-height: 36px; /* 150% */
  letter-spacing: -0.48px;
  color: ${colors.white};
  font-size: 24px;
  font-weight: 700;

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
`
const SelectFilterArea=styled.div`

display:flex;
gap:12px`