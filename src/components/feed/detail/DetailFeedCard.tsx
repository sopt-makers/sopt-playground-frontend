import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Flex } from '@toss/emotion-utils';
import React from 'react';

interface DetailFeedCardProps {
  category: string;
  tag: string;
}

const DetailFeedCard = ({ category, tag }: DetailFeedCardProps) => {
  return (
    <>
      <Header>
        <Flex align='center' css={{ gap: 8 }}>
          <IconChevronLeft />
          <Chip>
            {category}
            <IconChevronRight />
            {tag}
          </Chip>
        </Flex>
      </Header>
    </>
  );
};

export default DetailFeedCard;

const Header = styled.header`
  padding: 0 24px;
`;

const IconChevronLeft = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M16.6622 3.23086C16.9622 3.53086 16.9622 4.02086 16.6622 4.32086L8.98219 12.0009L16.6622 19.6809C16.9622 19.9809 16.9622 20.4709 16.6622 20.7709C16.3622 21.0709 15.8722 21.0709 15.5722 20.7709L7.34219 12.5509C7.04219 12.2509 7.04219 11.7609 7.34219 11.4609L15.5622 3.23086C15.8622 2.93086 16.3522 2.93086 16.6522 3.23086H16.6622Z'
      fill='#FCFCFC'
    />
  </svg>
);

const Chip = styled.div`
  display: flex;
  align-items: center;
  border-radius: 21px;
  background-color: ${colors.gray400};
  padding: 7px 12px;
  color: ${colors.gray10};
`;

const IconChevronRight = () => (
  <svg width='15' height='16' viewBox='0 0 15 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M5.40156 2.55234L10.4328 7.58359C10.6641 7.81484 10.6641 8.18984 10.4328 8.42109L5.40156 13.4523C5.17031 13.6836 4.79531 13.6836 4.56406 13.4523C4.33281 13.2211 4.33281 12.8461 4.56406 12.6148L9.17656 8.00234L4.56406 3.38984C4.33281 3.15859 4.33281 2.78359 4.56406 2.55234C4.79531 2.32109 5.17031 2.32109 5.40156 2.55234Z'
      fill='#66666D'
    />
  </svg>
);
