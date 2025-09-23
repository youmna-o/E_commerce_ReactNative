import { Slot, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserProvider } from "./UserContext";
import { styles } from "./style";
export default function RootLayout() {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Login",
          }}
        />
        <Stack.Screen
          name="home"
          options={{
            headerLeft: () => (
              <Ionicons
                name="menu"
                size={24}
                color="blue"
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="auth/Register"
          options={{
            title: "Register",
            headerStyle: { backgroundColor: styles.appBlue.color },
            headerTitleStyle: { color: "white" },
            //  headerShown: false,
          }}
        />
        <Stack.Screen name="fav" />
        {/* if you want to customize the header title */}
        <Stack.Screen
          name="details"
          options={{
            title: "About",
            headerStyle: { backgroundColor: "green" },
          }}
        />
        <Stack.Screen
          name="auth/Login"
          options={{
            title: "Login",
            headerStyle: { backgroundColor: "blue" },
            headerTitleStyle: { color: "white" },
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </UserProvider>
  );
}
//    ( <SafeAreaView style={{ flex: 1 }}> // must use flex 1 to fill the screen
//     <View><Text style={{ fontSize: 20, fontWeight: 'bold' }}>Headerrrrrrrr</Text></View>
//       <Stack />
//           <View><Text style={{ fontSize: 20, fontWeight: 'bold' }}>fooooooot</Text></View>

//     </SafeAreaView>
//   );
// }
