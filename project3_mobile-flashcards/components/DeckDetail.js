import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {getDeck} from '../utils/helpers'
import {connect} from 'react-redux'

class DeckDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deck: {
        questions: []
      }
    }
  }

  static navigationOptions = ({navigation}) => {
    const {deck} = navigation.state.params
    return {title: `${deck} Card Deck`}
  }

  render() {
    const deck = this.props.decks[this.props.navigation.state.params.deck]
    const {questions} = deck

    return (<View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.cardCount}>
          {`${deck.questions.length} Card(s)`}
        </Text>
      </View>

      <View style={styles.btnWrapper}>
        <TouchableOpacity style={[styles.addBtn, styles.btn]} onPress={() => this.props.navigation.navigate('AddCard', {deck})}>
          <Text style={styles.addBtnText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.startBtn, styles.btn]} onPress={() => this.props.navigation.navigate('QuizDeck', {deck, questions})}>
          <Text style={styles.startBtnText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textWrapper: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 36,
    color: 'black'
  },
  cardCount: {
    fontSize: 24,
    color: 'gray'
  },
  btnWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  addBtn: {
    backgroundColor: 'white'
  },
  startBtn: {
    backgroundColor: 'black'
  },
  btn: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    paddingLeft: 50,
    paddingRight: 50,
    margin: 10
  },
  addBtnText: {
    color: 'gray'
  },
  startBtnText: {
    color: 'white'
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    decks: state,
    ...ownProps
  }
}

export default connect(mapStateToProps)(DeckDetail)
