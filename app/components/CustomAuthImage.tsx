import { StyleSheet, Text, View , Image } from 'react-native'
import React from 'react'
import { styles } from '../style';


export default function CustomAuthImage() {
  return (
            <View>
               <Image source={
                require('../../assets/images/login1.jpeg' )}
                style={{
                      width: 240, 
                      height: 240,
                      alignSelf: 'center',
                      borderRadius: 120,
    } } />
             </View>
  )
}



