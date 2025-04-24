import React, { useState } from 'react';
import {
  Modal, View, TextInput, Button, StyleSheet
} from 'react-native';

export default function AddTaskModal({ visible, onClose, onAdd }) {
  const [task, setTask] = useState('');

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
        <View style={styles.modal}>
          <TextInput
            placeholder="Enter task"
            value={task}
            onChangeText={setTask}
            style={styles.input}
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
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modal: {
    backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%'
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5
  }
});
