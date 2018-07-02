import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar ,KeyboardAvoidingView } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import CreateDeck from './components/CreateDeck'
import DeckList from './components/DeckList'
import CardCreate from './components/CardCreate'
import DeckTitle from './components/DeckTitle'
import QuizDeck from './components/QuizDeck'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { setLocalNotification } from './utils/helpers'
import { purple, white } from './utils/colors'


function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    }
  },
  DeckCreate: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-create-outline' size={30} color={tintColor} />
    }
  }
},{
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#4e4cb8'
    },
    title: 'Mobile Flashcards',
    headerLeft: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple: white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white: purple,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerBackTitle: 'Home'
    }
  },
  DeckDetail: {
    screen: DeckTitle,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  AddCard: {
    screen: CardCreate,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  DeckQuiz: {
    screen: QuizDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
})

export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </KeyboardAvoidingView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
