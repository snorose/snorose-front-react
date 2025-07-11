export const MAINTENANCE_START = new Date('2025-05-06T01:00:00+09:00'); // 서버 점검 시작(년-월-일THH:MM:SS+한국기준)
export const MAINTENANCE_END = new Date('2025-05-06T19:00:00+09:00'); // 서버 점검 끝

export function useMaintenance(MAINTENANCE_START, MAINTENANCE_END) {
  const isSameDate =
    MAINTENANCE_START.toDateString() === MAINTENANCE_END.toDateString();

  const days = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];

  const startDateStr = `${MAINTENANCE_START.getFullYear()}.${String(MAINTENANCE_START.getMonth() + 1).padStart(2, '0')}.${String(MAINTENANCE_START.getDate()).padStart(2, '0')} ${days[MAINTENANCE_START.getDay()]}`;

  const endDateStr = `${MAINTENANCE_END.getFullYear()}.${String(MAINTENANCE_END.getMonth() + 1).padStart(2, '0')}.${String(MAINTENANCE_END.getDate()).padStart(2, '0')} ${days[MAINTENANCE_END.getDay()]}`;

  const startTime = MAINTENANCE_START.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const endTime = MAINTENANCE_END.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  // YYYY/MM/DD (Day) HH:MM ~ HH:MM
  return isSameDate
    ? `${startDateStr} ${startTime} - ${endTime}`
    : [`${startDateStr} ${startTime}`, <br />, `- ${endDateStr} ${endTime}`];
}
