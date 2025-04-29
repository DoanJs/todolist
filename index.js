/**
 * @format
 */

import {onNotificationOpenedApp} from '@react-native-firebase/messaging';
import {Alert, AppRegistry, Linking} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {messaging, onMessage, setBackgroundMessageHandler} from './firebase';

onMessage(messaging, async remoteMessage => {
  Alert.alert(
    'Foreground notification',
    JSON.stringify(remoteMessage.notification),
  );
  console.log('Foreground notification', remoteMessage);
  Linking.openURL(`todolist://app/task-detail/${remoteMessage.data?.taskId}`);
});

setBackgroundMessageHandler(messaging, mess => {
  Alert.alert('background');
  console.log('notification in background:', mess);
  Linking.openURL(`todolist://app/task-detail/${mess.data?.taskId}`);
});

onNotificationOpenedApp(messaging, mess => {
  const data = mess.data;
  const taskId = data.taskId;
  console.log('OpenedApp notification', mess);

  Linking.openURL(`todolist://app/task-detail/${taskId}`);
});

AppRegistry.registerComponent(appName, () => App);
