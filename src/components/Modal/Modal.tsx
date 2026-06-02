import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import type React from "react";
import { useModalLogic } from "../../hooks/useModal";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}
export default function Modal({ onClose, children }: ModalProps) {
  const close = useModalLogic(onClose);
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={close}>
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeBtn}
          onClick={onClose}>
          x
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLDivElement,
  );
}
