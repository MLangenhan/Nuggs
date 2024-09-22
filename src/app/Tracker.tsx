import { SafeAreaView, Text, View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import exercises from '../../assets/data/exercises.json';
import ExerciseListItem from "../components/ExerciseListItem";
import { useNavigation, NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useQuery } from '@tanstack/react-query'

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  ExerciseDetails: { exercise: ExerciseItem };
};

// Define TabParamList if you have additional parameters for the Tab Navigator
export type TabParamList = {
  Dashboard: undefined;
  Tracker: undefined;
  Settings: undefined;
};

type TrackerNavigationProp = StackNavigationProp<RootStackParamList, 'Tabs'>;

interface ExerciseItem {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
}

export default function Tracker() {
  const navigation = useNavigation<TrackerNavigationProp>();

  const { data, isLoading } = useQuery({
    queryKey: ['exercises'],
    queryFn: async () => {
      return exercises;
    },
  })

  if (isLoading) {
    return <ActivityIndicator />
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Gym Tracker</Text>
          <Text style={styles.subtitle}>Know your strength.</Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.containerBig}>
        <FlatList
          data={data}
          contentContainerStyle={styles.FlatList}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item }) => (
            <ExerciseListItem
              item={item}
              onPress={() => navigation.navigate('ExerciseDetails', { exercise: item })}
            />
          )}
        />
      </View>
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
});
