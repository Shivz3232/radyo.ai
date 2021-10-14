import firebase from 'firebase';
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyD0NSWbtl2INpnjnmkrZ8tlR23RFz6kYeQ',
  authDomain: 'radyoai.firebaseapp.com',
  projectId: 'radyoai',
  storageBucket: 'radyoai.appspot.com',
  messagingSenderId: '766524163305',
  appId: '1:766524163305:web:f0baae0d0c86357fe35c78',
}; //Add firebase client tokens to enable login

export default function firebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
}
