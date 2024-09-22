import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tracker from './Tracker';
import Dashboard from './Dashboard';
import Settings from './Settings';
import ExerciseDetailsScreen from './[name]'; // Import the details screen
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList, TabParamList } from './Tracker'; // Adjust the import path
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const client = new QueryClient();

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Tab Navigator
function TabNavigator() {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string = '';

                    if (route.name === 'Dashboard') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Tracker') {
                        iconName = focused ? 'time' : 'time-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarStyle: {
                    height: 50, // Customize the height of the tab bar
                    paddingBottom: 5, // Optional: adjust padding
                },
                tabBarLabelStyle: {
                    fontSize: 12, // Adjust font size of labels (optional)
                },
            })}
        >
            <Tab.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
            <Tab.Screen name="Tracker" component={Tracker} options={{ headerShown: false }} />
            <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

// Stack Navigator
export default function MyTabs() {
    return (
        <QueryClientProvider client={client}>
            <Stack.Navigator>
                {/* Tabs as the main screen */}
                <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />

                {/* ExerciseDetailsScreen as a detailed screen */}
                <Stack.Screen name="ExerciseDetails" component={ExerciseDetailsScreen} options={{ gestureEnabled: true, headerShown: false }} />
            </Stack.Navigator>
        </QueryClientProvider >
    );
}
