import Form from "@components/form/Form";
import { UserFormData } from "@components/form/form-types";
import { userFormFields, usersFormOpts } from "@components/form/FormOptions";
import Table from "@components/Table";
import useFetchUsers from "@utils/hooks/useFetchUsers";
import usePostUser from "@utils/hooks/usePostUser";
import { FC } from "react";

const Users: FC = () => {
  const postUser = usePostUser();

  const { data, error, isLoading } = useFetchUsers();

  if (error) {
    console.error(error.message);
    return null;
  }

  if (!data) {
    return null;
  }

  const handleSubmit = async (values: UserFormData) => {
    await postUser(values);
  };

  return (
    <div>
      <div>This is Users page</div>
      <Table data={data} isLoading={isLoading} />
      <Form
        onSubmit={handleSubmit}
        formOpts={usersFormOpts}
        formFields={userFormFields}
      />
    </div>
  );
};

export default Users;
