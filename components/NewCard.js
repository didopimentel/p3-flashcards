import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addCardToDeck } from '../utils/api'
import { black, red, white, gray } from '../utils/colors'
import { addCard } from '../actions'
import { NavigationActions } from 'react-navigation'

class NewCard extends Component {

  state = {
    question: '',
    answer: ''
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params

    return {
      title: `Add a card to ${title} `
    }
  }

  questionHandler(text) {
    this.setState({
      ...this.state,
      question: text
    })
  }

  answerHandler(text) {
    this.setState({
      ...this.state,
      answer: text
    })
  }

  submitCard() {
    const { navigation } = this.props
    const { title } = navigation.state.params
    const card = {
      question: this.state.question,
      answer: this.state.answer
    }

    if (card.question !== '' && card.answer !== '') {

      this.props.dispatch(addCard(
        title,
        card
      ))
      addCardToDeck(title, card)
      navigation.pop()
      //navigation.dispatch(NavigationActions.back({key: navigation.state.params.key}))

    }

  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            onChangeText={(text) => this.questionHandler(text)}
            placeholder='Write your question here'
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholderTextColor={gray}
            value={this.state.question}
          />
          <TextInput
            style={styles.inputBox}
            onChangeText={(text) => this.answerHandler(text)}
            placeholder='Write your answer here'
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholderTextColor={gray}
            value={this.state.answer}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.submitCard()}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  inputBox: {
    borderRadius: 5,
    borderColor: black,
    borderWidth: 1,
    paddingLeft: 20,
    width: 300,
    height: 30,
    margin: 15
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30
  },
  button: {
    backgroundColor: red,
    borderRadius: 10,
    borderColor: black,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  }
})

function mapStateToProps(state) {
  return {
    decks: state
  }
}

export default connect(mapStateToProps)(NewCard)
