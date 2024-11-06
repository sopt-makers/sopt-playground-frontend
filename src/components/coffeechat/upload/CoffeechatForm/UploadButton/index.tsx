import styled from '@emotion/styled';
import { Button } from '@sopt-makers/ui';

import Responsive from '@/components/common/Responsive';

interface UploadButtonProp {
  uploadType: '오픈' | '수정';
}

export default function UploadButton({ uploadType }: UploadButtonProp) {
  return (
    <div>
      <Responsive only='desktop'>
        <Button size='md' type='submit'>
          커피챗 {uploadType}하기
        </Button>
      </Responsive>
      <Responsive only='mobile'>
        <MobileButton size='lg' type='submit'>
          커피챗 {uploadType}하기
        </MobileButton>
      </Responsive>
    </div>
  );
}

const MobileButton = styled(Button)`
  width: 100%;
`;
