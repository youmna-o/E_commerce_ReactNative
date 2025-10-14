import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Product, User, UserContextType } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, router } from "expo-router";

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [receipt , setReceipt]=useState<Number>(0);

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

    const loadSaved = async () => {
      try {
        const savedProducts = await AsyncStorage.getItem("cart");
        if (savedProducts) {
          setSavedProducts(JSON.parse(savedProducts));
        }
      } catch (error) {
        console.error("Failed to load fav from storage", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
    loadFav();
    loadSaved();
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

  const addToCart = async (product: Product) => {
    if (!savedProducts.some((p) => p.id === product.id)) {
      const newSaved = [...savedProducts, product];
      //cerate a new array with the new product added
      setSavedProducts(newSaved);
      await AsyncStorage.setItem("cart", JSON.stringify(newSaved));
    }
  };

  const removeFromCart = async (productId: number) => {
    const newSaved = savedProducts.filter((p) => p.id !== productId);
    setSavedProducts(newSaved);
    await AsyncStorage.setItem("cart", JSON.stringify(newSaved));
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("email");
       router.push("/auth/Login");
      
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
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
        savedProducts,
        setSavedProducts,
        addToCart,
        removeFromCart,
        logout,
        receipt,
        setReceipt,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
