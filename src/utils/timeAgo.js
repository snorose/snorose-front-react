import {
  MINUTE_SECONDS,
  HOUR_SECONDS,
  DAY_SECONDS,
  MONTH_SECONDS,
  YEAR_SECONDS,
} from '@/constants';

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
