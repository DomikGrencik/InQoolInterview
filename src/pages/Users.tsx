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
import { formOptions } from "@tanstack/react-form";
import useFetchRecord from "@utils/hooks/useFetchRecord";

const Users: FC = () => {
  const [isOpenModal, setisOpenModal] = useState(false);

  const [resolvedData, setResolvedData] = useState<
    z.infer<typeof userSchema>[]
  >([]);

  const [rowData, setRowData] = useState<z.infer<typeof userSchema>>({
    id: "",
    name: "",
    gender: "other",
    banned: false,
  });

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

  const { data: dataRecord, error: errorRecord } = useFetchRecord(
    rowData.id,
    fetchUserArgs.path,
    fetchUserArgs.queryKey,
    fetchUserArgs.schema
  );

  const {
    postRecord,
    variables: postVariables,
    isPending: isPendingPost,
    isError: isErrorPost,
  } = usePostRecord<UserFormData>(postUserArgs.path, postUserArgs.queryKey);

  const {
    patchRecord,
    data: patchedData,
    variables: patchVariables,
    isPending: isPendingPatch,
    isSuccess: isSuccessPatch,
    isError: isErrorPatch,
  } = usePatchRecord(rowData.id, patchUserArgs.path, patchUserArgs.queryKey);

  const deleteRecord = useDeleteRecord(
    rowData.id,
    deleteUserArgs.path,
    deleteUserArgs.queryKey
  );

  useEffect(() => {
    setResolvedData(data || []);

    if (isErrorPost) {
      setResolvedData(data || []);
    }
  }, [data, isErrorPost]);

  useEffect(() => {
    if (isErrorPatch) {
      setResolvedData((prevData) =>
        prevData.map((row) => (row.id === dataRecord?.id ? dataRecord : row))
      );
    }
  }, [dataRecord, isErrorPatch]);

  useEffect(() => {
    if (isPendingPatch && patchVariables) {
      const variables = patchVariables as z.infer<typeof userSchema>;
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

  useEffect(() => {
    if (isPendingPost && postVariables) {
      const variables: z.infer<typeof userSchema> = {
        id: "fetching...",
        ...postVariables,
      };
      setResolvedData((prevData) => [...prevData, variables]);
    }
  }, [isPendingPost, postVariables]);

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
    setPatchFormOpts({
      defaultValues: {
        ...row,
      },
    });
    await patchRecord(row);
  };

  const handleDelete = (row: z.infer<typeof userSchema>) => {
    setRowData(row);
    deleteRecord();
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
