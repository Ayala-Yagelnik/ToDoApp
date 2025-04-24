import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import { ThemeProvider } from './utils/ThemeContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ToDo List">
        <Stack.Screen name="ToDo List" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
    </ThemeProvider>
  );
}
