import * as FileSystem from 'expo-file-system';
import { View, Text, StyleSheet } from 'react-native';

export default function Details() {
    return (
        <View style={style.container}>
            <Text>Details</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        backgroundColor: "red"

    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:20,
        textAlign:'center',
        justifyContent:'center'
    }
});
