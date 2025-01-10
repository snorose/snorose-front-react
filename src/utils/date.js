import { timeAgo } from './timeAgo';

export const dateFormat = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = `${dateObj.getMonth() + 1}`.padStart(2, '0');
  const day = `${dateObj.getDate()}`.padStart(2, '0');
  return `${year}.${month}.${day}`;
};

// 게시글 상세 조회: 절대 시각 (연도/월/일 시간)
export const fullDateTimeFormat = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = `${dateObj.getMonth() + 1}`.padStart(2, '0');
  const day = `${dateObj.getDate()}`.padStart(2, '0');
  const hours = `${dateObj.getHours()}`.padStart(2, '0');
  const minutes = `${dateObj.getMinutes()}`.padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

// 게시글 목록 날짜 시간 표현
export const postBarDateFormat = (date) => {
  const targetDate = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now - targetDate) / 1000);

  if (isToday(targetDate)) {
    if (diffInSeconds < 60 * 59) {
      return timeAgo(date); // 1시간 이내: '00분 전' 또는 '00초 전'
    }
    return fullDateTimeFormat(date).split(' ')[1]; // 오늘 날짜인 경우: '16:24'
  }
  const isCurrentYear = targetDate.getFullYear() === now.getFullYear(); // 1년 이내: '12/28 16:24'
  return fullDateTimeFormat(date).slice(isCurrentYear ? 5 : 2); // 1년 이후: '23/12/28 16:24'
};

export const isToday = (date) => {
  const target = new Date(date);
  const today = new Date();

  return (
    target.getFullYear() === today.getFullYear() &&
    target.getMonth() === today.getMonth() &&
    target.getDate() === today.getDate()
  );
};

export const isDayOver = (date) => {
  const target = new Date(date);
  const today = new Date();

  target.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return target < today;
};

export const addDays = (date, days) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};
