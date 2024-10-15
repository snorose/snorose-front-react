import { useEffect, useState } from 'react';

import { isDayOver } from '@/utils';

const POP_UP_STATE_LOCAL_STORAGE_KEY = 'popUpState';
const POP_UO_DATE_LOCAL_STORAGE_KEY = 'popUpDate';
const POP_UP_OPEN = 'open';
const POP_UP_CLOSE = 'close';

const initializePopupStorage = () => {
  localStorage.setItem(POP_UP_STATE_LOCAL_STORAGE_KEY, POP_UP_OPEN);
  localStorage.setItem(POP_UO_DATE_LOCAL_STORAGE_KEY, new Date());
};

export default function usePopUp() {
  const [isPopUpOpend, setIsPopUpOpend] = useState();

  useEffect(() => {
    const popUpState = localStorage.getItem(POP_UP_STATE_LOCAL_STORAGE_KEY);
    const popUpDate = localStorage.getItem(POP_UO_DATE_LOCAL_STORAGE_KEY);

    const initialStatus = popUpState === null || popUpDate === null;

    if (initialStatus || isDayOver(popUpDate)) {
      initializePopupStorage();
      setIsPopUpOpend(true);
      return;
    }

    if (popUpState === POP_UP_OPEN) {
      setIsPopUpOpend(true);
    }
  }, []);

  const closePopUp = ({ closeForToday = false }) => {
    setIsPopUpOpend(false);
    localStorage.setItem(
      POP_UP_STATE_LOCAL_STORAGE_KEY,
      closeForToday ? POP_UP_CLOSE : POP_UP_OPEN
    );
  };

  return { isPopUpOpend, closePopUp };
}
