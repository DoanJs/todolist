import {
  getMessaging,
  onMessage,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';

const messaging = getMessaging();

export {messaging, onMessage, setBackgroundMessageHandler};
