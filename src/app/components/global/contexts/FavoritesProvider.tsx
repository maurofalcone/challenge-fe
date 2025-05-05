"use client";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

const LOCAL_STORAGE_KEY = "favorites";

interface FavoriteItem {
  id: string;
  email: string;
  image: string;
  username: string;
  firstName: string;
  age: number;
  birthDate: string;
  gender: string;
}

type FavoritesMap = Record<string, FavoriteItem>;

export interface FavoritesContextValue {
  isFavorite: (id: string) => boolean;
  toggleFavorite: (params: FavoriteItem) => void;
  getAllFavorites: () => FavoriteItem[];
}

export const FavoritesContext = createContext<
  FavoritesContextValue | undefined
>(undefined);

function getInitialFavorites(): FavoritesMap {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoritesMap>(() =>
    getInitialFavorites()
  );

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      console.warn("Couldn't save favorite");
    }
  }, [favorites]);

  const isFavorite = useCallback((id: string) => !!favorites[id], [favorites]);

  const toggleFavorite = useCallback((favorite: FavoriteItem) => {
    setFavorites((prev) => {
      const updated = { ...prev };
      if (updated[favorite.id]) {
        delete updated[favorite.id];
      } else {
        updated[favorite.id] = favorite;
      }
      return updated;
    });
  }, []);

  const getAllFavorites = useCallback(
    () => Object.values(favorites),
    [favorites]
  );

  const value = useMemo(
    () => ({
      isFavorite,
      toggleFavorite,
      getAllFavorites,
    }),
    [isFavorite, toggleFavorite, getAllFavorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
