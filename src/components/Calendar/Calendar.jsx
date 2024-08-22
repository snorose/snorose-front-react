import { Icon } from '@/components/Icon';
import { Tile } from '@/components/Calendar';

import { StyledCalendar } from '@/components/Calendar/Calendar.style.jsx';

export default function Calendar() {
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
      tileContent={({ date }) => <Tile date={date} />}
      formatDay={() => {}}
    />
  );
}
