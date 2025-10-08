import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors'

export const styles = StyleSheet.create({
    container:{
    flex:1,
    justifyContent:'center',
    padding:8,
    backgroundColor: 'white'
    },

appBlue:{
    color: '#0045fe'
},    
pageTitle:{
    fontSize: 28,
    fontWeight: 'bold',
     color: '#0045fe',
     alignSelf: 'flex-start',
     padding: 10
},
miniTitle:{
   color:  '#0045fe',
   fontSize: 20,
   fontWeight: "bold",
   paddingLeft: "60%",
} ,
pageMessage:{
    color:'black',
    fontSize: 24,
   fontWeight: "bold",
    textAlign: 'center',

}

})