import styled from '@emotion/styled';

import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

interface MentoringCardProps {
  mentor: { name: string; career: string };
  keywords: string[];
  title: string;
}

export default function MentoringCard({ mentor, keywords, title }: MentoringCardProps) {
  return (
    <Container>
      <Keywords>
        {keywords.map((keyword, index) => (
          <Keyword key={`${index}-${keyword}`}>{keyword}</Keyword>
        ))}
      </Keywords>
      <Title>{title}</Title>
      <Mentor>{`${mentor.name} · ${mentor.career}`}</Mentor>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 16px;
  background-color: ${colors.black90};
  padding-top: 35px;
  padding-left: 45px;
  width: 424px;
  min-width: 424px;
  height: 224px;
`;

// TODO: 다양한 키워드 케이스(ex 하나의 키워드가 너무 김. 키워드 개수가 많음.)에 대응할 수 있는 스타일링. (현재는 소수의 노운 케이스를 하드 코딩할 예정이라 일단 고려하지 않았으며, 추후에 디자이너와 논의하기로 함.)
const Keywords = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-content: flex-end;
  margin-bottom: 12px;
  width: 234px;
  height: 56px;
`;

const Keyword = styled.span`
  border-radius: 6px;
  background-color: ${colors.black60};
  padding: 6px;
  height: fit-content;
  line-height: 14px;
  color: ${colors.gray30};

  ${textStyles.SUIT_11_M};
`;

const Title = styled.div`
  display: ${'-webkit-box'};
  margin-bottom: 24px;
  width: 234px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 22px;
  color: ${colors.gray10};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${textStyles.SUIT_18_B};
`;

const Mentor = styled.div`
  line-height: 120%;
  color: ${colors.gray60};

  ${textStyles.SUIT_14_M};
`;
