export type UserFormData = {
  name: string;
  gender: "female" | "male" | "other";
  banned: boolean;
};

export type AnimalFormData = {
  name: string;
  type: "cat" | "dog" | "other";
  age: number;
};

/* export type UserFormFields = {
  name: string;
  label: string;
  type: string;
  options?: string[];
  optionsType?: string;
}; */
