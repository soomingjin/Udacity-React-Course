import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import QuizQuestion from './QuizQuestion'
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import {clearLocalNotifications, setLocalNotification} from '../utils/helpers'

export default class DeckQuiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      idx: 0,
      showAnswer: false
    }
  }

  static navigationOptions = ({navigation}) => {
    const {deck} = navigation.state.params
    return {title: `${deck.title} Deck Quiz`}
  }

  flipCard = () => {
    this.setState((prevState) => {
      return {
        showAnswer: !prevState.showAnswer
      }
    })
  }

  render() {
    const {deck, questions} = this.props.navigation.state.params
    const {idx, score, showAnswer} = this.state

    if (idx >= questions.length) {
      clearLocalNotifications().then(setLocalNotification)
    }
    if (questions.length === 0) {
      return (<View style={styles.container}>
        <View style={styles.container}>
          <Text>Create cards to start quiz</Text>
        </View>
      </View>)
    }
    return (
      <View style={styles.container}>
      {
        idx < questions.length
          ? (<View style={{
              flex: 1,
              alignSelf: 'stretch'
            }}>
            <Text style={styles.counter}>{`${idx + 1}/${questions.length}`}</Text>
            <QuizQuestion question={questions[idx]} showAnswer={showAnswer} flipCard={this.flipCard} style={{
                flex: 4
              }}/>
            <View style={{
                flex: 2
              }}>
              <TouchableOpacity onPress={() => this.setState({
                  idx: idx + 1,
                  score: score + 1
                })} style={[styles.btn, styles.correctBtn]}>
                <Text style={styles.btnText}>
                  Correct
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({
                  idx: idx + 1
                })} style={[styles.btn, styles.incorrectBtn]}>
                <Text style={styles.btnText}>
                  Incorrect
                </Text>
              </TouchableOpacity>
            </View>
          </View>)
          : (
          <View style={{
              flex: 1
            }}>
            <View style={styles.result}>
              <Text style={styles.resultText}>{(score / questions.length * 100).toFixed(1)}% Correct</Text>
            </View>
            <View style={{
                flex: 1
              }}>
              <TouchableOpacity onPress={() => this.setState({idx: 0, score: 0})} style={[styles.btn, styles.normalBtn]}>
                <Text style={styles.btnText}>
                   Restart Quiz
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.normalBtn]} onPress={() => this.props.navigation.navigate('DeckDetail', {deck: deck.title})}>
                <Text style={styles.btnText}>
                  Back to Deck
                </Text>
              </TouchableOpacity>
            </View>
          </View>)
      }
    </View>
  )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 20
  },
  counter: {
    fontSize: 20,
    color: 'gray',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  result: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 15,
    alignSelf: 'stretch'
  },
  correctBtn: {
    backgroundColor: 'green'
  },
  incorrectBtn: {
    backgroundColor: 'red'
  },
  normalBtn: {
    backgroundColor: 'gray'
  },
  btnText: {
    color: 'white',
    fontSize: 18
  },
  resultText: {
    fontSize: 28
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})
