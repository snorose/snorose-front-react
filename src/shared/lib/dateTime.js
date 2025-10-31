const MINUTE_SECONDS = 60;
const HOUR_SECONDS = 60 * 60;
const DAY_SECONDS = 60 * 60 * 24;
const MONTH_SECONDS = 60 * 60 * 24 * 30;
const YEAR_SECONDS = 60 * 60 * 24 * 30 * 12;

/**
 * YYYY.MM.DD
 */
export const dateFormat = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = `${dateObj.getMonth() + 1}`.padStart(2, '0');
  const day = `${dateObj.getDate()}`.padStart(2, '0');
  return `${year}.${month}.${day}`;
};

/**
 * YYYY/MM/DD HH:MM
 */
export const fullDateTimeFormat = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = `${dateObj.getMonth() + 1}`.padStart(2, '0');
  const day = `${dateObj.getDate()}`.padStart(2, '0');
  const hours = `${dateObj.getHours()}`.padStart(2, '0');
  const minutes = `${dateObj.getMinutes()}`.padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

/**
 * same year: MM/DD HH:MM
 * other year: YYYY/MM/DD HH:MM
 */
export const postBarDateFormat = (date) => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now - targetDate) / 1000);

  const year = targetDate.getFullYear();
  const month = `${targetDate.getMonth() + 1}`.padStart(2, '0');
  const day = `${targetDate.getDate()}`.padStart(2, '0');
  const hours = `${targetDate.getHours()}`.padStart(2, '0');
  const minutes = `${targetDate.getMinutes()}`.padStart(2, '0');

  if (isToday(targetDate)) {
    return diffInSeconds < HOUR_SECONDS - 60
      ? timeAgo(date)
      : `${hours}:${minutes}`;
  }

  return isSameYear(targetDate, now)
    ? `${month}/${day} ${hours}:${minutes}`
    : `${year}/${month}/${day} ${hours}:${minutes}`;
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

export const isSameYear = (date1, date2) => {
  const target1 = new Date(date1);
  const target2 = new Date(date2);

  return target1.getFullYear() === target2.getFullYear();
};

export const addDays = (date, days) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

export function timeAgo(date) {
  const currentDate = new Date();
  const givenDate = new Date(date);
  const seconds = Math.floor((currentDate - givenDate) / 1000);

  if (seconds < MINUTE_SECONDS) {
    return seconds + '초 전';
  } else if (seconds < HOUR_SECONDS) {
    const minutes = Math.floor(seconds / MINUTE_SECONDS);
    return minutes + '분 전';
  } else if (seconds < DAY_SECONDS) {
    const hours = Math.floor(seconds / HOUR_SECONDS);
    return hours + '시간 전';
  } else if (seconds < MONTH_SECONDS) {
    const days = Math.floor(seconds / DAY_SECONDS);
    return days + '일 전';
  } else if (seconds < YEAR_SECONDS) {
    const months = Math.floor(seconds / MONTH_SECONDS);
    return months + '달 전';
  } else {
    const years = Math.floor(seconds / YEAR_SECONDS);
    return years + '년 전';
  }
}

/**
 * MM/DD/YYYY HH:MM
 */
export function formattedNowTime() {
  const formattedNowTime = new Date()
    .toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(',', '');

  return formattedNowTime;
}

// 서버 점검 페이지 (useMaintenance.jsx)
// YYYY.MM.DD (day) 형식
export const dateStrWithDay = (date) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, 0)} (${days[date.getDay()]})`;
};
// HH:MM 형식 (초 미출력, 24시 형식)
export const serverTimeStr = (date) => {
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

// 서버 점검 페이지 (useMaintenance.jsx)
// YYYY.MM.DD (day) 형식
export const dateStrWithDay = (date) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, 0)} (${days[date.getDay()]})`;
};
// HH:MM 형식 (초 미출력, 24시 형식)
export const serverTimeStr = (date) => {
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

// 이벤트 페이지 (YYYY-MM-DDTHH:MM)
export function eventTime(date) {
  return date ? date.slice(0, 16) : '';
}
