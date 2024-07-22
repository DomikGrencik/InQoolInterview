import { FC, useEffect, useState } from "react";
import { z } from "zod";
import Form from "@components/form/Form";
import { AnimalFormData } from "@components/form/form-types";
import { animalFormFields, animalFormOpts } from "@components/form/FormOptions";
import Table from "@components/table/Table";
import { animalColumns } from "@components/table/TableOptions";
import {
  deleteAnimalArgs,
  fetchAnimalArgs,
  fetchAnimalsArgs,
  patchAnimalArgs,
  postAnimalArgs,
} from "@utils/hooks/hookArguments";
import useFetchRecords from "@utils/hooks/useFetchRecords";
import usePostRecord from "@utils/hooks/usePostRecord";
import Modal from "@components/Modal";
import { animalSchema } from "@utils/dataSchemas";
import usePatchRecord from "@utils/hooks/usePatchRecord";
import useDeleteRecord from "@utils/hooks/useDeleteRecord";
import { formOptions } from "@tanstack/react-form";
import useFetchRecord from "@utils/hooks/useFetchRecord";

const Animals: FC = () => {
  const [isOpenModal, setisOpenModal] = useState(false);

  const [resolvedData, setResolvedData] = useState<
    z.infer<typeof animalSchema>[]
  >([]);

  const [rowData, setRowData] = useState<z.infer<typeof animalSchema>>({
    id: "",
    name: "",
    type: "other",
    age: 0,
  });

  const patchFormOpts = formOptions<AnimalFormData>({
    defaultValues: {
      ...rowData,
    },
  });

  const { data, error, isLoading } = useFetchRecords(
    fetchAnimalsArgs.path,
    fetchAnimalsArgs.queryKey,
    fetchAnimalsArgs.schema
  );

  const { data: dataRecord, error: errorRecord } = useFetchRecord(
    rowData.id,
    fetchAnimalArgs.path,
    fetchAnimalArgs.queryKey,
    fetchAnimalArgs.schema
  );

  const {
    postRecord,
    variables: postVariables,
    isPending: isPendingPost,
    isError: isErrorPost,
  } = usePostRecord<AnimalFormData>(postAnimalArgs.path, postAnimalArgs.queryKey);

  const {
    patchRecord,
    data: patchedData,
    variables: patchVariables,
    isPending: isPendingPatch,
    isSuccess: isSuccessPatch,
    isError: isErrorPatch,
  } = usePatchRecord(rowData.id, patchAnimalArgs.path, patchAnimalArgs.queryKey);

  const deleteRecord = useDeleteRecord(
    rowData.id,
    deleteAnimalArgs.path,
    deleteAnimalArgs.queryKey
  );

  /*
   * Sets resolvedData state to data (or an empty array if data is undefined) whenever data or isErrorPost changes
   */
  useEffect(() => {
    setResolvedData(data || []);

    if (isErrorPost) {
      setResolvedData(data || []);
    }
  }, [data, isErrorPost]);

  /*
   * Reverts optimistic update when a patch request fails.
   * Updates just one element of the resolvedData array using dataRecord fetched by useFetchRecord hook.
   */
  useEffect(() => {
    if (isErrorPatch) {
      setResolvedData((prevData) =>
        prevData.map((row) => (row.id === dataRecord?.id ? dataRecord : row))
      );
    }
  }, [dataRecord, isErrorPatch]);

  /*
   * Handles optimistic update - sets resolvedData state before patch request is settled (when isPendingPatch is true and patchVariables is defined).
   * Updates resolvedData when a patch request is successful.
   * Updates just one element of the resolvedData array using patchedData (response of successful patch request).
   */
  useEffect(() => {
    if (isPendingPatch && patchVariables) {
      const variables = patchVariables as z.infer<typeof animalSchema>;
      setResolvedData((prevData) =>
        prevData.map((row) => (row.id === variables.id ? variables : row))
      );
    }
    if (isSuccessPatch && patchedData) {
      setResolvedData((prevData) =>
        prevData.map((row) => (row.id === patchedData.id ? patchedData : row))
      );
    }
  }, [isPendingPatch, isSuccessPatch, patchVariables, patchedData]);

  /*
   * Handles optimistic update - sets resolvedData state before post request is settled (when isPendingPost is true and postVariables is defined).
   */
  useEffect(() => {
    if (isPendingPost && postVariables) {
      const variables: z.infer<typeof animalSchema> = {
        id: "fetching...",
        ...postVariables,
        age: parseInt(postVariables.age as string),
      };
      setResolvedData((prevData) => [...prevData, variables]);
    }
  }, [isPendingPost, postVariables]);

  const handleSubmit = async (values: AnimalFormData) => {
    await postRecord(values);
  };


  const handleEdit = (row: z.infer<typeof animalSchema>) => {
    setRowData(row);
    setisOpenModal(true);
  };

  const handlePatch = async (row: z.infer<typeof animalSchema>) => {
    setRowData(row);
    await patchRecord(row);
  };

  const handleDelete = async (row: z.infer<typeof animalSchema>) => {
    setRowData(row);
    await deleteRecord();
  };

  if (error || errorRecord) {
    console.error(
      (error && error.message) || (errorRecord && errorRecord.message)
    );
    return;
  }

  return (
    <div>
      <div className="block">
        <div className="container">
          <div className="table-form-layout">
            <div className="table-wrapper">
              <Table
                data={resolvedData}
                isLoading={isLoading}
                columns={animalColumns}
                actions={{
                  edit: handleEdit,
                  delete: handleDelete,
                }}
              />
            </div>
            <div className="form-alignment">
              <Form
                onSubmit={handleSubmit}
                formOpts={animalFormOpts}
                formFields={animalFormFields}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpenModal}
        onClose={() => {
          setisOpenModal(false);
        }}
      >
        <h2>Edit animal</h2>
        <Form
          onSubmit={handlePatch}
          formOpts={patchFormOpts}
          formFields={animalFormFields}
        />
      </Modal>
    </div>
  );
};

export default Animals;
