import React, { useEffect, useState ,useContext} from 'react';
import {
  SafeAreaView, View, Text, StyleSheet, Switch,
  Button, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { ThemeContext } from '../utils/ThemeContext';

const DARK_MODE_KEY = 'dark_mode';

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation();

  // טוען את מצב Dark Mode בשיגור
  useEffect(() => {
    const loadDarkMode = async () => {
      const storedValue = await AsyncStorage.getItem(DARK_MODE_KEY);
      if (storedValue !== null) {
        setIsDarkMode(storedValue === 'true');
      }
    };
    loadDarkMode();
  }, []);

  const toggleDarkMode = async () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    await AsyncStorage.setItem(DARK_MODE_KEY, String(newValue));
    Toast.show({
      type: 'info',
      text1: newValue ? 'Switched to Dark Mode' : 'Switched to Light Mode'
    });
  };

  const clearAllTasks = () => {
    Alert.alert("Delete All Tasks", "Are you sure you want to delete all tasks?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete", style: "destructive", onPress: async () => {
          await AsyncStorage.removeItem('tasks');
          Toast.show({ type: 'error', text1: 'All tasks deleted' });
          navigation.navigate('ToDo List', { refresh: true });
        }
      }
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.section}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>

      <View style={styles.section}>
        <Button title="Delete All Tasks" color="#e53935" onPress={clearAllTasks} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20, backgroundColor: '#fff'
  },
  darkContainer: {
    backgroundColor: '#121212'
  },
  section: {
    marginVertical: 20
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000'
  },
  darkText: {
    color: '#fff'
  }
});