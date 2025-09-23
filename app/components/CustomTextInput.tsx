
import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

export interface TextInputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export const CustomTextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
}) => {
  return (
    <View>
      <Text style={{ 
        fontSize: 16,
         fontWeight: 'bold',
         color: '#0045fe',
         paddingLeft:16}}>{label}</Text>
     <TextInput 
            style={{borderWidth:1, 
            borderColor:"black",
             borderRadius: 10,
              height: 50, 
             padding:10,
              margin:10}} 
             placeholder={placeholder}
             value={value}
             onChangeText={onChangeText}
             /> 
    </View>
  )
}

