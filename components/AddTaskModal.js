import React, { useState, useContext } from 'react';
import { Modal, View, TextInput, Button, StyleSheet } from 'react-native'; // הוסף את StyleSheet
import { ThemeContext } from '../utils/ThemeContext';


export default function AddTaskModal({ visible, onClose, onAdd }) {
    const [task, setTask] = useState('');
    const { isDarkMode } = useContext(ThemeContext);

    const handleAdd = () => {
        if (task.trim() !== '') {
            onAdd(task);
            setTask('');
            onClose();
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View
                    style={[
                        styles.modal,
                        isDarkMode && styles.darkModal,
                    ]}
                >
                    <TextInput
                        placeholder="Enter task"
                        placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
                        value={task}
                        onChangeText={setTask}
                        style={[
                            styles.input,
                            isDarkMode && styles.darkInput,
                        ]}
                    />
                    <Button title="Add Task" onPress={handleAdd} />
                    <Button title="Cancel" onPress={onClose} color="grey" />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    darkModal: {
        backgroundColor: '#121212',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        color: '#000',
    },
    darkInput: {
        borderColor: '#555',
        color: '#fff',
    },
});