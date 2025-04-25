import {
  getInitialNotification,
  getMessaging,
  onMessage,
  onNotificationOpenedApp,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';

const messaging = getMessaging();

export {
  getInitialNotification,
  messaging,
  onMessage,
  onNotificationOpenedApp,
  setBackgroundMessageHandler,
};
