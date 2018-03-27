import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'

class Decks extends Component {

  state = {
    loading: true
  }

  componentDidMount() {
    getDecks()
      .then((entries) => this.props.dispatch(receiveDecks))
      .then(() => this.setState({ loading: false }))
  }

  render(){
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Decks</Text>
        <Text>{JSON.stringify(this.props.theDecks)}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

function mapStateToProps (state){
  return {
    theDecks: state
  }
}

export default connect(mapStateToProps)(Decks)
