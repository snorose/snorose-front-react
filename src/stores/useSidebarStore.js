import { create } from 'zustand';

export const useSidebarStore = create((set) => ({
  isOpen: 0,
  open: () => set((state) => ({ isOpen: true })),
  close: () => set((state) => ({ isOpen: false })),
}));
