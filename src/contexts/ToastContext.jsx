import { createContext, useState, useContext } from 'react';
import Toast from '../components/Toast/Toast.jsx';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const addToast = (toast) => {
    if (toasts.find((item) => item.id === toast.id)) {
      removeToast(toast);
    }
    setToasts((prev) => [...prev, toast]);
  };
  const removeToast = (toast) => {
    setToasts((prev) => prev.filter((item) => item.id !== toast.id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {toasts.length > 0 &&
        toasts.map((toast) => <Toast key={toast.id} toast={toast} />)}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  return useContext(ToastContext);
}
