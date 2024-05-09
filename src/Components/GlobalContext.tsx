import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dog, NewDog, TActiveTab, TGlobalContext } from "../types";
import { Requests } from "../requests";
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

  const updateDogFavorite = async (dog: Dog) => {
    setAllDogs(
      allDogs.map((oldDog) =>
        oldDog.id == dog.id ? { ...dog, isFavorite: true } : oldDog
      )
    );
    await Requests.updateDog(dog)
      .then(() => toast.success(`We love you ${dog.name}`))
      .catch((err) => {
        setAllDogs(allDogs);
        toast.error(err.message);
      });
  };

  const updateDogUnfavorite = async (dog: Dog) => {
    setAllDogs(
      allDogs.map((oldDog) =>
        oldDog.id == dog.id ? { ...dog, isFavorite: false } : oldDog
      )
    );
    await Requests.updateDog(dog)
      .then(() => toast.success(`Go fuck yourself ${dog.name}`))
      .catch((err) => {
        setAllDogs(allDogs);
        toast.error(err.message);
      });
  };

  const deleteDog = async (dog: Dog) => {
    setAllDogs(allDogs.filter((oldDog) => oldDog !== dog));
    await Requests.deleteDog(dog)
      .then(() => {
        toast.success(`Bye bye ${dog.name}`);
      })
      .catch(() => {
        setAllDogs(allDogs);
        toast.error(`Couldn't delete ${dog.name}`);
      });
  };

  const addNewDog = async (newDog: NewDog) => {
    setIsLoading(true);
    await Requests.postDog(newDog)
      .then(() => {
        getAllDogs();
        toast.success("Welcome to the family" + newDog.name);
      })
      .catch(() => toast.error("Error Occured"))
      .finally(() => {
        setIsLoading(false);
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
