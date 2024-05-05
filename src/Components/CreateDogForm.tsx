import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { NewDog } from "../types";
import { useGlobalContext } from "./ThemeContext";
import { Requests } from "./requests";
import toast from "react-hot-toast";

export const CreateDogForm = () =>
  // no props allowed
  {
    const [newDog, setNewDog] = useState<NewDog>({
      name: "",
      image: "/assets/blue-heeler.png",
      description: "",
      isFavorite: false,
    });
    const { setIsLoading, getAllDogs } = useGlobalContext();
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          setIsLoading(true);
          Requests.postDog(newDog)
            .then(() => {
              getAllDogs();
              setNewDog({
                name: "",
                image: "/assets/blue-heeler.png",
                description: "",
                isFavorite: false,
              });
              toast.success("Thank you for creating a dog!!");
            })
            .finally(() => {
              setIsLoading(false);
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
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id=""
          onChange={(e) => {
            setNewDog({ ...newDog, image: e.target.value });
          }}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" />
      </form>
    );
  };
