import React, {Component} from 'react'
import DeckCard from './DeckCard'
import {connect} from 'react-redux'
import {receiveDecks} from '../actions'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {getDecks, clearData} from '../utils/helpers'

class DeckList extends Component {
  componentDidMount = () => {
    getDecks().then(decks => this.props.dispatch(receiveDecks(decks)))
  }


  render() {
    return (
      !this.props.decks || Object.keys(this.props.decks).length === 0
      ? (
      <View style={styles.container}>
        <Text>
          No decks created
        </Text>
      </View>)
      : (
      <View style={styles.container}>
        {
          this.props.decks && Object.keys(this.props.decks).map(
            deck => (
          <TouchableOpacity
            style={[styles.row, styles.borderedItem]}
            key={this.props.decks[deck].title}
            onPress={() => this.props.navigation.navigate('DeckDetail', {deck})}>

            <DeckCard key={this.props.decks[deck].title} deck={this.props.decks[deck]}/>
          </TouchableOpacity>))
        }
      </View>))
  }
}

function mapStateToProps(decks) {
  return {decks: decks}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    height: 100,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  borderedItem: {
    borderWidth: 1,
    borderRadius: 3
  },
})

export default connect(mapStateToProps)(DeckList)
