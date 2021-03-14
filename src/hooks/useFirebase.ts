/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-duplicates */
import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyAI2D2uRI6GQNdItgCxcvzX6rlZTb3uj6g',
  authDomain: 'last-letter-93d4b.firebaseapp.com',
  projectId: 'last-letter-93d4b',
  storageBucket: 'last-letter-93d4b.appspot.com',
  messagingSenderId: '988322627024',
  appId: '1:988322627024:web:3b8b21d562b24f8dad4dd5',
  measurementId: 'G-WHMLKNHC85',
}

const initializeFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  } else {
    firebase.app()
  }
}

const getFirestoreInstance = async () => {
  if (!firebase.firestore) {
    await import('firebase/firestore')
  }
  return firebase.firestore()
}

const useFirebase = async () => {
  initializeFirebase()
  const firestore = await getFirestoreInstance()

  return { firestore }
}

export default useFirebase
