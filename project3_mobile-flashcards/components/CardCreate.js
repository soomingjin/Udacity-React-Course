import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard
} from 'react-native'
import {connect} from 'react-redux'
import {addCardToDeck} from '../utils/helpers'
import {addCard} from '../actions'
import { darkRed, darkGray } from '../utils/colors'

class CardCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deck: this.props.navigation.state.params.deck.title,
      question: {
        text: '',
        error: {
          status: false,
          text: ''
        }
      },
      answer: {
        text: '',
        error: {
          state: false,
          text: ''
        }
      }
    };
  }

  static navigationOptions = ({navigation}) => {
    const {deck} = navigation.state.params
    return {title: `New Card in ${deck.title}`}
  }

  submit = () => {
    { question, answer, deck } = this.state
    Keyboard.dismiss()
    if (question.text.trim() !== '' && answer.text.trim() !== '') {
      const payload = {
        question: question.text,
        answer: answer.text
      }
      addCardToDeck(deck, payload)
        .then(this.props.dispatch(addCard(deck, payload)))
        .then(this.setState({
          question: {
            text: '',
            error: {
              status: false,
              text: ''
            }
          },
          answer: {
            text: '',
            error: {
              state: false,
              text: ''
            }
          }
        }))
        .then(this.props.navigation.navigate('DeckDetail', {deck: deck}))
    } else {
      let currQuestion = {
        text: question.text,
        error: {
          status: false,
        }
      }

      let currAnswer = {
        text: answer.text,
        error: {
          status: false,
        }
      }
      if (question.text.trim() === '') {
        currQuestion.error.status = true
        currQuestion.error.text = 'Question must be filled'
      }

      if (answer.text.trim() === '') {
        currAnswer.error.status = true
        currAnswer.error.text = 'Answer must be filled'
      }

      this.setState({currQuestion, currAnswer})
    }
  }
  handleQuestionTextChange = (text) => {
    this.setState({
      question: {
        text,
        error: {
          status: false,
        }
      }
    })
  }

  handleAnswerTextChange = (text) => {
    this.setState({
      answer: {
        text,
        error: {
          status: false,
        }
      }
    })
  }
  render() {
    { question, answer, deck } = this.state
    return (<View style={styles.container}>
      <TextInput onChangeText={(text) => this.handleQuestionTextChange(text)} value={question.text} placeholder="Question" style={styles.input}/> {question.error.status && (<Text style={styles.errorText}>{question.error.text}</Text>)}
      <TextInput onChangeText={(text) => this.handleAnswerTextChange(text)} value={answer.text} placeholder="Answer" style={styles.input}/> {answer.error.status && (<Text style={styles.errorText}>{answer.error.text}</Text>)}
      <TouchableOpacity onPress={this.submit} style={styles.submitBtn}>
        <Text style={styles.submitBtnText}>Submit</Text>
      </TouchableOpacity>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: darkGray,
    borderRadius: 5,
    padding: 10,
    alignSelf: 'stretch',
    margin: 15
  },
  submitBtn: {
    backgroundColor: darkGray,
    borderRadius: 5,
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40
  },
  submitBtnText: {
    color: 'white'
  },
  errorText: {
    color: darkRed,
    marginBottom: 15
  }
})

export default connect()(CardCreate)
