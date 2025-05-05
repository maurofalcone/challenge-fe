import { useContext } from "react";
import {
  FavoritesContext,
  FavoritesContextValue,
} from "../../../components/global/contexts/FavoritesProvider";

export const useFavorites = (): FavoritesContextValue => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
