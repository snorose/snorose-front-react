import { useToastContext } from '../contexts/ToastContext.jsx';

export default function useToast() {
  const { addToast } = useToastContext();

  const toast = (item) => {
    addToast(item);
  };

  return { toast };
}
