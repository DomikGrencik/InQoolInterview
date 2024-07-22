import { animalSchema, userSchema } from "@utils/dataSchemas";

export const fetchUsersArgs = {
  path: "users",
  queryKey: "users",
  schema: userSchema,
};

// when using replace id witch correct one
export const fetchUserArgs = {
  id: "",
  path: "users/",
  queryKey: "users/",
  schema: userSchema,
};

export const postUserArgs = {
  path: "users",
  queryKey: "users",
};

// when using replace id witch correct one
export const patchUserArgs = {
  id: "",
  path: "users/",
  queryKey: "users/",
};

// when using replace id witch correct one
export const deleteUserArgs = {
  id: "",
  path: "users/",
  queryKey: "users",
};

export const fetchAnimalsArgs = {
  path: "animals",
  queryKey: "animals",
  schema: animalSchema,
};

// when using replace id witch correct one
export const fetchAnimalArgs = {
  id: "",
  path: "animals/",
  queryKey: "animals/",
  schema: animalSchema,
};

export const postAnimalArgs = {
  path: "animals",
  queryKey: "animals",
};

// when using replace id witch correct one
export const patchAnimalArgs = {
  id: "",
  path: "animals/",
};

// when using replace id witch correct one
export const deleteAnimalArgs = {
  id: "",
  path: "animals/",
  queryKey: "animals",
};
