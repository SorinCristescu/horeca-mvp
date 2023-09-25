"use client";

import { useEffect } from "react";
import { useVenueModal } from "@/hooks/useVenueModal";

export default function Dashboard() {
  const onOpen = useVenueModal((state) => state.onOpen);
  const isOpen = useVenueModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <div>Dashboard page</div>;
}
