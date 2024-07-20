import { FC, useEffect, useState } from "react";
import { z } from "zod";
import Form from "@components/form/Form";
import { UserFormData } from "@components/form/form-types";
import { userFormFields, userFormOpts } from "@components/form/FormOptions";
import Table from "@components/table/Table";
import { userColumns } from "@components/table/TableOptions";
import {
  deleteUserArgs,
  fetchUserArgs,
  fetchUsersArgs,
  patchUserArgs,
  postUserArgs,
} from "@utils/hooks/hookArguments";
import useFetchRecords from "@utils/hooks/useFetchRecords";
import usePostRecord from "@utils/hooks/usePostRecord";
import Modal from "@components/Modal";
import { userSchema } from "@utils/dataSchemas";
import usePatchRecord from "@utils/hooks/usePatchRecord";
import useDeleteRecord from "@utils/hooks/useDeleteRecord";
import useFetchRecord from "@utils/hooks/useFetchRecord";
import { useQueryClient } from "@tanstack/react-query";
import { formOptions } from "@tanstack/react-form";

const Users: FC = () => {
  const queryCient = useQueryClient();

  const [isOpenModal, setisOpenModalModal] = useState(false);

  const [rowData, setRowData] = useState<z.infer<typeof userSchema>>({
    id: "",
    name: "",
    gender: "other",
    banned: false,
  });

  const [resolvedData, setResolvedData] = useState<
    z.infer<typeof userSchema>[]
  >([]);

  const [patchFormOpts, setPatchFormOpts] = useState(() =>
    formOptions<UserFormData>({
      defaultValues: {
        ...rowData,
      },
    })
  );

  const postRecord = usePostRecord<UserFormData>(
    postUserArgs.path,
    postUserArgs.queryKey
  );

  const { data, error, isLoading } = useFetchRecords(
    fetchUsersArgs.path,
    fetchUsersArgs.queryKey,
    fetchUsersArgs.schema
  );

  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useFetchRecord(
    rowData.id,
    fetchUserArgs.path,
    fetchUserArgs.queryKey,
    fetchUserArgs.schema
  );

  const {
    patchRecord,
    data: patchedData,
    isSuccess,
  } = usePatchRecord(rowData.id, patchUserArgs.path);

  const deleteRecord = useDeleteRecord(
    rowData.id,
    deleteUserArgs.path,
    deleteUserArgs.queryKey
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
    if (userData && !userIsLoading) {
      setResolvedData((prevData) =>
        prevData.map((row) => (row.id === userData.id ? userData : row))
      );
    }
  }, [userData, userIsLoading]);

  if (error || userError) {
    console.error(error?.message || userError?.message);
    return null;
  }

  const handleSubmit = async (values: UserFormData) => {
    await postRecord(values);
  };

  const handleBan = (userData: z.infer<typeof userSchema>) => {
    setRowData(userData);
    patchRecord({ ...userData, banned: !userData.banned });
  };

  const handleEdit = (userData: z.infer<typeof userSchema>) => {
    setRowData(userData);
    setisOpenModalModal(true);
  };

  const handlePatch = async (rowData: z.infer<typeof userSchema>) => {
    await patchRecord(rowData);
    queryCient.invalidateQueries({
      queryKey: [`${fetchUserArgs.path}${rowData.id}`],
    });
  };

  const handleDelete = (userData: z.infer<typeof userSchema>) => {
    setRowData(userData);
    deleteRecord();
  };

  return (
    <div>
      <div className="block">
        <div className="container table-form-layout">
          <div className="table-wrapper">
            <Table
              data={resolvedData}
              isLoading={isLoading}
              columns={userColumns}
              actions={{
                ban: handleBan,
                edit: handleEdit,
                delete: handleDelete,
              }}
            />
          </div>
          <div className="form-alignment">
            <Form
              onSubmit={handleSubmit}
              formOpts={userFormOpts}
              formFields={userFormFields}
              schema={userSchema}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpenModal}
        onClose={() => {
          setisOpenModalModal(false);
        }}
      >
        <Form
          onSubmit={handlePatch}
          formOpts={patchFormOpts}
          formFields={userFormFields}
          schema={userSchema}
        />
      </Modal>
    </div>
  );
};

export default Users;
