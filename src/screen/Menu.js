import React from 'react'
import { Button, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header'

export default function App(props) {
    const { navigation } = props
    
    return (
        
        <View style={styles.container}>
            <Header titulo="Menu"/>
            
            <View style={styles.ViewBotao}>
                <Button
                    style={{height:"100%"}}
                    title="Clientes"
                    color="#263fa0"
                    onPress={() =>{navigation.navigate('Clientes')}}
                />
            </View>

            <View style={styles.ViewBotao}>
                <Button
                    style={{height:"100%"}}
                    title="Visitas"
                    color="#263fa0"
                    onPress={() =>{navigation.navigate('Visitas')}}
                />
            </View>
    
            <View style={styles.ViewBotao}>
                <Button
                    style={{height:"100%"}}
                    title="Mapa"
                    color="#263fa0"
                    onPress={() =>{navigation.navigate('Mapa')}}
                />
            </View>

            <View style={styles.ViewBotao}>
                <Button
                    style={{height:"100%"}}
                    title="Carro"
                    color="#263fa0"
                    onPress={() =>{navigation.navigate('Carro')}}
                />
            </View>

            <View style={styles.ViewBotao}>
                <Button
                    style={{}}
                    title="Sobre"
                    color="#263fa0"
                    onPress={() =>{navigation.navigate('Sobre')}}
                />
            </View>

            <View style={styles.ViewBotaoSair}>
                <Button
                    title="Sair"
                    color="#ed6c04"
                    onPress={() =>{navigation.replace('Login')}}
                />
            </View>
        </View>
    );
  }
  
const styles = StyleSheet.create({
    ViewBotao: {
      marginTop: 10,
      height : 40,
      width : "95%",
    },
    ViewBotaoSair: {
        flex: 1,
        justifyContent: 'flex-end',
        width: "95%",
        marginBottom: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },

    button:{
        height: 60
    }
});