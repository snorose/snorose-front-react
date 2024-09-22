import Calendar from 'react-calendar';

import styled from 'styled-components';

import 'react-calendar/dist/Calendar.css';

export const StyledCalendar = styled(Calendar)`
  // calendar
  .react-calendar {
    margin: 0 1.25rem;
    background-color: rgba(95, 133, 191, 0.4);
    border-radius: 0.3125rem;
    border: none;
  }

  // navigation
  .react-calendar__navigation {
    margin: 0; // 배경색 해결되면 삭제
    /* background-color: rgba(95, 133, 191, 0.4); */
    background-color: #2556a2;
    border-radius: 0.3125rem 0.3125rem 0 0;
  }

  .react-calendar__navigation__label {
    font-weight: 700;
    font-size: 1.125rem;
    color: #ffffff;
    cursor: auto;
  }

  .react-calendar__navigation__label:disabled {
    background-color: transparent;
  }

  .react-calendar__navigation__arrow {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .react-calendar__navigation__arrow:hover {
    background-color: transparent;
  }

  .react-calendar__navigation__arrow:enabled:focus {
    background-color: transparent;
  }

  // container
  .react-calendar__month-view__weekNumbers {
    text-decoration: none;
  }

  .react-calendar__viewContainer {
    padding-top: 1rem; // 배경색 해결되면 삭제
    /* background-color: rgba(95, 133, 191, 0.4); */
    background-color: #2556a2;
    border-radius: 0 0 0.3125rem 0.3125rem;
  }

  // weekday
  .react-calendar__month-view__weekdays__weekday {
    font-size: 1rem;
    color: #ffffff;
  }

  // tile
  .react-calendar__tile {
    padding: 0.125rem 0;
    display: flex;
    justify-content: center;
    cursor: normal;
  }

  .react-calendar__tile:hover {
    background-color: transparent;
  }

  // today
  .react-calendar__tile--now {
    background-color: transparent;
  }

  // active  day

  .react-calendar__tile--hasActive {
    background-color: transparent;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background-color: transparent;
  }

  .react-calendar__tile--active {
    background-color: transparent;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background-color: transparent;
  }
`;
