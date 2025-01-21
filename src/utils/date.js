import { timeAgo } from './timeAgo';
import { HOUR_SECONDS } from '@/constants';

export const dateFormat = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = `${dateObj.getMonth() + 1}`.padStart(2, '0');
  const day = `${dateObj.getDate()}`.padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export const fullDateTimeFormat = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = `${dateObj.getMonth() + 1}`.padStart(2, '0');
  const day = `${dateObj.getDate()}`.padStart(2, '0');
  const hours = `${dateObj.getHours()}`.padStart(2, '0');
  const minutes = `${dateObj.getMinutes()}`.padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

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
