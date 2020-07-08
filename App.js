import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './src/screen/Menu'
import Clientes from './src/screen/Clientes'
import Visitas from './src/screen/Visitas'
import Login from './src/screen/Login'
import Mapa from './src/screen/Mapa'
import Carro from './src/screen/Carro'
import Sobre from './src/screen/Sobre'

//Desabilitano Warnings
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Setting a timer'])

//Configurando Encondig
import { decode, encode } from 'base-64'
if (!global.btoa) {
  global.btoa = encode
}
if (!global.atob) {
  global.atob = decode
}

export default function App() {
  const Stack = createStackNavigator();
  
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen 
          name="Menu" component={ Menu }
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Clientes" component={Clientes}
          
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Visitas" component={Visitas}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Mapa" component={Mapa}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Carro" component={Carro}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Sobre" component={Sobre}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Login" component={Login}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  sobre: {
    
  },
});
