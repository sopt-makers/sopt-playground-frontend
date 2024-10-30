import Responsive from '@/components/common/Responsive';
import { Button } from '@sopt-makers/ui';

interface RegisterCoffeechatButtonProps {
  onClick: () => void;
}

export default function RegisterCoffeechatButton({ onClick }: RegisterCoffeechatButtonProps) {
  return (
    <div onClick={onClick}>
      <Responsive only='desktop'>
        <Button size='lg'>커피챗 제안하기</Button>
      </Responsive>
      <Responsive only='mobile'>
        <Button size='md' style={{ width: '100%' }}>
          커피챗 제안하기
        </Button>
      </Responsive>
    </div>
  );
}
