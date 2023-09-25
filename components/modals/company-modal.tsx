"use client";

import { Modal } from "@/components/ui/modal";
import { useCompanyModal } from "@/hooks/useStoreModal";
import { CompanyForm } from "../forms/company-form";

export const CompanyModal = () => {
  const companyModal = useCompanyModal();

  return (
    <Modal
      title="Create Company"
      description="Create a new company"
      onClose={companyModal.onClose}
      isOpen={companyModal.isOpen}
    >
      <div className="py-2 pb-4">
        <CompanyForm />
      </div>
    </Modal>
  );
};
