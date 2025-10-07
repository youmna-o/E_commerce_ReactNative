import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Category, Product } from "../types";
import { styles } from "../style";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../UserContext";
import CustomButton from "./CustomButton";
import AddToCartButton from "./AddToCartButton";

export interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  showAddToFavButton?: boolean;
}

export default function ProductCard({
  product,
  onPress,
  showAddToFavButton = true,
}: ProductCardProps) {
  const { title, price, rating, thumbnail, category } = product;
  const link = thumbnail;

  const globalUser = useContext(UserContext);
  if (!globalUser) {
    throw new Error("Login must be used within a UserProvider");
  }
  const { favoriteProducts, addToFavorites, removeFromFavorites } = globalUser;
  const { savedProducts, addToCart, removeFromCart } = globalUser;

  // Check if this product is already in favorites
  const isFavorite = favoriteProducts.some((fav) => fav.id === product.id);
  const isSaved = savedProducts.some((saved) => saved.id === product.id);

  const handleFavoritePress = async () => {
    if (isFavorite) {
      await removeFromFavorites(product.id);
    } else {
      await addToFavorites(product);
    }
  };
  const handleAddToCartPress = async () => {
    if (isSaved) {
    } else {
      await addToCart(product);
    }
  };

  const handleRemoveFromCartPress = async () => {
    if (isSaved) {
      await removeFromCart(product.id);
    }
  };
  return (
    <View style={style.card}>
      <View style={style.imageContainer}>
        <Image source={{ uri: link }} style={style.image} resizeMode="cover" />
        <Pressable style={style.iconContainer} onPress={handleFavoritePress}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? styles.appBlue.color : "white"}
          />
        </Pressable>
      </View>
      <Text style={style.name} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      <Text style={style.category}>{category}</Text>
      <Text style={style.price}>Price: ${price}</Text>

      <AddToCartButton
        CustomButtonProps={{
          title: showAddToFavButton ? "Add to Cart" : "Remove",
          onPress: showAddToFavButton ? handleAddToCartPress :handleRemoveFromCartPress,
        }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  card: {
    backgroundColor: "lightgrey",
    borderRadius: 16,
    borderWidth: 1,
    padding: 4,
    margin: 8,
    width: "46%",
  },
  image: {
    borderColor: "black",
    backgroundColor: "white",
    width: "100%",
    height: 140,
    borderRadius: 8,
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
  },
  imageContainer: {
    position: "relative", // This allows absolute positioning for the icon
  },
  iconContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  category: {
    textAlign: "center",
    fontSize: 18,
    padding: 4,
    fontWeight: "bold",
    alignContent: "center",
    color: styles.appBlue.color,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 4,
  },
});
