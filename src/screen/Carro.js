import React, { useState, useEffect } from 'react';
import {AsyncStorage} from 'react-native'
import {  StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Header from '../components/Header'

export default function App() {

  const [carro, setCarro] = useState("")
  const [mensagem, setMensagem] = useState("")

  const limparDados = () => {
    setCarro("")
    setMensagem("")
  }

  const saveCarro = () => {
    console.log(carro)
    AsyncStorage.setItem("carro",carro)
  }

  const getCarro = async() =>{
    let userMemory = await AsyncStorage.getItem("carro")
    setCarro(userMemory)
    console.log(carro)
  }

  useEffect(() => {
    getCarro()
  }, [])

  return (
    <View style={styles.container}>
      <Header titulo="Carro"/>
      <Text>{mensagem}</Text>
      <TextInput
        style={carro ? styles.caixaTexto : styles.caixaTextoError}
        placeholder='Carro'
        onChangeText = {valor => setCarro(valor)}
        value={carro}
      />
      
      <View style={styles.caixaBotao}>
        <View style={styles.botao}>
          <Button
            title="Salvar"
            color="#263fa0"
            onPress={saveCarro}
          />
        </View>
        <View style={styles.botao}>
          <Button
            title="Limpar Dados"
            color="#ed6c04"
            onPress={limparDados}
          />
        </View>
      </View>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  }, caixaTexto: {
    width: "95%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    marginTop: 7,
    marginLeft : 10
  }, caixaTextoError: {
    width: "95%",
    borderWidth: 1,
    borderColor: "red",
    padding: 5,
    marginTop: 7,
    marginLeft : 10
  },
  caixaBotao:{
    width : "95%",
    marginTop : 5,
    marginLeft: 10
  },
  botao:{
    marginTop: 5
  }
});
