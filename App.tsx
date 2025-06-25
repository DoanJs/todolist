import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Alert, SafeAreaView, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {messaging, onMessage} from './firebase';
import linking from './linking';
import {colors} from './src/contants/colors';
import Router from './src/routers/Router';

const App = () => {
  useEffect(() => {
    //Ứng dụng đang mở
    const unsubscribe = onMessage(messaging, async remoteMessage => {
      Alert.alert(
        'New Notification',
        JSON.stringify(remoteMessage.notification),
      );
      console.log(remoteMessage);
      // Linking.openURL(`todolist://app/task-detail/${remoteMessage.data?.taskId}`);
    });

    return unsubscribe;
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.bgColor}}>
        <StatusBar
          translucent
          barStyle={'light-content'}
          backgroundColor={colors.bgColor}
        />
        <NavigationContainer linking={linking}>
          <Router />
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
