"use client";

import NiceModal from "@ebay/nice-modal-react";
import { ReactNode } from "react";

export default function NiceModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <NiceModal.Provider>{children}</NiceModal.Provider>;
}
