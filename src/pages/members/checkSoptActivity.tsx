import CheckSoptActivity from '@/components/members/CheckSoptActivity';

export default function CheckSoptActivityPage() {
  return (
    <div>
      <h1>활동 정보 확인</h1>
      <div>
        등록된 활동 정보가 정확한지 확인하고, 이외 활동 정보나 운팀/미팀 활동 내역이 있다면 추가로 등록해주세요.
      </div>
      <CheckSoptActivity />
    </div>
  );
}
