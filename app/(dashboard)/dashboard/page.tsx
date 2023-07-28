"use client";

import { useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { useCompanyModal } from "@/hooks/useStoreModal";

export default function Dashboard() {
  const onOpen = useCompanyModal((state) => state.onOpen);
  const isOpen = useCompanyModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <div>Dashboard page</div>;
}
