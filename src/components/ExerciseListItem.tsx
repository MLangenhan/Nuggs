import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

interface ExerciseItem {
    name: string;
    type: string;
    muscle: string;
    equipment: string;
    difficulty: string;
    instructions: string;
}

interface ExerciseListItemProps {
    item: ExerciseItem;
    onPress: () => void; // Add onPress prop
}

const ExerciseListItem = ({ item, onPress }: ExerciseListItemProps) => {
    return (
        <Pressable style={styles.exerciseContainer} onPress={onPress}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseSubtitle}>
                {item.muscle.toUpperCase()} | {item.equipment.toUpperCase()}
            </Text>
        </Pressable>
    );
};

export default ExerciseListItem;

const styles = StyleSheet.create({
    exerciseContainer: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        gap: 5,
    },
    exerciseName: {
        fontSize: 20,
        fontWeight: '500',
    },
    exerciseSubtitle: {
        color: 'dimgray',
    },
});
