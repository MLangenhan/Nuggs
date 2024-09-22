import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

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
}

const ExerciseListItem = ({ item }: ExerciseListItemProps) => {
    return (
        <Link href={`/${item.name}`} asChild>
            <Pressable style={styles.exerciseContainer}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <Text style={styles.exerciseSubtitle}>{item.muscle.toUpperCase()} | {item.equipment.toUpperCase()} </Text>
            </Pressable>
        </Link>
    );
}

export default ExerciseListItem

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 34,
    },
    subtitle: {
        fontSize: 18,
        color: '#888',
        marginBottom: 20,
    },
    separator: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    containerBig: {
        flex: 1,
        backgroundColor: 'ghostwhite',
        justifyContent: 'center',
        padding: 10,
    },
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
