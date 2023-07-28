import { create } from "zustand";

interface useCompanyModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCompanyModal = create<useCompanyModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));
