import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <Text>
            Home
          </Text>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
