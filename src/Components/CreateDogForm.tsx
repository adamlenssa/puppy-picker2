import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { NewDog } from "../types";
import { useGlobalContext } from "./GlobalContext";

export const CreateDogForm = () =>
  // no props allowed
  {
    const [newDog, setNewDog] = useState<NewDog>({
      name: "",
      image: "/assets/blue-heeler.png",
      description: "",
      isFavorite: false,
    });
    const { addNewDog, isLoading } = useGlobalContext();
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          addNewDog(newDog).then(() => {
            setNewDog({
              name: "",
              image: "/assets/blue-heeler.png",
              description: "",
              isFavorite: false,
            });
          });
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          onChange={(e) => {
            setNewDog({ ...newDog, name: e.target.value });
          }}
          value={newDog.name}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          onChange={(e) => {
            setNewDog({ ...newDog, description: e.target.value });
          }}
          value={newDog.description}
          disabled={isLoading}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id=""
          onChange={(e) => {
            setNewDog({ ...newDog, image: e.target.value });
          }}
          disabled={isLoading}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  };
