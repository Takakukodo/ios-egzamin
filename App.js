/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

//autor: wojciech kuśmierz

import {TextInput} from 'react-native-paper';
import md5 from 'md5';
import {Button} from 'react-native-paper';
import {Component} from 'react';
import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function Item({wynik}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{wynik}</Text>
    </View>
  );
}

export default class App extends Component {
  state = {
    nazwisko: '',
    imie: '',
    wynik: '',
  };

  displayResult = () => {
    const md = md5(`${this.state.nazwisko} ${this.state.imie}`);
    const url = `http://sroczynski.pl/iosexamrest/examresult/${md}`;

    return fetch(url)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        console.log(responseData.result);
        this.setState({wynik: responseData.result});
      })
      .catch(error => this.setState({error}));
  };

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <TextInput
            label="Nazwisko"
            value={this.state.nazwisko}
            onChangeText={nazwisko => this.setState({nazwisko})}
          />
          <TextInput
            label="Imię"
            value={this.state.imie}
            onChangeText={imie => this.setState({imie})}
          />
          <Button onPress={this.displayResult} mode="contained" color="#4d2c91">
            Search
          </Button>

          <Item wynik={this.state.wynik} />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fafafa',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#fafafa',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  container: {
    flex: 1,

    backgroundColor: '#fafafa',
  },
  item: {
    backgroundColor: '#4d2c91',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
    color: '#fafafa',
  },
});
