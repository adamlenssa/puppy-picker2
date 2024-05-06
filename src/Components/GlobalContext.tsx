import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dog, NewDog, TActiveTab, TGlobalContext } from "../types";
import { Requests } from "./requests";
import toast, { Toaster } from "react-hot-toast";

export const GlobalContext = createContext<TGlobalContext>(
  {} as TGlobalContext
);
function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<TActiveTab>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const favoritedDogs = allDogs.filter((dog) => dog.isFavorite);
  const unfavoritedDogs = allDogs.filter((dog) => !dog.isFavorite);

  const getAllDogs = () => {
    return Requests.getAllDogs()
      .then((res) => {
        setIsLoading(true);
        setAllDogs(res);
      })
      .catch((err) => {
        toast.error("error occured");
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateDogFavorite = (dog: Dog) => {
    setAllDogs(
      allDogs.map((oldDog) =>
        oldDog.id == dog.id ? { ...dog, isFavorite: true } : oldDog
      )
    );
    Requests.updateDog(dog).then((response) => {
      if (!response.ok) {
        setAllDogs(allDogs);
      } else return;
    });
  };

  const updateDogUnfavorite = (dog: Dog) => {
    setAllDogs(
      allDogs.map((oldDog) =>
        oldDog.id == dog.id ? { ...dog, isFavorite: false } : oldDog
      )
    );
    Requests.updateDog(dog).then((response) => {
      if (!response.ok) {
        setAllDogs(allDogs);
      } else return;
    });
  };

  const deleteDog = (dog: Dog) => {
    setAllDogs(allDogs.filter((oldDog) => oldDog !== dog));
    Requests.deleteDog(dog).then((response) => {
      if (!response.ok) {
        setAllDogs(allDogs);
      } else return;
    });
  };

  const addNewDog = (newDog: NewDog) => {
    const newStateAddition = { ...newDog, id: allDogs.length };
    setAllDogs(allDogs.concat(newStateAddition));
    Requests.postDog(newDog).then((response) => {
      if (!response.ok) {
        setAllDogs(allDogs);
        toast.error("error occcured");
      } else {
        toast.success(`Welcome to the Family ${newDog.name}`);
        console.log(response);
      }
    });
  };

  useEffect(() => {
    getAllDogs();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        allDogs,
        setAllDogs,
        activeTab,
        setActiveTab,
        isLoading,
        setIsLoading,
        favoritedDogs,
        unfavoritedDogs,
        getAllDogs,
        updateDogFavorite,
        updateDogUnfavorite,
        deleteDog,
        addNewDog,
      }}
    >
      <Toaster />
      {children}
    </GlobalContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => useContext(GlobalContext);
export default GlobalContextProvider;
