import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getMonthlyAttendanceHistory } from '@/apis';

import { FetchLoadingOverlay, Icon } from '@/shared/component';
import { Tile } from '@/components/Calendar';

import { LOADING_MESSAGE, QUERY_KEY } from '@/constants';

import { StyledCalendar } from '@/components/Calendar/Calendar.style.jsx';

export default function Calendar({ callback }) {
  const today = new Date();
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [loading, setLoading] = useState();

  const { data } = useQuery({
    queryKey: [QUERY_KEY.attendance, year, month],
    queryFn: async () => {
      setLoading(true);
      try {
        return await getMonthlyAttendanceHistory({ year, month });
      } finally {
        setLoading(false);
      }
    },
    staleTime: 1000 * 60 * 7,
  });

  useEffect(() => {
    callback(data);
  }, [data]);

  return (
    <>
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
        nextLabel={<Icon id='calendar-next' width={11} height={18} />}
        prevLabel={<Icon id='calendar-prev' width={11} height={18} />}
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
      {loading && (
        <FetchLoadingOverlay
          text={LOADING_MESSAGE.getMonthlyAttendanceHistory}
        />
      )}
    </>
  );
}
