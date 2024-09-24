import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'

const NewSetInput = () => {

    const [reps, setReps] = useState('');
    const [weigth, setWeigth] = useState('');

    const addSet = () => {
        console.warn('add Set', reps, weigth);



        setReps('');
        setWeigth('');
    }

    return (
        <View style={styles.container}>
            <TextInput
                value={reps}
                onChangeText={setReps}
                placeholder='Reps'
                placeholderTextColor={'gray'}
                style={styles.input}
                keyboardType='numeric'
            />
            <TextInput
                value={weigth}
                onChangeText={setWeigth}
                placeholder='Weight'
                placeholderTextColor={'gray'}
                style={styles.input}
                keyboardType='numeric'
            />
            <Button title="Add" onPress={addSet} />
        </View>
    )
}

export default NewSetInput

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        gap: 10,
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        padding: 10,
        flex: 1,
        borderRadius: 5,
    }
})