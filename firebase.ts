import {getMessaging, onMessage} from '@react-native-firebase/messaging';

const messaging = getMessaging();

export {messaging, onMessage};
