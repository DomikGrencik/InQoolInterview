import Form from "@components/form/Form";
import Table from "@components/Table";
import useFetchUsers from "@utils/hooks/useFetchUsers";
import { FC } from "react";

const Users: FC = () => {
  const { data, error, isLoading } = useFetchUsers();

  if (error) {
    console.error(error.message);
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      <div>This is Users page</div>
      <Table data={data} isLoading={isLoading} />
      <Form />
    </div>
  );
};

export default Users;
