import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { gray, white, red } from '../utils/colors'

class DeckDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params

    return {
      title: `${deck.title}`
    }
  }

  navigateToAddCard() {
    const { navigation } = this.props
    const title = navigation.state.params.deck.title
    navigation.navigate(
      'NewCard',
      { title }
    )
  }

  navigateToQuiz() {
    const { navigation } = this.props
    const { deck } = (this.props.deck === undefined)
                          ? this.props.navigation.state.params
                          : this.props
    navigation.navigate(
      'Quiz',
      { deck }
    )
  }

  render() {
    const { deck } = (this.props.deck === undefined)
                          ? this.props.navigation.state.params
                          : this.props
    return (
      <View style={styles.container}>
        <View style={styles.description}>
          <Text style={{fontSize: 32}}> {deck.title} </Text>
          <Text style={{color: gray, fontSize: 20}}> {deck.questions.length} cards </Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.buttonStyle, {backgroundColor: white}]}
            onPress={() => this.navigateToAddCard()}
          >
            <Text style={styles.textAlignCenter}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonStyle, {backgroundColor: red}]}
            onPress={() => this.navigateToQuiz()}
          >
            <Text style={[styles.textAlignCenter, {color: white}]}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  description: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
    padding: 10,
    margin: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: gray,
    height: 45,
    paddingLeft: 30,
    paddingRight: 30,
  },
  textAlignCenter: {
    textAlign: 'center'
  }
})

function mapStateToProps(state, ownProps) {
  const newDeck = Object.keys(state).map((key) => {
    const deck = state[key]
    return deck
  }).filter((deck) => (deck.title === ownProps.navigation.state.params.deck.title))
  return {deck: newDeck[0]}
}

export default connect(mapStateToProps)(DeckDetail)
