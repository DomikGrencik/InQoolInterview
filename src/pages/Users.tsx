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
    <div className="block">
      <div>
        <div className="container table-form-layout">
          <Table data={usersData} isLoading={usersIsLoading} />
          <div className="form-alignment">
            <Form
              onSubmit={handleSubmit}
              formOpts={usersFormOpts}
              formFields={userFormFields}
            />
          </div>
        </div>
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, illo
        magnam. Totam numquam eveniet ducimus iste hic recusandae neque sequi
        maxime tempora veniam ipsum nulla laborum unde, consectetur excepturi
        quam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, illo
        magnam. Totam numquam eveniet ducimus iste hic recusandae neque sequi
        maxime tempora veniam ipsum nulla laborum unde, consectetur excepturi
        quam!
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, illo
        magnam. Totam numquam eveniet ducimus iste hic recusandae neque sequi
        maxime tempora veniam ipsum nulla laborum unde, consectetur excepturi
        quam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, illo
        magnam. Totam numquam eveniet ducimus iste hic recusandae neque sequi
        maxime tempora veniam ipsum nulla laborum unde, consectetur excepturi
        quam!
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, illo
        magnam. Totam numquam eveniet ducimus iste hic recusandae neque sequi
        maxime tempora veniam ipsum nulla laborum unde, consectetur excepturi
        quam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, illo
        magnam. Totam numquam eveniet ducimus iste hic recusandae neque sequi
        maxime tempora veniam ipsum nulla laborum unde, consectetur excepturi
        quam!
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, illo
        magnam. Totam numquam eveniet ducimus iste hic recusandae neque sequi
        maxime tempora veniam ipsum nulla laborum unde, consectetur excepturi
        quam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, illo
        magnam. Totam numquam eveniet ducimus iste hic recusandae neque sequi
        maxime tempora veniam ipsum nulla laborum unde, consectetur excepturi
        quam!
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, illo
        magnam. Totam numquam eveniet ducimus iste hic recusandae neque sequi
        maxime tempora veniam ipsum nulla laborum unde, consectetur excepturi
        quam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, illo
        magnam. Totam numquam eveniet ducimus iste hic recusandae neque sequi
        maxime tempora veniam ipsum nulla laborum unde, consectetur excepturi
        quam!
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, illo
        magnam. Totam numquam eveniet ducimus iste hic recusandae neque sequi
        maxime tempora veniam ipsum nulla laborum unde, consectetur excepturi
        quam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, illo
        magnam. Totam numquam eveniet ducimus iste hic recusandae neque sequi
        maxime tempora veniam ipsum nulla laborum unde, consectetur excepturi
        quam!
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, illo
        magnam. Totam numquam eveniet ducimus iste hic recusandae neque sequi
        maxime tempora veniam ipsum nulla laborum unde, consectetur excepturi
        quam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, illo
        magnam. Totam numquam eveniet ducimus iste hic recusandae neque sequi
        maxime tempora veniam ipsum nulla laborum unde, consectetur excepturi
        quam!
      </div>
    </div>
  );
};

export default Users;
