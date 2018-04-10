import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { white, green, gray } from '../utils/colors'
import DeckRow from './DeckRow'

class Decks extends Component {

  state = {
    loading: true,
  }

  componentDidMount() {
    getDecks()
      .then((entries) => this.props.dispatch(receiveDecks(entries)))
      .then(() =>
        this.setState(() =>
          ({ loading: false })
        )
      );
    }

  render(){
    const decks = this.props.theDecks
    const { loading } = this.state

    if (loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }

    if (!decks) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No decks yet.</Text>
        </View>
      )
    }
    return(
      <View style={styles.container}>
       {Object.keys(decks).map((key) => {
         const deck = decks[key]
         return(
           <DeckRow
              navigation={this.props.navigation}
              deck={deck}
              key={key}
           />
       )})}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

function mapStateToProps (state){
  return {
    theDecks: state
  }
}

export default connect(mapStateToProps)(Decks)
