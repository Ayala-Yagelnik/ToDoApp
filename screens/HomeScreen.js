import React, { useState, useEffect } from 'react';
import {
    SafeAreaView, View, Text, StyleSheet, FlatList,
    TouchableOpacity, Alert, ImageBackground
} from 'react-native';
import AddTaskModal from '../components/AddTaskModal';
import TaskItem from '../components/TaskItem';
import { loadTasks, saveTasks } from '../utils/storage';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
    const [tasks, setTasks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <Ionicons name="settings-outline" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        loadTasks().then(setTasks);
    }, []);

    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    const handleAddTask = (task) => {
        setTasks([...tasks, task]);
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
        const newTasks = [...tasks];
        newTasks[index].done = !newTasks[index].done;
        setTasks(newTasks);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require('../assets/background.jpg')}
                style={styles.background}
            >
                <FlatList
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
    container: { flex: 1 },
    background: { flex: 1, padding: 20 },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#00bfca',
        borderRadius: 50,
        padding: 20,
        elevation: 5,
    },
    addButtonText: { fontSize: 24, color: 'white' },
});
