import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadTasks = async () => {
  try {
    const data = await AsyncStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (e) {
    console.error(e);
  }
};
