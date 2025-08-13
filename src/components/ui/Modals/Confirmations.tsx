"use client";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

import MODAL_IDS from "./modalIds";
import ConfirmationModalTemplate from "./Templates/ConfirmationModal";
import closeNiceModal from "@/lib/utils/closeNiceModal";

interface ConfirmationsProps {
  message: string;
  subMessage?: string;
  isLoading?: boolean;
  handleConfirm: () => void;
  handleCancel?: null | (() => void);
  variant?: "safe" | "warning" | "danger";
  withCancel?: boolean;
  withConfirm?: boolean;
  labelCancel?: string;
  labelConfirm?: string;
  modalWidth?: string;
  buttonWidth?: string;
}

const Confirmations = NiceModal.create(
  ({
    message,
    subMessage,
    isLoading,
    handleConfirm,
    handleCancel = null,
    variant = "safe",
    withCancel = true,
    withConfirm = true,
    labelCancel = "Tidak",
    labelConfirm = "Ya",
    modalWidth = "350px",
    buttonWidth,
  }: ConfirmationsProps) => {
    const modalId = MODAL_IDS.GENERAL.CONFIRMATION;
    const modal = useModal(modalId);

    return (
      <ConfirmationModalTemplate
        isOpen={modal.visible}
        variant={variant}
        message={message}
        subMessage={subMessage}
        handleClose={
          handleCancel !== null
            ? handleCancel
            : () => closeNiceModal(modalId)
        }
        handleConfirm={handleConfirm}
        withCancel={withCancel}
        withConfirm={withConfirm}
        labelCancel={labelCancel}
        labelConfirm={labelConfirm}
        isLoadingConfirm={isLoading}
        width={modalWidth}
        buttonWidth={buttonWidth}
      />
    );
  },
);

export default Confirmations;
