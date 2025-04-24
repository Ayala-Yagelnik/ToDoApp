import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function TaskItem({ task, onLongPress, onPress }) {
    return (
        <Pressable
            style={[styles.item, task.done && styles.doneItem]}
            onLongPress={onLongPress}
            onPress={onPress}
        >
            <Text style={[styles.text, task.done && styles.doneText]}>
                {task.text?task.text: "unnamed task"}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 15,
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        marginBottom: 10
    },
    doneItem: {
        backgroundColor: '#d3ffd3',
    },
    text: {
        fontSize: 16,
        color: '#333'
    },
    doneText: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
});
