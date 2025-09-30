import { View, Text, Button, FlatList } from "react-native";
import { Link, router } from "expo-router";
import { use, useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Category, Product, User } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../style";
import ProductCard from "../components/ProductCard";
import { Chip } from "react-native-paper";
export default function Home() {
  const globalUser = useContext(UserContext);
  if (!globalUser) {
    throw new Error("Login must be used within a UserProvider");
  }
  const { user } = globalUser;
  const [email, setEmail] = useState("");
  useEffect(() => {
    setEmail(user?.email ? String(user.email) : "");
  }, []);

  const [productsList, setProductsList] = useState<Product[]>([]);
   const [beautyProductsList, setBeautyProductsList] = useState<Product[]>([]);
  const [fragrancesProductsList, setFragrancesProductsList] = useState<
    Product[]
  >([]);
  const [furnitureProductsList, setFurnitureProductsList] = useState<Product[]>(
    []
  );
  const [groceriesProductsList, setGroceriesProductsList] = useState<Product[]>(
    []
  );

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedList,setSelectedList]=useState<Product[]>([]);

  const filters = [
    {  name: "All", category: "all" },
    {  name: "Beauty", category: Category.Beauty },
    {  name: "Fragrances", category: Category.Fragrances},
    {  name: "Furniture", category: Category.Furniture},
    {  name: "Groceries", category: Category.Groceries},
  ];

   const selectList = (filterName: string) => {
      switch (filterName) {
        case "All":
          setSelectedList(productsList);
          break;
        case "Beauty":
          setSelectedList(beautyProductsList);
          break;
        case "Fragrances":
          setSelectedList(fragrancesProductsList);
          break;
        case "Furniture":
          setSelectedList(furnitureProductsList);
          break;
        case "Groceries":
          setSelectedList(groceriesProductsList);
          break;
        default:
          setSelectedList(productsList);
          break;
      }

   }
   
  const getProductsFromApi = () => {
    return fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((json) => {
        setProductsList(json.products);
        setBeautyProductsList(
          json.products.filter((item: Product) => item.category === "beauty")
        );
        setFragrancesProductsList(
          json.products.filter(
            (item: Product) => item.category === "fragrances"
          )
        );
        setFurnitureProductsList(
          json.products.filter((item: Product) => item.category === "furniture")
        );
        setGroceriesProductsList(
          json.products.filter((item: Product) => item.category === "groceries")
        );
        setSelectedList(json.products);
        return json.products;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getProductsFromApi();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Horizontal FlatList for chips */}
      <FlatList
        data={filters}
        renderItem={({ item })=> (
    <Chip
      selected={selectedFilter === item.name}
      onPress={() => {setSelectedFilter(item.name)
        selectList(item.name)}
      }
      style={{
        margin: 4,
        width: 120,
        height: 40, 
        justifyContent: "center",
        backgroundColor: selectedFilter === item.name ? styles.appBlue.color : 'lightgrey',
      }}
    >
      {item.name}
    </Chip>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
      />

      {/* Vertical FlatList for products */}
      <FlatList
        data={selectedList}
        numColumns={2}
        renderItem={({ item }) => {
          console.log(item.id);
          return (
            <ProductCard
              title={item.title}
              price={item.price}
              rating={item.rating}
              category={item.category}
              thumbnail={item.thumbnail}
            ></ProductCard>
          );
        }}
      />
    </SafeAreaView>
  );
}
