import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tracker from './Tracker';
import Dashboard from './Dashboard';
import Settings from './Settings';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons from react-native-vector-icons
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
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
                    height: 80, // Customize the height of the tab bar
                    paddingBottom: 30, // Optional: adjust padding
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
