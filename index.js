/**
 * @format
 */

import {onNotificationOpenedApp} from '@react-native-firebase/messaging';
import {Alert, AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {messaging, setBackgroundMessageHandler} from './firebase';

// Khi ứng dụng chạy nền bên dưới || Register background handler
setBackgroundMessageHandler(messaging, async remoteMessage => {
  Alert.alert('setBackgroundMessageHandler');
  console.log('notification in background:', remoteMessage);
  // Linking.openURL(`todolist://app/task-detail/${mess.data?.taskId}`);
});

// Khi ứng dụng tắt hẳn
onNotificationOpenedApp(messaging, mess => {
  const data = mess.data;
  const taskId = data.taskId;
  console.log('OpenedApp notification', mess);

  // Linking.openURL(`todolist://app/task-detail/${taskId}`);
});

AppRegistry.registerComponent(appName, () => App);
