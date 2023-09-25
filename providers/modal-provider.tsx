"use client";

import { useEffect, useState } from "react";

import { CompanyModal } from "@/components/modals/company-modal";
import { VenueModal } from "@/components/modals/venue-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CompanyModal />
      <VenueModal />
    </>
  );
};
