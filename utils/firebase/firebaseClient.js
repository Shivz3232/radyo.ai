import firebase from 'firebase';
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyAmcPMJ63GviCAC6jwAMmUZX0ft1dZ1rnE',
  authDomain: 'radyoai-ee5af.firebaseapp.com',
  projectId: 'radyoai-ee5af',
  storageBucket: 'radyoai-ee5af.appspot.com',
  messagingSenderId: '303320838864',
  appId: '1:303320838864:web:ab8e834dc78177f7f7e4d5',
}; //Add firebase client tokens to enable login

export default function firebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
}
