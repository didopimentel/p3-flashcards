import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { green, red } from '../utils/colors'

class Quiz extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params.deck

    return {
      title: `Quiz: ${title} `
    }
  }

  state = {
    currentQuestion: 0,
    score: 0,
    answered: false
  }

  activateAnswer() {
    this.setState({
      answered: true
    })
  }

  submitCorrect() {
    this.setState({
      score: this.state.score+1,
      currentQuestion: this.state.currentQuestion+1
    })
  }

  submitIncorrect() {
    this.setState({
      currentQuestion: this.state.currentQuestion+1
    })
  }

  render() {
    const { deck } = this.props.navigation.state.params
    const numOfQuestions = deck.questions.length
    const { currentQuestion, score, answered } = this.state

    if(currentQuestion == numOfQuestions) {
      return(
        <View style={styles.container}>
          <View style={styles.finalContainer}>
            <Text style={styles.finalText}> You finished the test!</Text>
            <Text>Your score: {score/numOfQuestions * 100}%</Text>
          </View>
        </View>
      )
    }

    return(
      <View style={styles.container}>
        <View style={styles.questionCounterBox}>
          <Text>{currentQuestion} / {numOfQuestions} </Text>
        </View>
        <View style={styles.questionBox}>
          <Text style={styles.question}>
            {deck.questions[currentQuestion].question}
          </Text>
          {answered
            ? <Text>{deck.questions[currentQuestion].answer}</Text>
            : <Answer onPress={() => this.activateAnswer()} />}
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: green}]}
            onPress={() => this.submitCorrect()}
          >
            <Text>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: red}]}
            onPress={() => this.submitIncorrect()}
          >
            <Text>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const Answer = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={{color: red}}>Answer</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  questionCounterBox: {
    paddingLeft: 20,
    paddingTop: 20
  },
  question: {
    marginBottom: 40,
    fontSize: 22,
  },
  questionBox: {
    marginTop: 100,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonBox: {
    flex: 1,
    paddingBottom: 100,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  button: {
    margin: 10,
    padding: 10,
    paddingRight: 40,
    paddingLeft: 40,
    borderRadius: 10
  },
  finalContainer: {
    paddingTop: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finalText: {
    color: red,
    fontSize: 30
  }
})

export default Quiz
