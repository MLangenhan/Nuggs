import { SafeAreaView, Text, View, StyleSheet, FlatList } from "react-native";
import exercises from '../../assets/data/exercises.json'
import ExerciseListItem from "./ExerciseListItem";

export default function Tracker() {
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
          data={exercises}
          contentContainerStyle={styles.FlatList}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item }) => <ExerciseListItem item={item} />} />
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
});
