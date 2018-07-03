import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard
} from 'react-native';
import {saveDeckTitle} from '../utils/helpers'
import {addDeck} from '../actions'
import {connect} from 'react-redux'

class CreateDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      error: {
        status: false,
        text: ''
      }
    };
  }

  submit = () => {
    Keyboard.dismiss()
    if (this.state.text.trim() !== '') {
      saveDeckTitle(this.state.text)
        .then(this.props.dispatch(addDeck(this.state.text)))
        .then(this.setState({
        text: '',
        error: {
          status: false,
          text: ''
        }
      }))
      .then(this.props.navigation.navigate('DeckDetail', {deck: this.state.text}))
    } else {
      this.setState({
        error: {
          status: true,
          text: 'Title can not be empty'
        }
      })
    }
  }
  handleTitleTextChange = (text) => {
    this.setState({
      text,
      error: {
        status: false,
        text: ''
      }
    })
  }
  render() {
    return (<View style={styles.container}>
      <Text style={styles.label}>What is the title of your new deck?</Text>
      <TextInput
        onChangeText={(text) => this.handleTitleTextChange(text)}
        value={this.state.text} placeholder="Deck Title"
        style={styles.inputText}/>

        {this.state.error.status && (<Text>{this.state.error.text}</Text>)}
      <TouchableOpacity onPress={this.submit} style={styles.submitBtn}>
        <Text style={styles.submitBtnText}>Submit</Text>
      </TouchableOpacity>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 30,
    margin: 15,
    marginTop: 0,
    marginBottom: 20,
    textAlign: 'center'
  },
  inputText: {
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
  }
})

export default connect()(CreateDeck)
