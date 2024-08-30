export const getKoreaDate = (date: Date) => {
  let month = (date.getMonth() + 1).toLocaleString('ko-KR', { minimumIntegerDigits: 2 });
  let day = date.getDate().toLocaleString('ko-KR', { minimumIntegerDigits: 2 });
  return `${date.getFullYear()}년 ${month}월 ${day}일`;
};
