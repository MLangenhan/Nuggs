import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';

type ExerciseDetailsRouteParams = {
    exercise: ExerciseItem;
};

interface ExerciseItem {
    name: string;
    type: string;
    muscle: string;
    equipment: string;
    difficulty: string;
    instructions: string;
}

export default function ExerciseDetailsScreen() {
    const route = useRoute<RouteProp<{ params: ExerciseDetailsRouteParams }, 'params'>>();
    const exercise = route.params?.exercise; // Now TypeScript knows exercise is of type ExerciseItem

    const [isInstructionExpanded, setIsInstructionExpanded] = useState(false);

    const toggleInstructionExpanded = () => {
        setIsInstructionExpanded(!isInstructionExpanded);
    }

    if (!exercise) {
        return (
            <Text>
                Exercise not found.
            </Text>
        )
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{exercise.name}</Text>
                    <Text style={styles.subtitle}>{exercise.muscle.toUpperCase()} | {exercise.equipment.toUpperCase()} </Text>
                </View>
            </View>
            <View style={styles.separator}></View>
            <ScrollView>
                <Text style={styles.instructions} numberOfLines={isInstructionExpanded ? 0 : 3}>{exercise.instructions}</Text>
                <Pressable onPress={toggleInstructionExpanded}>
                    <Text style={styles.seeMore}>{isInstructionExpanded ? "Show less" : "Show more"}</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

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
        marginTop: 10,
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
    FlatList: {
        gap: 5,
    },
    exerciseContainer: {
        backgroundColor: 'ghostwhite',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        gap: 5,

        textShadowColor: '#000',
        textShadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    exerciseName: {
        fontSize: 20,
        fontWeight: '500',
    },
    exerciseSubtitle: {
        color: 'dimgray',
    },
    instructions: {
        marginTop: 20,
        fontSize: 18,
        color: '#888',
        lineHeight: 24,
        marginHorizontal: 20,
    },
    seeMore: {
        alignSelf: 'flex-end',
        paddingVertical: 10,
        paddingHorizontal: 30,
        fontWeight: 500,
        fontSize: 16,
        color: 'rgb(10, 132, 255)',
    }
});
