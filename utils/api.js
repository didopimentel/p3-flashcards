import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'Flashcards:decks'

export function getDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
                     .then(decks => {return decks === null ? {} : JSON.parse(decks)})
}

export function getDeck (name) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
                     .then(decks => decks.filter(current => current.name != name))
}

export function saveDeckTitle ({ entry, name }) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [name]: entry
  }))
}

export function addCardToDeck ({ deckName, card }) {
  AsyncStorage.getItem(DECK_STORAGE_KEY, (err, result) => {
    if (result) {
      var newDeck = JSON.parse(result)
      newDeck[deckName].questions = newDeck[deckName].questions.concat(card)
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(newDeck))
    }
  })
}
