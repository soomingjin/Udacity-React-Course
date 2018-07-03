import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

export default class QuizQuestion extends Component {

  render() {
    const {question, showAnswer, flipCard} = this.props
    let modeText = 'Question:'
    let titleText = question.question
    let buttonText = 'Show Answer'
    if (showAnswer) {
      titleText = question.answer
      buttonText = 'Show Question'
      modeText = 'Answer:'
    }
    return (
    <View style={[this.props.style]}>
      <Text style={styles.titleTextStyle}>{modeText}</Text>
      <Text style={styles.titleTextStyle}>{titleText}</Text>
      <TouchableOpacity onPress={() => flipCard()} style={styles.flipCard}>
        <Text style={styles.flipCardText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>)
  }
}

const styles = StyleSheet.create({
  titleTextStyle: {
    fontSize: 28,
    margin: 20
  },
  flipCard: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
    borderWidth: 0,
    borderColor: 'gray',
    borderRadius: 3,
  },
  flipCardText: {
    color: 'red'
  }
})
