import { SafeAreaView, Text, View, StyleSheet, Button, FlatList, Modal, Pressable, TextInput, StatusBar, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { ProgressChart } from "react-native-chart-kit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FoodListItem from "../components/FoodListItem";
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

interface FoodItem {
    label: string;
    cal: number;
    brand: string;
    date: string;
}

export default function Dashboard() {

    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    const [search, setSearch] = useState('');
    const [filteredFoodItems, setFilteredFoodItems] = useState<FoodItem[]>([]);
    const [searchModalVisible, setSearchModalVisible] = useState(false);
    const [newFoodLabel, setNewFoodLabel] = useState('');
    const [newFoodCalories, setNewFoodCalories] = useState('');
    const [newFoodBrand, setNewFoodBrand] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [dailyCalories, setDailyCalories] = useState(0);
    const [dailyFood, setDailyFood] = useState<FoodItem[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [calorieVariable, setCalorieVariable] = useState(2414);

    const screenWidth = Dimensions.get("window").width;

    const ringData = {
        labels: [''],
        data: [dailyCalories / calorieVariable]
    };

    const chartData = {
        labels: ["Monday", "Tuesday", "Wednesday"],
        datasets: [
            {
                data: [90, 88, 92],
                color: (opacity = 0.87) => `rgba(0,0,0, ${opacity})`,
                strokeWidth: 2
            }
        ],
        legend: []
    };

    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(8, 147, 5, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
    };

    const getCurrentDay = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[new Date().getDay()];
    };

    const saveFoodItems = async (items: FoodItem[]) => {
        try {
            await AsyncStorage.setItem('foodItems', JSON.stringify(items));
        } catch (error) {
            console.error("Failed to save food items to storage", error);
        }
    };

    const loadFoodItems = async () => {
        try {
            const savedFoodItems = await AsyncStorage.getItem('foodItems');
            if (savedFoodItems !== null) {
                const parsedItems: FoodItem[] = JSON.parse(savedFoodItems);
                setFoodItems(parsedItems);
            }
        } catch (error) {
            console.error("Failed to load food items from storage", error);
        }
    };

    const addFoodItem = (foodItem: FoodItem) => {
        setDailyFood([...dailyFood, foodItem]);
        setDailyCalories(dailyCalories + foodItem.cal);
    }

    useEffect(() => {
        loadFoodItems();
    }, []);

    useEffect(() => {
        saveFoodItems(foodItems);
    }, [foodItems]);

    // Filter the food items based on the search input
    useEffect(() => {
        if (search === '') {
            setFilteredFoodItems(foodItems);
        } else {
            const filtered = foodItems.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()));
            setFilteredFoodItems(filtered);
        }
    }, [search, foodItems]);

    const loadDailyData = async () => {
        try {
            const savedDay = await AsyncStorage.getItem("currentDay");
            const currentDay = getCurrentDay();

            if (savedDay === null || savedDay !== currentDay) {
                // New day: reset daily data
                setDailyFood([]);
                setDailyCalories(0);
                await AsyncStorage.setItem("currentDay", currentDay);
            } else {
                // Load saved daily data
                const savedDailyFood = await AsyncStorage.getItem("dailyFood");
                const savedDailyCalories = await AsyncStorage.getItem("dailyCalories");

                if (savedDailyFood !== null) setDailyFood(JSON.parse(savedDailyFood));
                if (savedDailyCalories !== null) setDailyCalories(parseInt(savedDailyCalories));
            }
        } catch (error) {
            console.error("Error loading daily data:", error);
        } finally {
            setIsDataLoaded(true); // Mark data as loaded
        }
    };

    // Save data to AsyncStorage whenever dailyFood or dailyCalories change
    useEffect(() => {
        const saveDailyData = async () => {
            try {
                await AsyncStorage.setItem("dailyFood", JSON.stringify(dailyFood));
                await AsyncStorage.setItem("dailyCalories", dailyCalories.toString());
            } catch (error) {
                console.error("Error saving daily data:", error);
            }
        };

        if (isDataLoaded) {
            saveDailyData();
        }
    }, [dailyFood, dailyCalories, isDataLoaded]);

    // Load data when component mounts
    useEffect(() => {
        loadDailyData();
    }, []);

    // Only render UI once the data is fully loaded
    if (!isDataLoaded) {
        return <Text>Loading...</Text>;
    }

    const addNewFoodItem = () => {
        const newFoodItem: FoodItem = {
            label: newFoodLabel,
            cal: parseInt(newFoodCalories),
            brand: newFoodBrand,
            date: getCurrentDay(),
        };
        setFoodItems([...foodItems, newFoodItem]);

        setDailyFood([...dailyFood, newFoodItem]);
        console.log(dailyFood);
        console.log(dailyCalories);

        setNewFoodLabel('');
        setNewFoodCalories('');
        setNewFoodBrand('');

        setModalVisible(false);
    };

    const changeCalorieVariable = (newNumber: number) => {
        setCalorieVariable(newNumber);
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Welcome.</Text>
                    <Text style={styles.subtitle}>Continue your journey.</Text>
                </View>
                <Pressable onPress={() => setModalVisible(true)}>
                    <View style={styles.plusButton}>
                        <AntDesign name="plus" size={24} color="black" />
                    </View>
                </Pressable>
            </View>
            <View style={styles.separator2} />
            <View style={styles.searchSection}>
                <Pressable onPress={() => setSearchModalVisible(true)}>
                    <View style={styles.searchBar}>
                        <Text style={{ color: 'gray' }}>{search === '' ? 'Search...' : search}</Text>
                    </View>
                </Pressable>
            </View>
            <View style={styles.latestFeastsSection}>
                <Text style={styles.latestFeastsText}>Latest feasts:</Text>
            </View>
            <FlatList
                data={foodItems}
                renderItem={({ item }) => <FoodListItem item={item} onAddToDailyFood={() => addFoodItem(item)} />}
                contentContainerStyle={styles.listContainer}
            />
            <View style={styles.separator} />
            <View style={styles.chartLabels}>
                <Text style={styles.chartLabel}>Daily calories:</Text>
                <Text style={{ fontSize: 32, fontWeight: 200 }}> {dailyCalories} / {calorieVariable}</Text>
                {/* <Text style={styles.chartLabel}>Last three days</Text> */}
            </View>
            <View style={styles.chartsContainer}>
                <ProgressChart
                    data={ringData}
                    width={screenWidth}
                    height={200}
                    strokeWidth={20}
                    radius={60}
                    chartConfig={chartConfig}
                    hideLegend={false}
                />
                {/*<LineChart
          withInnerLines={false}
          withOuterLines={false}
          data={chartData}
          width={screenWidth * 3 / 5}
          height={330}
          chartConfig={chartConfig}
          verticalLabelRotation={40}
          bezier
        /> */}
            </View>

            {/* Search Modal */}
            <Modal
                animationType='fade'
                transparent={false}
                visible={searchModalVisible}
                onRequestClose={() => setSearchModalVisible(false)}
            >
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.modalHeader}>
                        <Pressable onPress={() => setSearchModalVisible(false)}>
                            <AntDesign name="close" size={24} color="black" />
                        </Pressable>
                        <TextInput
                            value={search}
                            onChangeText={setSearch}
                            placeholder="Search..."
                            placeholderTextColor={'gray'}
                            style={styles.modalSearchBar}
                        />
                    </View>
                    <ScrollView style={styles.modalSuggestionsList}>
                        {filteredFoodItems.length > 0 ? (
                            filteredFoodItems.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.modalSuggestionItem}
                                    onPress={() => {
                                        setSearch(item.label);
                                        setSearchModalVisible(false);
                                    }}
                                >
                                    <FoodListItem item={item} onAddToDailyFood={() => addFoodItem(item)} />
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={styles.noResultsText}>No results found.</Text>
                        )}
                    </ScrollView>
                </SafeAreaView>
            </Modal>

            {/* Add New Food Item Modal */}
            <Modal
                animationType='fade'
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add New Food Item</Text>
                        <View style={{
                            marginBottom: 15,
                            borderBottomColor: 'black',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }} />
                        <TextInput
                            value={newFoodLabel}
                            onChangeText={setNewFoodLabel}
                            placeholder="Label"
                            placeholderTextColor={'gray'}
                            style={styles.input}
                        />
                        <TextInput
                            value={newFoodCalories}
                            onChangeText={setNewFoodCalories}
                            placeholder="Calories"
                            placeholderTextColor={'gray'}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <TextInput
                            value={newFoodBrand}
                            onChangeText={setNewFoodBrand}
                            placeholder="Brand"
                            placeholderTextColor={'gray'}
                            style={styles.input}
                        />
                        <View style={styles.modalButtons}>
                            <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
                            <Button title="Add" onPress={addNewFoodItem} />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    title: {
        marginTop: 10,
        fontSize: 34,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        color: '#888',
        marginBottom: 20,
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F2F2F2',
        borderRadius: 20,
        paddingLeft: 20,
        marginTop: 5,
        padding: 10,
        marginLeft: 15,
        marginRight: 20,
        marginBottom: 25,
    },
    modalSearchBar: {
        flex: 1,
        backgroundColor: "#f0f8ff",
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 15,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 10,
    },
    modalSuggestionsList: {
        paddingHorizontal: 15,
        marginTop: 10,
    },
    modalSuggestionItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    noResultsText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
    plusButton: {
        marginTop: 15,
        marginRight: 20,
    },
    separator: {
        marginTop: 15,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    separator2: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    searchSection: {
        justifyContent: 'space-between',
        marginTop: 15,
    },
    addMealText: {
        marginTop: 20,
        paddingLeft: 20,
        fontSize: 16,
    },
    latestFeastsSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    latestFeastsText: {
        fontWeight: '200',
        fontStyle: 'italic',
        marginLeft: 20,
        marginBottom: 10,
    },
    fullHistoryButton: {
        marginRight: 15,
    },
    listContainer: {
        gap: 10,
        marginBottom: 10,
        flexDirection: 'column-reverse',
    },
    chartLabels: {
        flexDirection: 'row',
        marginRight: 25,
        marginLeft: 25,
        marginTop: 20,
        justifyContent: 'space-between'
    },
    chartLabel: {
        marginLeft: 0,
        fontWeight: '200',
    },
    chartsContainer: {
        flexDirection: 'row',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: "#f0f8ff",
        borderRadius: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});
