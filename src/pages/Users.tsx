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
      <div className="block">
        <div className="container table-form-layout">
          <div className="table-wrapper">
            <Table data={usersData} isLoading={usersIsLoading} />
          </div>
          <div className="form-alignment">
            <Form
              onSubmit={handleSubmit}
              formOpts={usersFormOpts}
              formFields={userFormFields}
            />
          </div>
        </div>
      </div>
      <div style={{ width: "200px" }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
        doloremque illum magnam dolorum pariatur quidem atque, nesciunt modi
        laboriosam explicabo culpa impedit nihil sed ex id voluptatum iure
        dolorem delectus.
      </div>
      <div style={{ width: "200px" }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
        doloremque illum magnam dolorum pariatur quidem atque, nesciunt modi
        laboriosam explicabo culpa impedit nihil sed ex id voluptatum iure
        dolorem delectus.
      </div>
      <div style={{ width: "200px" }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
        doloremque illum magnam dolorum pariatur quidem atque, nesciunt modi
        laboriosam explicabo culpa impedit nihil sed ex id voluptatum iure
        dolorem delectus.
      </div>
      <div style={{ width: "200px" }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
        doloremque illum magnam dolorum pariatur quidem atque, nesciunt modi
        laboriosam explicabo culpa impedit nihil sed ex id voluptatum iure
        dolorem delectus.
      </div>
      <div style={{ width: "200px" }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
        doloremque illum magnam dolorum pariatur quidem atque, nesciunt modi
        laboriosam explicabo culpa impedit nihil sed ex id voluptatum iure
        dolorem delectus.
      </div>
      <div style={{ width: "200px" }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
        doloremque illum magnam dolorum pariatur quidem atque, nesciunt modi
        laboriosam explicabo culpa impedit nihil sed ex id voluptatum iure
        dolorem delectus.
      </div>
      <div style={{ width: "200px" }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
        doloremque illum magnam dolorum pariatur quidem atque, nesciunt modi
        laboriosam explicabo culpa impedit nihil sed ex id voluptatum iure
        dolorem delectus.
      </div>
      <div style={{ width: "200px" }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
        doloremque illum magnam dolorum pariatur quidem atque, nesciunt modi
        laboriosam explicabo culpa impedit nihil sed ex id voluptatum iure
        dolorem delectus.
      </div>
      <div style={{ width: "200px" }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
        doloremque illum magnam dolorum pariatur quidem atque, nesciunt modi
        laboriosam explicabo culpa impedit nihil sed ex id voluptatum iure
        dolorem delectus.
      </div>
      <div style={{ width: "200px" }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
        doloremque illum magnam dolorum pariatur quidem atque, nesciunt modi
        laboriosam explicabo culpa impedit nihil sed ex id voluptatum iure
        dolorem delectus.
      </div>
      <div style={{ width: "200px" }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
        doloremque illum magnam dolorum pariatur quidem atque, nesciunt modi
        laboriosam explicabo culpa impedit nihil sed ex id voluptatum iure
        dolorem delectus.
      </div>
      <div style={{ width: "200px" }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
        doloremque illum magnam dolorum pariatur quidem atque, nesciunt modi
        laboriosam explicabo culpa impedit nihil sed ex id voluptatum iure
        dolorem delectus.
      </div>
    </div>
  );
};

export default Users;
