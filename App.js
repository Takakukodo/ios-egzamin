/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {FlatList} from 'react-native';
//import Constants from 'expo-constants';
import {Component} from 'react';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function Item({title, code, city}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{city}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{code} C</Text>
    </View>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
          code: '23',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
          code: '23',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
          code: '23',
        },
      ],
      api: null,
      temp: null,
    };
  }

  componentDidMount() {
    return fetch(
      'http://api.openweathermap.org/data/2.5/weather?q=London&appid=',
    )
      .then(response => response.json())
      .then(responseData => {
        this.setState({api: responseData});
        this.setState({temp: this.state.api.main.temp});
      })
      .catch(error => this.setState({error}));
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{this.state.temp}</Text>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => (
            <Item title={item.title} code={item.code} city="cos" />
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#757575',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#757575',
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

    backgroundColor: '#757575',
  },
  item: {
    backgroundColor: '#a4a4a4',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
