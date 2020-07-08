import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = (props) => {
    const {titulo} = props
    
    return (
        <View style = {styles.header}>
            <Text style = {styles.titulo}>{titulo}</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        flexDirection : "row",
        backgroundColor : "#263fa0",
        width : "100%",
    },

    titulo : {
        color : "#FFFFFF",
        textAlign : "center",
        fontSize : 30,
        marginTop : 25,
        width : "100%"
    },

    sobre : {
        alignSelf: "center",
        marginTop : 20,
        marginLeft : 10,
    }
})
