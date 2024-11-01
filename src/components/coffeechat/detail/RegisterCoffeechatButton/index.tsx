import { Button } from '@sopt-makers/ui';

import Responsive from '@/components/common/Responsive';

interface RegisterCoffeechatButtonProps {
  onClick: () => void;
}

export default function RegisterCoffeechatButton({ onClick }: RegisterCoffeechatButtonProps) {
  return (
    <div onClick={onClick}>
      <Responsive only='desktop'>
        <Button size='lg' style={{ float: 'right' }}>
          커피챗 제안하기
        </Button>
      </Responsive>
      <Responsive only='mobile'>
        <Button size='md' style={{ width: '100%' }}>
          커피챗 제안하기
        </Button>
      </Responsive>
    </div>
  );
}
