import React, { useState, useEffect } from 'react';
import {  StyleSheet, Text, View,ScrollView  } from 'react-native';
import Header from '../components/Header'

export default function App() {


  return (
    <View style={styles.container}>
      <Header titulo="Sobre"/>
      <ScrollView style={styles.scroll}>
      <View style={styles.card}>
        <Text style={styles.titulo}>
          Modo de Desenvolvimento
        </Text>
        <Text>
        O desenvolvimento do aplicativo foi feito através do modo Expo, pois é um trabalho academico e não ultiliza muitos componentes nativos do Android ou do iOS, sendo assim o Expo oferece todas as ferramentas necessarias para a construção do APP.
        </Text>
       </View>

       <View style={styles.card}>
          <Text style={styles.titulo}>
          No APP é possível:
          </Text>
          <Text>
            - Cadastrar, Altera, Ver e Deletar clientes.
          </Text>
          <Text>
            - Criar e Finalizar Visitas com os clientes cadastrados
          </Text>
          <Text>
            - Visualizar no mapa a localização dos clientes a serem vizitados
          </Text>
          <Text>
            - Cadastrar Carro usado para as visitas
          </Text>
       </View>

       <View style={styles.cardArq}>
          <Text style={styles.titulo}>
          Arquitetura de Software
          </Text>
          <Text>
            - A principal pasta do projeto é a src onde ficam as pastas: back-end, components, screen e service.
          </Text>

          <Text style={styles.titulo}>
            back-end: 
          </Text>
          <Text>
            - É responsável por fazer a ligação com o firebase que é o banco de dados e validador de login.
          </Text>

          <Text style={styles.titulo}>
          components: 
          </Text>
          <Text>
            - Pasta que contem os componentes que são utilizados no projeto, nesse projeto o Header foi contemporizado e usado na maioria das telas.
          </Text>

          <Text style={styles.titulo}>
          screen:
          </Text>
          <Text>
            - Onde ficas as telas (Views), o projeto conta com 7 telas (Carro, Clientes, Login, Mapa, Menu, Sobre e Visitas).
          </Text>

          <Text style={styles.titulo}>
          services:
          </Text>
          <Text>
            - Responsável por controlar os dados fazendo a ligação entre as telas e o back-end, o projeto conta com 3 services o authService responsável pela validação do login, o ClienteService responsável pelo Crud do Clientes, e por fim o VisitaService responsável pelo Crud das Visitas.
          </Text>
       </View>

       <View style={styles.cardDev}>
          <Text style={styles.titulo}>
            Densenvolvido por:
          </Text>
          <Text>
           Luiz Gustavo de Oliviera
          </Text>
          <Text>
           Bruno Daneli
          </Text>
       </View>
       </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
  },
  scroll:{
    width : "100%",
  },
  card:{
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    width: "90%",
    height: 140,
    marginTop: 10,
    padding: 10,
    marginLeft: 20
  },titulo: {
    fontWeight: "bold",
    color:"#263fa0",
  },
  cardArq:{
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    width: "90%",
    height: 430,
    marginTop: 10,
    padding: 10,
    marginLeft: 20
  },
  cardDev:{
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    width: "90%",
    height: 80,
    marginTop: 10,
    padding: 10,
    marginLeft: 20,
    marginBottom: 10
  }
});
