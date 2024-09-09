import { initializeApp, FirebaseOptions, getApp, getApps  } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyDGcIgA31SWw5LyxwxdNx-gm6WPRRduy3g',
  authDomain: 'knick-dee8b.firebaseapp.com',
  projectId: 'knick-dee8b',
  storageBucket: 'knick-dee8b.appspot.com',
  messagingSenderId: '387691445909',
  appId: '1:387691445909:web:7527d5d1ead05632f4659c',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const firestore = getFirestore(app);
