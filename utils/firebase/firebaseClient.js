import firebase from 'firebase';
const FIREBASE_CONFIG = {}; //Add firebase client tokens to enable login

export default function firebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  }
}
