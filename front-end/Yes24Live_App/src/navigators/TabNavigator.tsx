import React from 'react';
import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from '../screens/search/SearchScreen';
import ScheduleScreen from '../screens/schedule/ScheduleScreen';
import TicketScreen from '../screens/ticket/TicketScreen';
import UserAccountScreen from '../screens/user-info/UserAccountScreen';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}>
      <Tab.Screen
        name="홈"
        component={HomeScreen}
        options={{
          tabBarShowLabel: true,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View>
                <Ionicons name="home-outline" size={FONTSIZE.size_24} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="공연 일정"
        component={ScheduleScreen}
        options={{
          tabBarShowLabel: true,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View>
                <Ionicons name="calendar" size={FONTSIZE.size_24} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="티켓 현황"
        component={TicketScreen}
        options={{
          tabBarShowLabel: true,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View>
                <Ionicons name="qr-code-outline" size={FONTSIZE.size_24} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="내 정보"
        component={UserAccountScreen}
        options={{
          tabBarShowLabel: true,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View>
                <Ionicons
                  name="person-outline"
                  //color={COLORS.Black}
                  size={FONTSIZE.size_24}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeTabBackground: {
    backgroundColor: COLORS.Black,
    padding: SPACING.space_18,
    borderRadius: SPACING.space_18 * 10,
  },
});

export default TabNavigator;
