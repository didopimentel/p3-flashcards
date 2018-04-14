import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { green, red } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

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
    answered: false,
    bounceValue: new Animated.Value(1)
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

  navigateToQuiz() {
    //const { navigation } = this.props
    //const { deck } = navigation.state.params
    /*navigation.navigate(
      'Quiz',
      { deck }
    )*/
    this.setState({
      currentQuestion: 0,
      score: 0,
      answered:false
    })

  }

  navigateToDeck() {
    const { navigation } = this.props
    const { deck } = navigation.state.params
    /*navigation.navigate(
      'DeckDetail',
      { deck }
    )*/
    navigation.pop()
  }

  render() {
    const { deck } = this.props.navigation.state.params
    const numOfQuestions = deck.questions.length
    const { currentQuestion, score, answered, bounceValue } = this.state
    const quizScore = score/numOfQuestions * 100

    if (numOfQuestions == 0) {
      return (
        <View style={styles.container}>
          <View style={styles.noCardsContainer}>
            <Text style={{textAlign:'center'}}> You do not have any cards yet. </Text>
          </View>
        </View>
      )
    }

    if (currentQuestion == numOfQuestions) {

      Animated.sequence([
        Animated.timing(bounceValue, { duration: 100, toValue: 1.1 }),
        Animated.spring(bounceValue, { toValue: 1, friction: 4 })
      ]).start()

      clearLocalNotification()
        .then(setLocalNotification).then(console.log())

      return (
        <View style={styles.container}>
          <View style={styles.finalContainer}>
            <Animated.Text style={[styles.finalText, {transform: [{scale: bounceValue}]}]}> You finished the test!</Animated.Text>
            <Animated.Text style={{transform: [{scale: bounceValue}]}}>Your score: {quizScore.toFixed(3)}%</Animated.Text>
          </View>
          <View style={styles.buttonBox}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: green}]}
              onPress={() => this.navigateToQuiz()}
            >
              <Text>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: red}]}
              onPress={() => this.navigateToDeck()}
            >
              <Text>Back to Deck</Text>
            </TouchableOpacity>
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
    <Text style={{color: red}}>Show Answer</Text>
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
  },
  noCardsContainer: {
    paddingTop: 200,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Quiz
