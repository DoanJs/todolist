// useNotificationHandler.js
import {useEffect} from 'react';
import {Alert} from 'react-native';
// import {navigate} from './navigationRef';
import {
  getInitialNotification,
  messaging,
  onMessage,
  onNotificationOpenedApp,
} from '../../firebase';

export function useNotificationHandler() {
  useEffect(() => {
    // 🔔 Foreground messages
    const unsubscribeOnMessage = onMessage(messaging, async remoteMessage => {
      console.log('Foreground notification:', remoteMessage);

      // Optional: Show alert or local notification
      const {title, body} = remoteMessage.notification || {};
      if (title || body) {
        Alert.alert(title ?? 'Notification', body ?? 'You have a new message.');
      }

      // Optional: Navigate from data
      //   if (remoteMessage.data?.screen) {
      //     navigate(remoteMessage.data.screen, remoteMessage.data);
      //   }
    });

    // 🔙 App opened from background
    const unsubscribeOnOpen = onNotificationOpenedApp(
      messaging,
      remoteMessage => {
        console.log('Notification tapped from background:', remoteMessage);
        // if (remoteMessage?.data?.screen) {
        //   navigate(remoteMessage.data.screen, remoteMessage.data);
        // }
      },
    );

    // 💀 App opened from killed state
    getInitialNotification(messaging).then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification tapped from killed state:', remoteMessage);
        // if (remoteMessage.data?.screen) {
        //   navigate(remoteMessage.data.screen, remoteMessage.data);
        // }
      }
    });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnOpen();
    };
  }, []);
}
