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
    Keyboard.dismiss()
    if (this.state.question.text.trim() !== '' && this.state.answer.text.trim() !== '') {
      const payload = {
        question: this.state.question.text,
        answer: this.state.answer.text
      }
      addCardToDeck(this.state.deck, payload)
        .then(this.props.dispatch(addCard(this.state.deck, payload)))
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
        .then(this.props.navigation.navigate('DeckDetail', {deck: this.state.deck}))
    } else {
      let question = {
        text: this.state.question.text,
        error: {
          status: false,
        }
      }

      let answer = {
        text: this.state.answer.text,
        error: {
          status: false,
        }
      }
      if (this.state.question.text.trim() === '') {
        question.error.status = true
        question.error.text = 'Question must be filled'
      }

      if (this.state.answer.text.trim() === '') {
        answer.error.status = true
        answer.error.text = 'Answer must be filled'
      }

      this.setState({question, answer})
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
    return (<View style={styles.container}>
      <TextInput onChangeText={(text) => this.handleQuestionTextChange(text)} value={this.state.question.text} placeholder="Question" style={styles.input}/> {this.state.question.error.status && (<Text style={styles.errorText}>{this.state.question.error.text}</Text>)}
      <TextInput onChangeText={(text) => this.handleAnswerTextChange(text)} value={this.state.answer.text} placeholder="Answer" style={styles.input}/> {this.state.answer.error.status && (<Text style={styles.errorText}>{this.state.answer.error.text}</Text>)}
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
    borderColor: '#333',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'stretch',
    margin: 15
  },
  submitBtn: {
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40
  },
  submitBtnText: {
    color: '#fff'
  },
  errorText: {
    color: '#aa0000',
    marginBottom: 15
  }
})

export default connect()(CardCreate)
