// Right now these dogs are constant, but in reality we should be getting these from our server

import { DogCard } from "./DogCard";
import { useGlobalContext } from "./GlobalContext";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () =>
  // no props allowed
  {
    const {
      activeTab,
      allDogs,
      deleteDog,
      updateDogFavorite,
      updateDogUnfavorite,
      isLoading,
      favoritedDogs,
      unfavoritedDogs,
    } = useGlobalContext();
    return (
      //  the "<> </>"" are called react fragments, it's like adding all the html inside
      // without adding an actual html element
      <>
        {activeTab == "all" &&
          allDogs.map((dog) => (
            <DogCard
              dog={dog}
              onTrashIconClick={() => {
                deleteDog(dog);
              }}
              onEmptyHeartClick={() => {
                updateDogFavorite(dog);
              }}
              onHeartClick={() => {
                updateDogUnfavorite(dog);
              }}
              isLoading={isLoading}
              key={dog.id}
            />
          ))}
        {activeTab == "favorited" &&
          favoritedDogs.map((dog) => (
            <DogCard
              dog={dog}
              onTrashIconClick={() => {
                deleteDog(dog);
              }}
              onEmptyHeartClick={() => {
                updateDogFavorite(dog);
              }}
              onHeartClick={() => {
                updateDogUnfavorite(dog);
              }}
              isLoading={isLoading}
              key={dog.id}
            />
          ))}
        {activeTab == "unfavorited" &&
          unfavoritedDogs.map((dog) => (
            <DogCard
              dog={dog}
              onTrashIconClick={() => {
                deleteDog(dog);
              }}
              onEmptyHeartClick={() => {
                updateDogFavorite(dog);
              }}
              onHeartClick={() => {
                updateDogUnfavorite(dog);
              }}
              isLoading={isLoading}
              key={dog.id}
            />
          ))}
      </>
    );
  };
