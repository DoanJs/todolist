/**
 * @format
 */

import {Alert, AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {messaging, setBackgroundMessageHandler} from './firebase';
import {onNotificationOpenedApp} from '@react-native-firebase/messaging';

setBackgroundMessageHandler(messaging, mess => {
  console.log('notification in background:', mess);
  Alert.alert('background')
});

onNotificationOpenedApp(messaging, mess => {
  console.log('notification by onOpenApp:', mess);
  Alert.alert('onOpenApp')
});

AppRegistry.registerComponent(appName, () => App);
