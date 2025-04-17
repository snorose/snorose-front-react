import Calendar from 'react-calendar';

import styled from 'styled-components';

import 'react-calendar/dist/Calendar.css';

export const StyledCalendar = styled(Calendar)`
  .react-calendar__navigation {
    margin: 0;
    border-radius: 5px 5px 0 0;
  }

  .react-calendar__navigation__label {
    font-weight: 700;
    font-size: 18px;
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
    padding-top: 16px;
    border-radius: 0 0 5px 5px;
  }

  // weekday
  .react-calendar__month-view__weekdays__weekday {
    font-size: 16px;
    color: #ffffff;
  }

  // tile
  .react-calendar__tile {
    padding: 2px 0;
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
