import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";
export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: () => fetch(`${baseUrl}/dogs`).then((data) => data.json()),
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: (information: Omit<Dog, "id">) =>
    fetch("http://localhost:3000/dogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(information),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Couldn't update dog`);
      }
      return response;
    }),
  // should delete a dog from the database
  deleteDog: (dog: Dog) =>
    fetch(`http://localhost:3000/dogs/${dog.id}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Couldn't update dog`);
      }
      return response;
    }),
  updateDog: (dog: Dog) => {
    const body = dog.isFavorite ? { isFavorite: false } : { isFavorite: true };
    return fetch(`${baseUrl}/dogs/${dog.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Couldn't update dog`);
      }
      return response;
    });
  },
};
