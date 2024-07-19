import Form from "@components/form/Form";
import { AnimalFormData } from "@components/form/form-types";
import { animalFormFields, animalFormOpts } from "@components/form/FormOptions";
import Table from "@components/table/Table";
import { animalColumns } from "@components/table/TableOptions";
import { fetchAnimalsArgs, postAnimalArgs } from "@utils/hooks/hookArguments";
import useFetchRecords from "@utils/hooks/useFetchRecords";
import usePostRecord from "@utils/hooks/usePostRecord";
import { FC } from "react";

const Animals: FC = () => {
  const postRecord = usePostRecord<AnimalFormData>(
    postAnimalArgs.path,
    postAnimalArgs.queryKey
  );

  const { data, error, isLoading } = useFetchRecords(
    fetchAnimalsArgs.path,
    fetchAnimalsArgs.queryKey,
    fetchAnimalsArgs.schema
  );

  if (error) {
    console.error(error.message);
    return null;
  }

  if (!data) {
    return null;
  }

  const handleSubmit = async (values: AnimalFormData) => {
    await postRecord(values);
  };

  return (
    <div>
      <div className="block">
        <div className="container table-form-layout">
          <div className="table-wrapper">
            <Table data={data} isLoading={isLoading} columns={animalColumns} />
          </div>
          <div className="form-alignment">
            <Form
              onSubmit={handleSubmit}
              formOpts={animalFormOpts}
              formFields={animalFormFields}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animals;
