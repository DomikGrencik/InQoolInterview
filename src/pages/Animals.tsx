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
import useFetchRecord from "@utils/hooks/useFetchRecord";
import { useQueryClient } from "@tanstack/react-query";
import { formOptions } from "@tanstack/react-form";

const Animals: FC = () => {
  const queryCient = useQueryClient();

  const [isOpenModal, setisOpenModal] = useState(false);

  const [rowData, setRowData] = useState<z.infer<typeof animalSchema>>({
    id: "",
    name: "",
    type: "other",
    age: 0,
  });

  const [resolvedData, setResolvedData] = useState<
    z.infer<typeof animalSchema>[]
  >([]);

  const [patchFormOpts, setPatchFormOpts] = useState(() =>
    formOptions<AnimalFormData>({
      defaultValues: {
        ...rowData,
      },
    })
  );

  const postRecord = usePostRecord<AnimalFormData>(
    postAnimalArgs.path,
    postAnimalArgs.queryKey
  );

  const { data, error, isLoading } = useFetchRecords(
    fetchAnimalsArgs.path,
    fetchAnimalsArgs.queryKey,
    fetchAnimalsArgs.schema
  );

  const {
    data: animalData,
    error: animalError,
    isLoading: animalIsLoading,
  } = useFetchRecord(
    rowData.id,
    fetchAnimalArgs.path,
    fetchAnimalArgs.queryKey,
    fetchAnimalArgs.schema
  );

  const {
    patchRecord,
    data: patchedData,
    isSuccess,
  } = usePatchRecord(rowData.id, patchAnimalArgs.path);

  const deleteRecord = useDeleteRecord(
    rowData.id,
    deleteAnimalArgs.path,
    deleteAnimalArgs.queryKey
  );

  useEffect(() => {
    setPatchFormOpts({
      defaultValues: {
        ...rowData,
      },
    });
  }, [rowData]);

  useEffect(() => {
    setResolvedData(data || []);
  }, [data]);

  useEffect(() => {
    if (isSuccess && patchedData) {
      setResolvedData((prevData) =>
        prevData.map((row) => (row.id === patchedData.id ? patchedData : row))
      );
      setPatchFormOpts({
        defaultValues: {
          ...patchedData,
        },
      });
    }
  }, [isSuccess, patchedData]);

  useEffect(() => {
    if (animalData && !animalIsLoading) {
      setResolvedData((prevData) =>
        prevData.map((row) => (row.id === animalData.id ? animalData : row))
      );
    }
  }, [animalData, animalIsLoading]);

  if (error || animalError) {
    console.error(error?.message || animalError?.message);
    return null;
  }

  const handleSubmit = async (values: AnimalFormData) => {
    await postRecord(values);
  };

  const handleEdit = (animalData: z.infer<typeof animalSchema>) => {
    setRowData(animalData);
    setisOpenModal(true);
  };

  const handlePatch = async (rowData: z.infer<typeof animalSchema>) => {
    await patchRecord(rowData);
    queryCient.invalidateQueries({
      queryKey: [`${fetchAnimalArgs.path}${rowData.id}`],
    });
  };

  const handleDelete = (animalData: z.infer<typeof animalSchema>) => {
    setRowData(animalData);
    deleteRecord();
  };

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
