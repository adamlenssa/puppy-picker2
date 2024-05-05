import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dog, TActiveTab, TGlobalContext } from "../types";
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

  const updateDog = (dog: Dog) => {
    setIsLoading(true);
    Requests.updateDog(dog)
      .then(() => getAllDogs())
      .then(() => toast.success("Success"))
      .catch((err) => {
        toast.error("error occured");
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  const deleteDog = (dog: Dog) => {
    setIsLoading(true);
    Requests.deleteDog(dog)
      .then(() => getAllDogs())
      .then(() => toast.success(`Bye ${dog.name}`))
      .finally(() => setIsLoading(false));
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
        updateDog,
        deleteDog,
      }}
    >
      <Toaster />
      {children}
    </GlobalContext.Provider>
  );
}
export const useGlobalContext = () => useContext(GlobalContext);
export default GlobalContextProvider;
