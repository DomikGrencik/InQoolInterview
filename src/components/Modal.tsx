import { userSchema } from "@utils/dataSchemas";
import { FC, useEffect, useState } from "react";
import { z } from "zod";
import Form from "@components/form/Form";
import { UserFormData } from "./form/form-types";
import usePatchUser from "@utils/hooks/users/usePatchUser";
import { userFormFields } from "./form/FormOptions";
import { formOptions } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: z.infer<typeof userSchema>;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, data }) => {
  const queryCient = useQueryClient();

  const [formValues, setFormValues] = useState(() =>
    formOptions<UserFormData>({
      defaultValues: {
        ...data,
      },
    })
  );

  const { patchUser, data: patchedData, isSuccess } = usePatchUser(data.id);

  const handleSubmit = async (values: UserFormData) => {
    await patchUser(values);
    queryCient.invalidateQueries({ queryKey: [`users/${data.id}`] });
  };

  useEffect(() => {
    setFormValues({
      defaultValues: {
        ...data,
      },
    });
  }, [data]);

  useEffect(() => {
    if (isSuccess && patchedData) {
      setFormValues({
        defaultValues: {
          ...patchedData,
        },
      });
    }
  }, [isSuccess, patchedData]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="wrapper">
      <div className="background" onClick={onClose} />
      <div className="modal">
        <h1>Modal</h1>
        <Form
          onSubmit={handleSubmit}
          formOpts={formValues}
          formFields={userFormFields}
        />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
