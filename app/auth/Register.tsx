import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import CustomAuthImage from '../components/CustomAuthImage';
import CustomButton from '../components/CustomButton';
import { CustomTextInput } from '../components/CustomTextInput';
import { styles } from '../style';
import { UserContext } from '../UserContext';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function register() {
     const globalUser = useContext(UserContext);
      if (!globalUser) {
        throw new Error("Login must be used within a UserProvider");
      }
      const { setUser } = globalUser;
      const [email, setEmail] = useState("");
      const [name, setName] = useState("");
      const [phone, setPhone] = useState("");
      const [password, setPassword] = useState("");
      const [isLogIn, setIsLogIn] = useState(false);
  return (
    <ScrollView>
              <Text style={styles.pageTitle}  > Welcom To Register </Text>
         <View style={styles.container}>
           <CustomAuthImage></CustomAuthImage>
           <CustomTextInput
             label="User Name"
             placeholder={"Enter Your UserName"}
             value={name}
             onChangeText={(input) => setName(input)}
           />
           <CustomTextInput
             label="Email"
             placeholder={"Enter Your Email"}
             value={email}
             onChangeText={(input) => setEmail(input)}
           />
           <CustomTextInput
             label="Password"
             placeholder={"Enter Your Password"}
             value={password}
             onChangeText={(input) => setPassword(input)}
           />
           <CustomTextInput
             label="Phone"
             placeholder={"Enter Your Phone"}
             value={phone}
             onChangeText={(input) => setPhone(input)}
           />
   
           <Text>{email}</Text>
   
           <CustomButton
             CustomButtonProps={{
               title: "Register",
               onPress: async () =>{
              const myObject = { email, name, phone, password, isLogIn : true};
              setUser(myObject);
             await AsyncStorage.setItem("user", JSON.stringify(myObject));
              router.push("../tabs");
            },
             }}
           />
         </View>
       </ScrollView>
  )
}

