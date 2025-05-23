import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '@myapp/screens/dashboard';
import { RootStackParamList } from './types';
import Scanner from '@myapp/screens/scanner';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootRoutes() {
  return (
    <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Scanner" component={Scanner} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})