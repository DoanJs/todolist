// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBMFaHRrAkTTrjby7q0047KKPqzwQfWKdU',
  authDomain: 'todolistapp-f7869.firebaseapp.com',
  projectId: 'todolistapp-f7869',
  storageBucket: 'todolistapp-f7869.firebasestorage.app',
  messagingSenderId: '202946032005',
  appId: '1:202946032005:web:dc8dbc3921a2d758f1d4ec',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize Firebase Auth for that app immediately
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {app, auth};
