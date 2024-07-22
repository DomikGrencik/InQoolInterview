import { FC, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    isOpen
      ? document.body.classList.add("no-scroll")
      : document.body.classList.remove("no-scroll");
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div className="wrapper">
      <div className="background" onClick={onClose} />
      <div className="modal-wrapper">
        <div className="modal content">
          <div className="content">{children}</div>
          <button className="modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
