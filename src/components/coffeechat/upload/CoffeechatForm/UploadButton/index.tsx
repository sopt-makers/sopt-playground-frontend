import Responsive from '@/components/common/Responsive';
import { IconPlus } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';

interface UploadButtonProps {
  onClick?: () => {};
}

export default function UploadButton({ onClick }: UploadButtonProps) {
  return (
    <div onClick={onClick}>
      <Responsive only='desktop'>
        <Button size='md' LeftIcon={IconPlus} type='submit'>
          커피챗 오픈하기
        </Button>
      </Responsive>
      <Responsive only='mobile'>
        <Button size='lg' LeftIcon={IconPlus} type='submit'>
          커피챗 오픈하기
        </Button>
      </Responsive>
    </div>
  );
}
