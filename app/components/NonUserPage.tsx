import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/build/Ionicons'
import { styles } from '../style'
import AntDesign from "@expo/vector-icons/AntDesign";
import { Button } from 'react-native-paper';
import { router } from "expo-router";

export default function NoNUserPage({title}: {title: string}) {
  return (
    <View>
            <Text style={styles.pageMessage}>{title}</Text>  
      <AntDesign
              name="exclamation-circle"
              size={200}
              color={styles.appBlue.color}
                style={{ alignSelf: 'center', marginTop: 20 }}
            />
          <Button
            style={{ backgroundColor: styles.appBlue.color, marginTop: 20, width: 200, alignSelf: 'center' }}
            onPress={() => { router.push("/auth/Login"); }}
          >
              <Text style={{ color: 'white' }}>Login</Text>
          </Button>

    </View>
  )
}

