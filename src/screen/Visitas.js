import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import * as ClienteService from '../service/ClienteService'
import * as VisitaService from '../service/VisitaService'
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import Header from '../components/Header'

export default function App() {

  const [nomeCliente, setNomeCliente] = useState("")
  const [data, setData] = useState("")
  const [cep, setCep] = useState("")
  const [localicaoVs, setLocalicaoVs] = useState([])

  const [key, setKey] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [pessoas, setPessoas] = useState([])
  const [visitas, setVisitas] = useState([])
  const [loading, setLoaging] = useState(false)
  const [localicao, setLocalicao] = useState([])

  const limparDados = () => {
    setNomeCliente("")
    setData("")
    setCep("")
    setLocalicaoVs("")

    setMensagem("")
    setKey("")
    setLocalicao([])
  }

  const saveVisita = () => {
    console.log(localicao)
    if (localicaoVs.length <= 0) {
      setMensagem("Verifique o Cliente")
    } else {
      const cliente = {
        nomeCliente: nomeCliente,
        data: data,
        cep : cep,
        localicaoVs : localicaoVs
      }

      VisitaService.saveVisita(cliente, key)
        .then(res => {
          setMensagem("Dados Inseridos com Sucesso!")
          limparDados()
          getVisita()
        })
        .catch(erro => setMensagem(erro))
    }
  }

  const deleteVisita = (visita) => {
    setLoaging(true)
    VisitaService.deleteVisita(visita)
      .then(() => getVisita())
      .catch(erro => setMensagem(erro))
  }

  const getVisita = () => {
    setLoaging(true)
    VisitaService.getVisita()
      .then(retorno => {
        console.log(retorno)
        setVisitas(retorno)
        setLoaging(false)
      })
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
    getVisita()
  }, [])

  return (
    <View style={styles.container}>
      <Header titulo="Visitas"/>
      <Text style={{marginLeft: 10}}>Clientes:</Text>

      <View style={styles.cliente}>
        <ActivityIndicator animating={loading} size="small" color="#00ff00" />
        <FlatList
          data={pessoas}
          renderItem={({ item }) =>
            <TouchableOpacity
              onPress={() => {
                setNomeCliente(item.nome)
                setCep(item.cep)
                setLocalicaoVs(item.localicao)
              }}
            >
              <View style={styles.boxCli}>
                <View style={styles.boxCollumCli}>
                  <Text style={styles.boxTitle}>{item.nome}</Text>
                  <Text>{item.cep}</Text>
                </View>
              </View>
            </TouchableOpacity>
          }
        />
      </View>
      
      <View style={{marginLeft: 10}}>
      <Text>{mensagem}</Text>
      <TextInput
        style={nomeCliente ? styles.caixaTexto : styles.caixaTextoError}
        placeholder='Cliente'
        value={nomeCliente}
      />
      </View>
      <DatePicker
        style={styles.caixaTextoData}
        mode="date"
        placeholder="Data"
        format="DD/MM/YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          }
        }}
        date={data}
        onDateChange={(data) => {setData(data)}}
      />

      <View style={styles.caixaBotao}>
        <View style={styles.botao}>
          <Button
            title="Salvar"
            color="#263fa0"
            onPress={saveVisita}
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

      <View style={{height:"30%"}}>
        <ActivityIndicator animating={loading} size="small" color="#00ff00" />
        <FlatList
          data={visitas}
          renderItem={({ item }) =>
            <View style={styles.box}>
              <View style={styles.boxCollum}>
                <Text style={styles.boxTitle}>{item.nomeCliente}</Text>
                <Text>{item.data}</Text>
              </View>
              <View style={styles.boxCollumAction}>
 
                  <Icon
                    onPress={() => deleteVisita(item)}
                    name="check"
                    size={30} color="#263fa0" />
         
              </View>
            </View>
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
  }, caixaTexto: {
    width: "97%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    marginTop: 7,
    
  }, caixaTextoError: {
    width: "97%",
    borderWidth: 1,
    borderColor: "red",
    padding: 5,
    marginTop: 7
  }, 
  caixaTextoData: {
    width: "95%",
    marginTop: 7,
    marginLeft: 10,
  },

  caixaBotao: {
    marginTop: 5,
    flexDirection: "row",
    marginLeft: 10,
  },
  botao: {
    marginRight : 5,
    width:"48%"
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
  },  box: {
    flexDirection: "row",
    width: "95%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    padding: 10,
    marginTop: 2,
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
  },
  cliente: {
    height: "30%",
    width : "100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxCli: {
    flexDirection: "row",
    width: "95%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    padding: 10,
    marginLeft :10,
    marginTop: 2,
    height: 50
  }, boxCollumCli: {
    width: "100%"
  },
  boxCollumActionCli: {
    width: "20%"
  },
});
