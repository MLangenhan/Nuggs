import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

interface FoodItem {
    label: string;
    cal: number;
    brand: string;
    date: string;
}

const FoodListItem = ({ item, onAddToDailyFood }: { item: FoodItem, onAddToDailyFood: () => void }) => {
    return (
        <View style={styles.container}>
            <View style={styles.divider}>
                <Text style={styles.item}>{item.label}</Text>
                <Text style={styles.description}>{item.cal}kcal from {item.brand}</Text>
                <Text>on {item.date}</Text>
            </View>
            <Pressable onPress={onAddToDailyFood}>
                <AntDesign name="pluscircleo" size={24} color="royalblue" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 20,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    divider: {
        flex: 1,
        gap: 5,
        paddingLeft: 10
    },
    item: {
        fontWeight: 'bold',
        fontSize: 16
    },
    description: {
        color: 'dimgray'
    }
})

export default FoodListItem;
