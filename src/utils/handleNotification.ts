// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {getApp} from '@react-native-firebase/app';
// import messaging, {
//   getMessaging,
//   getToken,
//   requestPermission,
// } from '@react-native-firebase/messaging';
import {auth, db} from '../../firebaseConfig';
import {arrayUnion, doc, getDoc, updateDoc} from 'firebase/firestore';
import {Alert} from 'react-native';

import {getMessaging, getToken} from 'firebase/messaging';

const messaging = getMessaging();
const user = auth.currentUser;

export class HandleNotification {
  static checkNotificaionPermission = async () => {
    // const authStatus = await requestPermission(getMessaging(getApp()));
    // if (
    //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //   authStatus === messaging.AuthorizationStatus.PROVISIONAL
    // ) {
    //   this.getFCMToken();
    // }
    this.getFCMToken();
  };

  static getFCMToken = async () => {
    // const fcmToken = await AsyncStorage.getItem('fcmToken');
    // if (!fcmToken) {
    //   const token = await getToken(getMessaging(getApp()));
    //   console.log('FCMToken:', token);
    //   if (token) {
    //     await AsyncStorage.setItem('fcmToken', token);
    //     this.UpdateToken(token);
    //   }
    // }

    getToken(messaging, {
      vapidKey:
        'BLdSOAEfIWjScfN76-Sj-xYvlgruRiGkEr66NqyxE-EGhRpSecdLpLQyhhRoZewjMhh7z1pZbNeoFl8iRdTgKLs',
    })
      .then(currentToken => {
        console.log(currentToken);
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
        } else {
          // Show permission request UI
          console.log(
            'No registration token available. Request permission to generate one.',
          );
          // ...
        }
      })
      .catch(err => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
  };

  static UpdateToken = async (token: string) => {
    if (user) {
      const docSnap = await getDoc(doc(db, 'users', user.uid));
      if (docSnap.exists()) {
        const data: any = docSnap.data();

        if (!data.tokens || !data.tokens.includes(token)) {
          await updateDoc(doc(db, 'users', user?.uid), {
            tokens: arrayUnion(token),
          })
            .then(() => {
              Alert.alert('Updated tokens completed!!!');
            })
            .catch((error: any) => {
              console.log(error);
            });
        }
      } else {
        console.log(`getDoc token in user error`);
      }
    }
  };
}
