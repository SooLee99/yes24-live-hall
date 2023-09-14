import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Login,
  SignUpVerify,
  SignUp,
  ResetPwVerify,
  ResetPw,
} from '../screens/account';

import { MaterialIcons } from '@expo/vector-icons';
import Main from './Main';
import { BackHandler, ToastAndroid } from 'react-native';

const Stack = createStackNavigator();

const Auth = () => {
  const theme = useContext(ThemeContext);
  const [isBackButtonPressed, setIsBackButtonPressed] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (isBackButtonPressed) {
        BackHandler.exitApp();
      } else {
        ToastAndroid.show(
          '앱을 종료하려면 한 번 더 뒤로 가기 버튼을 누르세요.',
          ToastAndroid.SHORT
        );
        setIsBackButtonPressed(true);
        setTimeout(() => {
          setIsBackButtonPressed(false);
        }, 2000);
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [isBackButtonPressed]);

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: theme.backgroundColor },
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpVerify"
        component={SignUpVerify}
        options={({}) => ({
          headerTitle: '회원가입',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTintColor: theme.text,
          headerLeft: ({ onPress, tintColor }) => (
            <MaterialIcons
              name="keyboard-arrow-left"
              size={38}
              color={tintColor}
              onPress={onPress}
            />
          ),
        })}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={({}) => ({
          headerTitle: '회원가입',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTintColor: theme.text,
          headerLeft: ({ onPress, tintColor }) => (
            <MaterialIcons
              name="keyboard-arrow-left"
              size={38}
              color={tintColor}
              onPress={onPress}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ResetPwVerify"
        component={ResetPwVerify}
        options={({}) => ({
          headerTitle: '비밀번호 재설정',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTintColor: theme.text,
          headerLeft: ({ onPress, tintColor }) => (
            <MaterialIcons
              name="keyboard-arrow-left"
              size={38}
              color={tintColor}
              onPress={onPress}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ResetPw"
        component={ResetPw}
        options={({}) => ({
          headerTitle: '비밀번호 재설정',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTintColor: theme.text,
          headerLeft: ({ onPress, tintColor }) => (
            <MaterialIcons
              name="keyboard-arrow-left"
              size={38}
              color={tintColor}
              onPress={onPress}
            />
          ),
        })}
      />

      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Auth;
