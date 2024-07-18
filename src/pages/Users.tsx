import Form from "@components/form/Form";
import { UserFormData } from "@components/form/form-types";
import { userFormFields, usersFormOpts } from "@components/form/FormOptions";
import Table from "@components/Table";
import useFetchUsers from "@utils/hooks/useFetchUsers";
import usePostUser from "@utils/hooks/usePostUser";
import { FC } from "react";

const Users: FC = () => {
  const postUser = usePostUser();

  const {
    data: usersData,
    error: usersError,
    isLoading: usersIsLoading,
  } = useFetchUsers();

  if (usersError) {
    console.error(usersError.message);
    return null;
  }

  if (!usersData) {
    return null;
  }

  const handleSubmit = async (values: UserFormData) => {
    await postUser(values);
  };

  return (
    <div>
      <div>This is Users page</div>
      <Table data={usersData} isLoading={usersIsLoading} />
      <Form
        onSubmit={handleSubmit}
        formOpts={usersFormOpts}
        formFields={userFormFields}
      />
    </div>
  );
};

export default Users;
