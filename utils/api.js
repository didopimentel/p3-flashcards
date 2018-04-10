import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'Flashcards:decks'

export function getDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
                     .then(decks => JSON.parse(decks))
}

export function getDeck (name) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
                     .then(decks => decks.filter(current => current.name != name))
}

export function saveDeckTitle (name) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [name]: {
      title: name,
      questions: []
    }
  }))
}

export function addCardToDeck (title, card) {
  AsyncStorage.getItem(DECK_STORAGE_KEY, (err, result) => {
    if (result) {
      var newDeck = JSON.parse(result)
      newDeck[title].questions = newDeck[title].questions.concat(card)
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(newDeck))
    }
  })
}
