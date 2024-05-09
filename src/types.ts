import { z } from "zod";

export const dogSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  isFavorite: z.boolean(),
});

export type Dog = z.infer<typeof dogSchema>;

export type TActiveTab = "favorited" | "unfavorited" | "form" | "all";
export type TGlobalContext = {
  allDogs: Dog[];
  setAllDogs: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        name: string;
        image: string;
        description: string;
        isFavorite: boolean;
      }[]
    >
  >;
  activeTab: TActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<TActiveTab>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  favoritedDogs: Dog[];
  unfavoritedDogs: Dog[];
  getAllDogs: () => Promise<void>;
  updateDogFavorite: (dog: Dog) => Promise<void>;
  updateDogUnfavorite: (dog: Dog) => Promise<void>;
  deleteDog: (dog: Dog) => Promise<void>;
  addNewDog: (newDog: NewDog) => Promise<void>;
};

export type NewDog = {
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
};
