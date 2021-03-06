import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { gray, red } from '../utils/colors'



class DeckRow extends Component {
    render(){
      const { deck } = this.props
      return (
        <View style={styles.row}>
          <TouchableOpacity
            underlayColor={red}
            onPress={() => this.props.navigation.navigate(
              'DeckDetail',
              { deck }
            )}
            style={styles.deckInfo}
          >
              <Text style={[styles.centralizeText, {fontSize: 22}]}> {deck.title} </Text>
              <Text style={[styles.centralizeText, {color: gray}]}> {deck.questions.length} cards </Text>
          </TouchableOpacity>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: gray,
    height: 150
  },
  deckInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  centralizeText: {
    textAlign: 'center'
  }
})

export default DeckRow
