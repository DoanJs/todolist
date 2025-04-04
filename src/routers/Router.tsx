import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {onAuthStateChanged} from 'firebase/auth';
import React, {useEffect, useState} from 'react';
import {auth} from '../../firebaseConfig';
import LoginScreen from '../screens/auth/LoginScreen';
import SigninScreen from '../screens/auth/SigninScreen';
import HomeScreen from '../screens/homes/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import AddNewTask from '../screens/tasks/AddNewTask';

const Router = () => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    // auth.onAuthStateChanged(user => {
    //   if (user) {
    //     setIsLogin(true);
    //   } else {
    //     setIsLogin(false);
    //   }
    // });

    onAuthStateChanged(auth, user => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);
  const Stack = createNativeStackNavigator();

  const MainRouter = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddNewTask" component={AddNewTask} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
  const AuthRouter = (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SigninScreen" component={SigninScreen} />
    </Stack.Navigator>
  );
  return isLogin ? MainRouter : AuthRouter;
};

export default Router;
