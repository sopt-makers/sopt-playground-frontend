export default function useDate() {
  const nowTime = () => {
    const now = new Date();

    const year = now.getFullYear(); // 년도
    const month = now.getMonth() + 1; // 월 (0부터 시작하므로 +1 필요)
    const day = now.getDate(); // 일

    const hours = now.getHours(); // 시
    const minutes = now.getMinutes(); // 분
    const seconds = now.getSeconds(); // 초

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return { nowTime };
}
