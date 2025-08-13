"use client";
import { ModalDef } from "@ebay/nice-modal-react";
import React from "react";
import MODAL_IDS from "./modalIds";
import ErrorHandling from "../Errors/ErrorHandling";
import SuccessHandling from "../Errors/SuccessHandling";
import Confirmations from "./Confirmations";

export default function ModalPortal() {
  return (
    <>
      {/* General */}
      <ModalDef
        id="error-handling-dialog"
        component={ErrorHandling}
      />
      <ModalDef
        id="success-handling-dialog"
        component={SuccessHandling}
      />
      <ModalDef
        id="errorv2-handling-dialog"
        component={ErrorHandling}
      />
      <ModalDef
        id={MODAL_IDS.GENERAL.CONFIRMATION}
        component={Confirmations}
      />
    </>
  );
}
