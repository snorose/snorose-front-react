export const dateFormat = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = `${dateObj.getMonth() + 1}`.padStart(2, '0');
  const day = `${dateObj.getDate()}`.padStart(2, '0');
  return `${year}.${month}.${day}`;
};
