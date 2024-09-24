import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import graphqlClient from '../graphqlClient';
import React, { useState } from 'react';
import NewSetInput from '../components/NewSetInput';

// Define the shape of the exercise data returned by the API
interface ExerciseItem {
    name: string;
    muscle: string;
    equipment: string;
    instructions: string;
}

interface ExerciseData {
    exercises: ExerciseItem[];
}

const exerciseQuery = gql`
    query exercises($name: String) {
        exercises(name: $name) {
            name
            muscle
            equipment
            instructions
        }
    }
`;

export default function ExerciseDetailsScreen() {
    const route = useRoute<RouteProp<{ ExerciseDetails: { name: string } }, 'ExerciseDetails'>>();
    const { name } = route.params;

    // Ensure hooks are called unconditionally
    const { data, isLoading, error } = useQuery<ExerciseData>({
        queryKey: ['exercises', name],
        queryFn: () => graphqlClient.request<ExerciseData>(exerciseQuery, { name }),
        staleTime: 1000 * 60,
    });

    // State for expanding instructions
    const [isInstructionExpanded, setIsInstructionExpanded] = useState(false);
    
    // Handle loading state
    if (isLoading) {
        return <ActivityIndicator />;
    }

    // Handle error state
    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    // Check if exercises data exists
    const exercises = data?.exercises || [];
    if (exercises.length === 0) {
        return <Text>Exercise not found or no data available.</Text>;
    }

    // Destructure the exercise data
    const exercise = exercises[0];

    const toggleInstructionExpanded = () => {
        setIsInstructionExpanded((prev) => !prev);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{exercise.name.toUpperCase()}</Text>
                    <Text style={styles.subtitle}>{exercise.muscle.toUpperCase()} | {exercise.equipment.toUpperCase()}</Text>
                </View>
            </View>
            <View style={styles.separator}></View>
            <ScrollView>
                <Text style={styles.instructions} numberOfLines={isInstructionExpanded ? 0 : 3}>{exercise.instructions}</Text>
                <Pressable onPress={toggleInstructionExpanded}>
                    <Text style={styles.seeMore}>{isInstructionExpanded ? "Show less" : "Show more"}</Text>
                </Pressable>
            </ScrollView>

            <NewSetInput />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
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
        fontWeight: '500',
        fontSize: 16,
        color: 'rgb(10, 132, 255)',
    },
});
