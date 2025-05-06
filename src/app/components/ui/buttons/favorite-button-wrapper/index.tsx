import { useFavorites } from "@/app/utils/hooks/useFavorites";

import { FC } from "react";
import FavoriteButton from "@/app/components/shared/buttons/favorite-button";

interface Props {
  id: string;
  email: string;
  firstName: string;
  image: string;
  username: string;
  gender: string;
  birthDate: string;
  age: number;
}

const FavoriteButtonWrapper: FC<Props> = (props) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  return (
    <FavoriteButton
      onClick={() => toggleFavorite({ ...props })}
      isChecked={isFavorite(props.id)}
    />
  );
};

export default FavoriteButtonWrapper;
