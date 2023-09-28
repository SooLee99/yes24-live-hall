import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import MovieDetailsScreen from '../screens/home/MovieDetailsScreen';
import SeatBookingScreen from '../screens/home/SeatBookingScreen';
import SearchScreen from '../screens/search/SearchScreen';
import { BackHandler, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';

const Stack = createNativeStackNavigator();

const Main = () => {
  const [isBackButtonPressed, setIsBackButtonPressed] =
    useState<boolean>(false);

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
        }, 2000); // 2초 동안 '뒤로가기' 상태를 유지
      }
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [isBackButtonPressed]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        options={{ animation: 'default' }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="SeatBooking"
        component={SeatBookingScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="검색 화면"
        component={SearchScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
    </Stack.Navigator>
  );
};

export default Main;
