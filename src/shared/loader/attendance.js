import { json } from 'react-router-dom';

import { isAttendanceCheckedToday } from '@/apis';

export const attendanceLoader = async () => {
  const attendance = await isAttendanceCheckedToday();
  return json({ attendance });
};
