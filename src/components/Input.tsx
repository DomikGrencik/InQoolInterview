import { Column } from "@tanstack/react-table";
import { FC, useState, useEffect } from "react";

interface InputProps {
  column: Column<any, unknown>;
}

const Input: FC<InputProps> = ({ column }) => {
  const [value, setValue] = useState<string>(
    column.getFilterValue()?.toString() || ""
  );

  useEffect(() => {
    setValue(column.getFilterValue()?.toString() || "");
  }, [column]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    column.setFilterValue(e.target.value);
  };

  return <input type="text" value={value} onChange={handleChange} />;
};

export default Input;
