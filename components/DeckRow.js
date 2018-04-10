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
            style={styles.deckInfo}>
              <Text style={{fontSize: 22}}> {deck.title} </Text>
              <Text style={{color: gray}}> {deck.questions.length} cards </Text>
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
    flexDirection: 'column',
    justifyContent: 'center'
  }
})

export default DeckRow
