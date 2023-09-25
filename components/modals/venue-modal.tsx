"use client";

import { Modal } from "@/components/ui/modal";
import { useVenueModal } from "@/hooks/useVenueModal";
import { VenueForm } from "../forms/venue-form";

export const VenueModal = () => {
  const venueModal = useVenueModal();

  return (
    <Modal
      title="Create Venue"
      description="Create a new venue"
      onClose={venueModal.onClose}
      isOpen={venueModal.isOpen}
    >
      <div className="py-2 pb-4">
        <VenueForm />
      </div>
    </Modal>
  );
};
