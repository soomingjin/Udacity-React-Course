import {AsyncStorage} from 'react-native'
import {Permissions, Notifications} from 'expo'

// getDecks: return all of the decks along with their titles, questions, and answers.
// getDeck: take in a single id argument and return the deck associated with that id.
// saveDeckTitle: take in a single title argument and add it to the decks.
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.

const DECK_STORAGE_KEY = 'UDACICARD_DECK_STORAGE'
const DECK_NOTIFICATION_KEY = 'UDACICARD_NOTIFICATION'

export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(r => JSON.parse(r))
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }))
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    const data = JSON.parse(results)
    data[title] = {
      title,
      questions: [
        ...data[title].questions,
        card
      ]
    }
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
  })
}

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(DECK_NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotification() {
  return {
    title: 'Remember to revise!',
    body: 'You haven\'t reviewed any of your card decks today.',
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(DECK_NOTIFICATION_KEY).then(JSON.parse).then(data => {
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync()

          let tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          tomorrow.setHours(20)
          tomorrow.setMinutes(0)

          Notifications.scheduleLocalNotificationAsync(createNotification(), {
            time: tomorrow,
            repeat: 'day'
          })

          AsyncStorage.setItem(DECK_NOTIFICATION_KEY, JSON.stringify(true))
        }
      })
    }
  })
}
