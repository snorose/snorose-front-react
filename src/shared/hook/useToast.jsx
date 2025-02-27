import { useToastContext } from '@/shared/context/ToastContext';

export default function useToast() {
  const { addToast } = useToastContext();

  const toast = (item) => {
    addToast(item);
  };

  return { toast };
}
