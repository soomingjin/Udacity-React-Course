import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar ,KeyboardAvoidingView } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import CreateDeck from './components/CreateDeck'
import DeckList from './components/DeckList'
import CardCreate from './components/CardCreate'
import DeckDetail from './components/DeckDetail'
import QuizDeck from './components/QuizDeck'
import { createBottomTabNavigator, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { setLocalNotification } from './utils/helpers'
import { purple, white, lightPurple } from './utils/colors'


function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
const tabRouteConfigs = {
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    }
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-create-outline' size={30} color={tintColor} />
    }
  }
}

const tabNavgatorConfig = {
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: lightPurple
    },
    title: 'Mobile Flashcards',
    header: null
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
}

const Tabs = {}
if (Platform.OS === 'ios'){
  Tabs = createBottomTabNavigator(tabRouteConfigs, tabNavgatorConfig)
} else {
  Tabs = createMaterialTopTabNavigator(tabRouteConfigs, tabNavgatorConfig)
}

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerBackTitle: 'Home'
    }
  },
  DeckDetail: {
    screen: DeckDetail,
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
  QuizDeck: {
    screen: QuizDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
})

export default class App extends Component {
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
