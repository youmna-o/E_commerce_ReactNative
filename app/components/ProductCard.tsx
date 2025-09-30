import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Category } from "../types";
import { styles } from "../style";
import { Ionicons } from "@expo/vector-icons";
export interface ProductCardProps {
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  category: Category;
}

export default function ProductCard({
  title,
  price,
  rating,
  thumbnail,
  category,
}: ProductCardProps) {
  const link = thumbnail;
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <View style={style.card}>
      <View style={style.imageContainer}>
        <Image source={{ uri: link }} style={style.image} resizeMode="cover" />
        <Pressable style={style.iconContainer}>
          <Ionicons name="heart" size={24} color={ isFavorite? styles.appBlue.color:"white" }
          onPress={()=>setIsFavorite(!isFavorite)}
          />
        </Pressable>
      </View>
      <Text style={style.name}>{title}</Text>
      <Text style={style.category}>{category}</Text>
      <Text>Rate: {rating}</Text>
      <Text style={style.price}>Price: ${price}</Text>
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
    fontWeight: "bold",
    alignContent: "center",
    color: styles.appBlue.color,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
