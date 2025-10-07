import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Product, User, UserContextType } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user from storage", error);
      } finally {
        setLoading(false);
      }
    };
    const loadFav = async () => {
      try {
        const favoriteProducts = await AsyncStorage.getItem("fav");
        if (favoriteProducts) {
          setFavoriteProducts(JSON.parse(favoriteProducts));
        }
      } catch (error) {
        console.error("Failed to load fav from storage", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
    loadFav();
  }, []);

  const addToFavorites = async (product: Product) => {
    if (!favoriteProducts.some((p) => p.id === product.id)) {
      const newFavs = [...favoriteProducts, product];
      //cerate a new array with the new product added
      setFavoriteProducts(newFavs);
      await AsyncStorage.setItem("fav", JSON.stringify(newFavs));
    }
  };

  const removeFromFavorites = async (productId: number) => {
    const newFavs = favoriteProducts.filter((p) => p.id !== productId);
    setFavoriteProducts(newFavs);
    await AsyncStorage.setItem("fav", JSON.stringify(newFavs));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        favoriteProducts,
        setFavoriteProducts,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
