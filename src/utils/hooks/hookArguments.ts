import { animalSchema, userSchema } from "@utils/dataSchemas";

export const fetchUsersArgs = {
  path: "users",
  queryKey: "users",
  schema: userSchema,
};

export const fetchUserArgs = {
  path: "users/",
  queryKey: "users/",
  schema: userSchema,
};

export const postUserArgs = {
  path: "users",
  queryKey: "users",
};

export const patchUserArgs = {
  path: "users/",
  queryKey: "users/",
};

export const deleteUserArgs = {
  path: "users/",
  queryKey: "users",
};

export const fetchAnimalsArgs = {
  path: "animals",
  queryKey: "animals",
  schema: animalSchema,
};

export const fetchAnimalArgs = {
  path: "animals/",
  queryKey: "animals/",
  schema: animalSchema,
};

export const postAnimalArgs = {
  path: "animals",
  queryKey: "animals",
};

export const patchAnimalArgs = {
  path: "animals/",
  queryKey: "animals/",
};

export const deleteAnimalArgs = {
  path: "animals/",
  queryKey: "animals",
};
