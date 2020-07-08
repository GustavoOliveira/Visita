import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import * as authService from '../service/authService'
import Header from '../components/Header'

export default function App(props) {

  const [mensagem, setMensagem] = useState("")
  const [email, setEmail] = useState("luiz.pf@outlook.com")
  const [password, setPassword] = useState("123456")
  const { navigation } = props


  const validarLogin = () => {
    authService.login(email, password)
      .then(retorno => {
        navigation.replace('Menu')
      })
      .catch(erro => {
        setMensagem(erro.message)
      })
    //     
  }

  const criaUsuario = () => {
    authService.createUserAPI(email, password)
      .then(retorno => {
        setMensagem("Usuario Criado")
      })
      .catch(erro => {
        setMensagem(erro.message)
      })
    //     
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo.png')}
      />
      <Text>Login!</Text>
      <Text style={styles.mensagemErro}>{mensagem}</Text>
      <TextInput
        style={styles.caixaTexto}
        placeholder="e-mail"
        value={email}
        onChangeText={texto => setEmail(texto)}

      />
      <TextInput
        style={styles.caixaTexto}
        placeholder="password"
        value={password}
        secureTextEntry
        onChangeText={texto => setPassword(texto)}
      />
      <View style={styles.caixaBotao}>
        <View style={styles.botao}>
          <Button
            title="Login"
            onPress={validarLogin}
            color="#ed6c04"
          />
        </View>
        <View style={styles.botao}>
          <Button
            title="Novo Registro"
            color="#263fa0"
            onPress={criaUsuario}
            style={styles.botao}
          />
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, caixaTexto: {
    width: "90%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    marginTop: 5
  }, caixaBotao: {
    marginTop: 5,
    flexDirection: "row"
  },
  botao: {
    marginRight: 3,
    marginLeft: 3,
    width:"44%"
  },
  mensagemErro: {
    color: "red",
    marginLeft: 20  
  },
  logo: {
    width: 200,
    height: 200,
  },
  button: {
    color:"#ed6c04"
  }
});
