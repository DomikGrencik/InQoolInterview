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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>{data?.map((user) => <div key={user.id}>{user.name}</div>)}</div>
      )}
    </div>
  );
};

export default Users;
