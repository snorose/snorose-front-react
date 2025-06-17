import { createContext, useState } from 'react';

import ConfirmModal from '@/shared/component/modal/ConfirmModal';

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('');
  const [modalProps, setModalProps] = useState({
    title: '',
    description: '',
    primaryText: '',
    secondaryText: '',
    onPrimary: () => {},
    onSecondary: () => {},
  });

  const open = (type, modalProps) => {
    setType(type);
    setIsOpen(true);

    setModalProps({
      ...modalProps,
      onPrimary: () => {
        if (modalProps.onPrimary) {
          modalProps.onPrimary();
        }

        setIsOpen(false);
      },
      onSecondary: () => {
        if (modalProps.onSecondary) {
          modalProps.onSecondary();
        }

        setIsOpen(false);
      },
    });
  };

  return (
    <ModalContext.Provider value={{ open }}>
      {children}

      {type === 'confirm' && isOpen && <ConfirmModal {...modalProps} />}
    </ModalContext.Provider>
  );
}
