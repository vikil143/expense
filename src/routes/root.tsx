import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '@myapp/screens/dashboard/dashboard';
import { RootStackParamList } from './types';
import Scanner from '@myapp/screens/scanner';
import AmountScreen from '@myapp/screens/amount';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootRoutes() {
  return (
    <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="Amount" component={AmountScreen} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})