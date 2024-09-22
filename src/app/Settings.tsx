import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Settings() {
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView style={styles.safeArea}>
            <Text style={styles.title}>Settings</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        padding: 10,
        gap: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 48,
        padding: 10,
    },
});