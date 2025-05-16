import AsyncStorage from '@react-native-async-storage/async-storage';
import {arrayUnion, doc, getDoc, updateDoc} from 'firebase/firestore';
import {Alert} from 'react-native';
import {auth, db} from '../../firebaseConfig';

// Migrating to v22
import {
  hasPermission,
  requestPermission,
} from '@react-native-firebase/messaging';
import axios from 'axios';
import {messaging} from '../../firebase';
import {accessToken} from '../contants/appInfos';

const user = auth.currentUser;

export class HandleNotification {
  static checkNotificaionPermission = async () => {
    const permissionEnabled = await hasPermission(messaging);
    if (permissionEnabled) {
      console.log('Notification permission already granted');
      return true;
    }

    try {
      await requestPermission(messaging);
      console.log('Notification permission granted');
      this.getFCMToken();
      return true;
    } catch (error) {
      console.log('Notification permission denied:', error);
      return false;
    }
  };

  static getFCMToken = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('FCMToken exist:', fcmToken);
    if (!fcmToken) {
      const token = await messaging.getToken();
      console.log('FCMToken new:', token);
      if (token) {
        await AsyncStorage.setItem('fcmToken', token);
        this.UpdateToken(token);
      }
    }
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
        console.log('getDoc token in user error');
      }
    }
  };

  static SendNotification = async ({
    memberId,
    title,
    body,
    taskId,
  }: {
    memberId: string;
    title: string;
    body: string;
    taskId: string;
  }) => {
    if (user) {
      try {
        const docSnap = await getDoc(doc(db, 'users', memberId));

        if (docSnap.exists() && docSnap.data().tokens) {
          docSnap.data().tokens.map(async (token: string) => {
            await axios.post(
              'https://fcm.googleapis.com/v1/projects/todolistapp-f7869/messages:send',
              {
                message: {
                  token,
                  notification: {
                    title,
                    body,
                  },
                  data: {
                    taskId,
                  },
                },
              },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
                },
              },
            );
          });
        } else {
          console.log('getDoc user detail error');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
}
