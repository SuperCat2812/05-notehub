import { useEffect, useState } from "react";

type UseModalType = [boolean, () => void, () => void];

export const useModalClose = (): UseModalType => {
  const [onModal, setOnModal] = useState(false);
  const openModal = () => {
    setOnModal(true);
  };
  const closeModal = () => {
    setOnModal(false);
  };
  return [onModal, openModal, closeModal];
};
export const useModalLogic = (onClose: () => void) => {
  const close = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    const handlerKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handlerKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handlerKeyDown);
    };
  }, [onClose]);
  return close;
};
