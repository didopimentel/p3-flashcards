import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import DeckDetail from './components/DeckDetail'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'
import { red, white } from './utils/colors'
import { createStore } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import { setLocalNotification } from './utils/helpers'

const Tabs = TabNavigator({
  History: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-browsers' size={30} color={tintColor} />
    },
  },
  AddEntry: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? red : white,
    style: {
      height: 50,
      backgroundColor: Platform.OS === 'ios' ? white : red,
      shadowColor: 'rgba(200, 0, 0, 0.5)',
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
    screen: Tabs
  },
  DeckDetail: {
    screen: DeckDetail
  },
  NewCard: {
    screen: NewCard
  },
  Quiz: {
    screen: Quiz
  }
})

export default class App extends React.Component {

  componentDidMount () {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MainNavigator />
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
