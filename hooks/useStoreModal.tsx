import { create } from "zustand";
import { useModalProps } from "@/types";

export const useCompanyModal = create<useModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));
