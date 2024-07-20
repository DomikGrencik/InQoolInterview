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
