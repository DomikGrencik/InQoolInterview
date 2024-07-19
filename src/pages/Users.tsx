import Form from "@components/form/Form";
import { UserFormData } from "@components/form/form-types";
import { userFormFields, userFormOpts } from "@components/form/FormOptions";
import Table from "@components/table/Table";
import { userColumns } from "@components/table/TableOptions";
import { fetchUsersArgs, postUserArgs } from "@utils/hooks/hookArguments";
import useFetchRecords from "@utils/hooks/useFetchRecords";
import usePostRecord from "@utils/hooks/usePostRecord";
import { FC } from "react";

const Users: FC = () => {
  const postRecord = usePostRecord<UserFormData>(
    postUserArgs.path,
    postUserArgs.queryKey
  );

  const { data, error, isLoading } = useFetchRecords(
    fetchUsersArgs.path,
    fetchUsersArgs.queryKey,
    fetchUsersArgs.schema
  );

  if (error) {
    console.error(error.message);
    return null;
  }

  if (!data) {
    return null;
  }

  const handleSubmit = async (values: UserFormData) => {
    await postRecord(values);
  };

  return (
    <div>
      <div className="block">
        <div className="container table-form-layout">
          <div className="table-wrapper">
            <Table data={data} isLoading={isLoading} columns={userColumns} />
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
  );
};

export default Users;
