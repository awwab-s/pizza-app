import { View, Text, StyleSheet, SafeAreaView, TextInput } from "react-native"
import Icon from "react-native-vector-icons/Feather"

const SearchScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#868686" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your favourite pizza"
            placeholderTextColor="#868686"
          />
          <Icon name="sliders" size={20} color="#0f0e0d" />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Try searching for pizzas, toppings, or categories</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f0e0d",
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#868686",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  subtitle: {
    fontSize: 16,
    color: "#868686",
    textAlign: "center",
  },
})

export default SearchScreen
