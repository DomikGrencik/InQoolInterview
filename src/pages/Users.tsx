import Table from "@components/Table";
import useFetchUsers from "@utils/hooks/useFetchUsers";
import { FC } from "react";

const Users: FC = () => {
  const { data, error, isLoading } = useFetchUsers();

  if (error) {
    console.error(error.message);
    return null;
  }

  return (
    <div>
      <div>This is Users page</div>
      {/* <MyTable data={data ?? []} isLoading={isLoading} /> */}
      <Table data={data ?? []} isLoading={isLoading} />
    </div>
  );
};

export default Users;
