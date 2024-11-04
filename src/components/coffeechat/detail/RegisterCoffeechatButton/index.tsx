import { Button } from '@sopt-makers/ui';

import Responsive from '@/components/common/Responsive';
import { LoggingClick } from '@/components/eventLogger/components/LoggingClick';

interface RegisterCoffeechatButtonProps {
  onClick: () => void;
}

export default function RegisterCoffeechatButton({ onClick }: RegisterCoffeechatButtonProps) {
  return (
    <LoggingClick eventKey='sendCoffeechat'>
      <div onClick={onClick}>
        <Responsive only='desktop'>
          <Button size='lg' style={{ whiteSpace: 'nowrap' }}>
            커피챗 제안하기
          </Button>
        </Responsive>
        <Responsive only='mobile'>
          <Button size='md' style={{ width: '100%', whiteSpace: 'nowrap' }}>
            커피챗 제안하기
          </Button>
        </Responsive>
      </div>
    </LoggingClick>
  );
}
