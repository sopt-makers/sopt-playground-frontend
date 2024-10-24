import styled from '@emotion/styled';
import { IconPlus } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';

import Responsive from '@/components/common/Responsive';

export default function UploadButton() {
  return (
    <>
      <Responsive only='desktop'>
        <Button size='md' LeftIcon={IconPlus} type='submit' form='coffeechatForm'>
          커피챗 오픈하기
        </Button>
      </Responsive>
      <Responsive only='mobile'>
        <MobileButton size='lg' LeftIcon={IconPlus} type='submit' form='coffeechatForm'>
          커피챗 오픈하기
        </MobileButton>
      </Responsive>
    </>
  );
}

const MobileButton = styled(Button)`
  width: 100%;
`;
