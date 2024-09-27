import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getMonthlyAttendanceHistory } from '@/apis';

import { Icon } from '@/components/Icon';
import { Tile } from '@/components/Calendar';

import { QUERY_KEY } from '@/constants';

import { StyledCalendar } from '@/components/Calendar/Calendar.style.jsx';

export default function Calendar({ callback }) {
  const today = new Date();
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  const { data } = useQuery({
    queryKey: [QUERY_KEY.attendance, year, month],
    queryFn: () => getMonthlyAttendanceHistory({ year, month }),
    staleTime: 1000 * 60 * 7,
  });

  useEffect(() => {
    callback(data);
  }, [data]);

  return (
    <StyledCalendar
      defaultValue={new Date()}
      locale='ko-KR'
      calendarType='gregory'
      minDetail='month'
      navigationLabel={({ date, locale }) =>
        new Intl.DateTimeFormat(locale, { month: 'long' })
          .format(date)
          .slice(0, -1) + '월'
      }
      nextLabel={<Icon id='calendar-next' width='11' height='18' />}
      prevLabel={<Icon id='calendar-prev' width='11' height='18' />}
      next2Label={null}
      prev2Label={null}
      showNeighboringMonth={false}
      tileContent={({ date }) => <Tile date={date} data={data} />}
      formatDay={() => {}}
      activeStartDate={activeStartDate}
      onActiveStartDateChange={({ activeStartDate }) => {
        const active = new Date(activeStartDate);
        setActiveStartDate(activeStartDate);
        setYear(() => active.getFullYear());
        setMonth(() => active.getMonth() + 1);
      }}
    />
  );
}
