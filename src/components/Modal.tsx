import { userSchema } from "@utils/dataSchemas";
import { FC } from "react";
import { z } from "zod";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: z.infer<typeof userSchema>;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <h1>Modal</h1>
      {Object.entries(data).map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong>{" "}
          {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
        </p>
      ))}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Modal;
