import { Link, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View , Text, Button} from "react-native";
import { UserContext } from "../UserContext";


export default function Fav() {
   const globalUser = useContext(UserContext);
    if (!globalUser) {
      throw new Error("Login must be used within a UserProvider");
    }
    const { user } = globalUser;
    const [email, setEmail] = useState("");
    useEffect(() => {
      setEmail(user?.email ? String(user.email) : "");
    }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "yellow"
      }}
    >
       <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>homeeeee</Text>
            <Link href="/details">
              <Text>Go to Details</Text>
            </Link>
            <Link href="/auth/Login">
              <Text>Go to Login</Text>
            </Link>
            <Button title="Go to Fav" onPress={() => router.push("../fav")} />
            <Button
              title="Go to splash"
              onPress={() => router.push("/auth/Splash")}
            />
      
            <Text> from conext {user?.email}</Text>
            <Text> from async {email}</Text>
          </View>
    </View>
  );
}