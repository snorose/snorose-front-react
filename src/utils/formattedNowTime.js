function formattedNowTime() {
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

export default formattedNowTime;
