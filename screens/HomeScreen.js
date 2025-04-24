import React, { useState, useEffect, useContext } from 'react';
import {
    SafeAreaView, View, Text, StyleSheet, FlatList,
    TouchableOpacity, Alert, ImageBackground
} from 'react-native';
import AddTaskModal from '../components/AddTaskModal';
import TaskItem from '../components/TaskItem';
import { loadTasks, saveTasks } from '../utils/storage';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../utils/ThemeContext';

export default function HomeScreen({ navigation }) {
    const [tasks, setTasks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: isDarkMode ? '#121212' : '#f8f9fa', // צבע רקע הכותרת
            },
            headerTitleStyle: {
                color: isDarkMode ? '#fff' : '#000', // צבע הטקסט של הכותרת
            },
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <Ionicons
                        name="settings-outline"
                        size={24}
                        color={isDarkMode ? '#fff' : '#000'} // צבע האייקון
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation, isDarkMode]);

    useEffect(() => {
        loadTasks().then(setTasks);
    }, []);

    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    const handleAddTask = (taskText) => {
        if (!taskText.trim()) {
            Toast.show({ type: 'error', text1: 'Task cannot be empty!' });
            return;
        }
        setTasks([...tasks, { text: taskText, done: false }]);
        Toast.show({ type: 'success', text1: 'Task added!' });
    };

    const handleDelete = (index) => {
        Alert.alert("Delete Task", "Are you sure?", [
            { text: "Cancel" },
            {
                text: "Delete", onPress: () => {
                    const newTasks = [...tasks];
                    newTasks.splice(index, 1);
                    setTasks(newTasks);
                    Toast.show({ type: 'info', text1: 'Task deleted' });
                }
            }
        ]);
    };

    const toggleTaskDone = (index) => {
        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks];
            updatedTasks[index].done = !updatedTasks[index].done;
            return updatedTasks;
        });
    };

    return (
        <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
            <ImageBackground
                source={require('../assets/background.jpg')}
                style={styles.background}
            >
                <FlatList
                    ListHeaderComponent={
                        <Text style={styles.instructions}>
                            Tap to mark as done/undone. Long press to delete.
                        </Text>
                    }
                    data={tasks}
                    renderItem={({ item, index }) =>
                        <TaskItem
                            task={item}
                            onLongPress={() => handleDelete(index)}
                            onPress={() => toggleTaskDone(index)}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
                <AddTaskModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onAdd={handleAddTask}
                />
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    darkContainer: { backgroundColor: '#121212' },
    instructions: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
        textAlign: 'center',
    },
    background: { flex: 1, padding: 20 },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#00bfca',
        borderRadius: 50,
        padding: 20,
        elevation: 5,
        color: 'black',
    },
    addButtonText: { fontSize: 24, color: 'white' },
});
