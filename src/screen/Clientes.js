import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import * as ClienteService from '../service/ClienteService'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import Header from '../components/Header'

export default function App() {

  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [cep, setCep] = useState("")
  const [CNPJ, setCNPJ] = useState("")

  const [key, setKey] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [pessoas, setPessoas] = useState([])
  const [loading, setLoaging] = useState(false)
  const [localicao, setLocalicao] = useState([])

  const pesquisaLatLong = async (cep) => {
    if (!cep){
       console.log("teste")
    }
    else{
      let posicao = await Location.geocodeAsync(cep)
        .then(resultado => {
          console.log(resultado)
          setLocalicao({
            latitude: resultado[0].latitude,
            longitude: resultado[0].longitude,
            latitudeDelta: 0.010,
            longitudeDelta: 0.010,
          })
        })
        .catch(erro => console.log(erro))
        // getEndereco(localicao)
    }
  }


  const limparDados = () => {
    setNome("")
    setTelefone("")
    setCep("")
    setCNPJ("")

    setMensagem("")
    setKey("")
    setLocalicao([])
  }

  const saveCliente = () => {
    console.log(localicao)
    if (localicao.length <= 0) {
      setMensagem("Verifique o CEP")
    } else {
      const cliente = {
        nome: nome,
        telefone: telefone,
        cep : cep,
        CNPJ: CNPJ,
        localicao : localicao
      }

      ClienteService.saveCliente(cliente, key)
        .then(res => {
          setMensagem("Dados Inseridos com Sucesso!")
          limparDados()
          getCliente()
        })
        .catch(erro => setMensagem(erro))
    }
  }

  const deleteCliente = (cliente) => {
    setLoaging(true)
    ClienteService.deleteCliente(cliente)
      .then(() => getCliente())
      .catch(erro => setMensagem(erro))
  }

  const getCliente = () => {
    setLoaging(true)
    ClienteService.getCliente()
      .then(retorno => {
        console.log(retorno)
        setPessoas(retorno)
        setLoaging(false)
      })
      .catch(erro => setMensagem(erro))
  }

  useEffect(() => {
    getCliente()
  }, [])

  return (
    <View style={styles.container}>
      <Header titulo="Clientes"/>
      <View style={{marginLeft: 10}}>
        <Text>{mensagem}</Text>
        <TextInput
          style={nome ? styles.caixaTexto : styles.caixaTextoError}
          placeholder='Nome'
          value={nome}
          onChangeText={texto => setNome(texto)}
        />
        
        <TextInput
          style={CNPJ ? styles.caixaTexto : styles.caixaTextoError}
          placeholder='CNPJ'
          value={CNPJ}
          onChangeText={texto => setCNPJ(texto)}
        />
        <TextInput
          style={telefone ? styles.caixaTexto : styles.caixaTextoError}
          placeholder='Telefone'
          value={telefone}
          onChangeText={texto => setTelefone(texto)}
        />

        <View style={styles.boxCep}>
        <TextInput
          style={cep ? styles.caixaTextoCEP : styles.caixaTextoErrorCEP}
          placeholder='Cep'
          value={cep}
          onChangeText={texto => setCep(texto)}
          
        />
        <Icon style={styles.iconCEP}
                        onPress={() => pesquisaLatLong(cep)}
                        name="search"
                        size={30} color="red" />
        </View>
      </View>
      <View style={styles.caixaBotao}>
        <View style={styles.botao}>
          <Button
            title="Salvar"
            color="#263fa0"
            onPress={saveCliente}
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

      <View style={styles.boxClientes}>
        <ActivityIndicator animating={loading} size="small" color="#00ff00" />
        <FlatList
          data={pessoas}
          renderItem={({ item }) =>
            <TouchableOpacity
              onPress={() => {
                setNome(item.nome)
                setTelefone(item.telefone)
                setCep(item.cep)
                setCNPJ(item.CNPJ)
                setKey(item.key)
              }}
            >
              <View style={styles.box}>
                <View style={styles.boxCollum}>
                  <Text style={styles.boxTitle}>{item.nome}</Text>
                  <Text>{item.telefone}</Text>
                </View>
                <View style={styles.boxCollumAction}>
                  <Text>
                    <Icon
                      onPress={() => deleteCliente(item)}
                      name="trash"
                      size={30} color="#ed6c04" />
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          }
        />
      </View>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }, boxClientes:{
    height: "50%"
  },
  caixaTexto: {
    width: "97%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    marginTop: 7
    
  }, caixaTextoError: {
    width: "97%",
    borderWidth: 1,
    borderColor: "red",
    padding: 5,
    marginTop: 7
  }, caixaBotao: {
    marginTop: 5,
    flexDirection: "row"
  },
  botao: {
    marginLeft: 10,
    width:"46%"
  }, caixaTextoCEP: {
    width: "90%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    marginRight : 10
  }, caixaTextoErrorCEP: {
    width: "90%",
    borderWidth: 1,
    borderColor: "red",
    padding: 5,
    marginRight : 10
  },
  mensagemErro: {
    color: "red",
    marginLeft: 20
  }, box: {
    flexDirection: "row",
    width: "95%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
  }, boxCollum: {
    width: "80%"
  },
  boxCollumAction: {
    width: "20%"
  },
  boxTitle: {
    fontWeight: "bold",
    color:"#263fa0"
  }, boxCep: {
    flexDirection: "row",
    width: "95%",
    marginTop: 7
  }, iconCEP: {
    marginTop: 3
  }
});
