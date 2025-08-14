"use client";
import { Icon } from "@iconify/react";
import { Button, MantineColor } from "@mantine/core";
import React, { useEffect } from "react";

interface VariantProps {
  icon: string;
  mantineColor: MantineColor;
  colorPrimary: string;
  colorSecondary: string;
}

interface VariantMap {
  [key: string]: VariantProps;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  variant?: "safe" | "warning" | "danger";
  message?: string;
  subMessage?: string;
  withCancel?: boolean;
  withConfirm?: boolean;
  handleClose?: () => void;
  handleConfirm?: () => void;
  labelCancel?: string;
  labelConfirm?: string;
  isLoadingConfirm?: boolean;
  width?: string;
  buttonWidth?: string;
}

export default function ConfirmationModalTemplate({
  isOpen,
  variant = "danger",
  message = "Are you sure want to perform this action?",
  subMessage = "",
  withCancel = true,
  withConfirm = true,
  handleClose = () => {},
  handleConfirm = () => {},
  labelCancel = "Tidak",
  labelConfirm = "Iya",
  isLoadingConfirm = false,
  width = "22rem",
  buttonWidth,
}: ConfirmationModalProps) {
  const variantProps: VariantMap = {
    safe: {
      icon: "ic:round-check-circle",
      mantineColor: "blue",
      colorPrimary: "#016DB2",
      colorSecondary: "#93E2F7",
    },
    warning: {
      icon: "mingcute:warning-fill",
      mantineColor: "yellow",
      colorPrimary: "#F5BB5C",
      colorSecondary: "#FBE7C5",
    },
    danger: {
      icon: "ic:round-warning",
      mantineColor: "red",
      colorPrimary: "#CB3A31",
      colorSecondary: "#FFDDDD",
    },
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop with improved opacity */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-black/30 transition-opacity duration-300"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div
            className="transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all duration-300 p-8"
            style={{ width }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid gap-4 justify-items-center">
              {/* ICON */}
              <div
                className="flex items-center justify-center w-28 h-28 rounded-full"
                style={{
                  background: variantProps[variant].colorSecondary,
                }}
              >
                <Icon
                  icon={variantProps[variant].icon}
                  width={70}
                  color={variantProps[variant].colorPrimary}
                />
              </div>
              {/* ICON */}

              <div
                className="flex flex-col gap-2 text-center mb-5"
                style={{ maxWidth: "calc(100% - 2rem)" }}
              >
                <span className="font-bold text-xl">{message}</span>
                {subMessage && (
                  <span className="text-sm">{subMessage}</span>
                )}
              </div>
            </div>
            <div className="flex justify-center gap-3">
              {withCancel && (
                <Button
                  color={variantProps[variant].mantineColor}
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoadingConfirm}
                  style={{ width: buttonWidth || "auto" }}
                  classNames={{ root: "border-current" }}
                >
                  {labelCancel}
                </Button>
              )}
              {withConfirm && (
                <Button
                  color={variantProps[variant].mantineColor}
                  onClick={handleConfirm}
                  loading={isLoadingConfirm}
                  style={{ width: buttonWidth || "auto" }}
                >
                  {labelConfirm}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
