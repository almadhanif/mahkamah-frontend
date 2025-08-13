import NiceModal from "@ebay/nice-modal-react";

export default function closeNiceModal(modalId: string) {
  NiceModal.hide(modalId);

  return new Promise<void>((resolve) =>
    setTimeout(() => {
      NiceModal.remove(modalId);
      return resolve(undefined);
    }, 100),
  );
}
