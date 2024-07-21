import { FC, useEffect, useState } from "react";
import { z } from "zod";
import Form from "@components/form/Form";
import { UserFormData } from "@components/form/form-types";
import { userFormFields, userFormOpts } from "@components/form/FormOptions";
import Table from "@components/table/Table";
import { userColumns } from "@components/table/TableOptions";
import {
  deleteUserArgs,
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
import { formOptions } from "@tanstack/react-form";

const Users: FC = () => {
  const [isOpenModal, setisOpenModal] = useState(false);

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

  const { data, error, isLoading } = useFetchRecords(
    fetchUsersArgs.path,
    fetchUsersArgs.queryKey,
    fetchUsersArgs.schema
  );

  const postRecord = usePostRecord<UserFormData>(
    postUserArgs.path,
    postUserArgs.queryKey
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

  const handleSubmit = async (values: UserFormData) => {
    await postRecord(values);
  };

  const handleBan = (row: z.infer<typeof userSchema>) => {
    setRowData(row);
    patchRecord({ ...row, banned: !row.banned });
  };

  const handleEdit = (row: z.infer<typeof userSchema>) => {
    setRowData(row);
    setPatchFormOpts({
      defaultValues: {
        ...row,
      },
    });
    setisOpenModal(true);
  };

  const handlePatch = async (row: z.infer<typeof userSchema>) => {
    setRowData(row);
    await patchRecord(row);
  };

  const handleDelete = (row: z.infer<typeof userSchema>) => {
    setRowData(row);
    deleteRecord();
  };

  if (error) {
    console.error(error.message);
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
        <h2>Edit user</h2>
        <Form
          onSubmit={handlePatch}
          formOpts={patchFormOpts}
          formFields={userFormFields}
        />
      </Modal>
    </div>
  );
};

export default Users;
