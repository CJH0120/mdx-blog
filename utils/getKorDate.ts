export const getKoreaDate = (date: Date) => {
  let month = (date.getMonth() + 1).toLocaleString('ko-KR', { minimumIntegerDigits: 2 });
  let day = date.getDate().toLocaleString('ko-KR', { minimumIntegerDigits: 2 });
  return `${date.getFullYear()}년 ${month}월 ${day}일`;
};

export const getEnglishDate = (date: Date) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 });
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};
