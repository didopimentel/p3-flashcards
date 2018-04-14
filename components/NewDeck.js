import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput } from 'react-native'
import { red, gray } from '../utils/colors'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'


class NewDeck extends Component {

  state = {
    inputText: ''
  }

  textHandler (text) {
    this.setState({
      inputText: text
    })
  }

  submit = () => {
    const deckTitle  = this.state.inputText
    const deck = {
        title: deckTitle,
        questions: []
      }
    
    this.props.dispatch(addDeck({
      [deckTitle]: deck
    }))

    saveDeckTitle(deckTitle)

    this.props.navigation.navigate(
      'DeckDetail',
      { deck }
    )

  }

  render(){
    return(
      <View style={styles.page}>
        <Text style={styles.title}>What is the title of your deck?</Text>
        <TextInput
          onChangeText={(text) => this.textHandler(text)}
          value={this.state.inputText}
          placeholder='Write the deck name'
          style={styles.box}
          underlineColorAndroid='rgba(0,0,0,0)'
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.submit()}
        >
          <Text>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  title: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 40
  },
  box: {
    justifyContent: 'center',
    borderColor: red,
    borderRadius: 5,
    margin: 15,
    fontSize: 15,
    width: 200,
    paddingLeft: 20,
    height: 30,
    borderWidth: 1
  },
  button: {
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: red,
    padding: 10
  }
})

export default connect()(NewDeck)
