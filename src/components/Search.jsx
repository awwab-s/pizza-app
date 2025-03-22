import Icon from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native"

const Search = () => {
    return (
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
    )
}

const styles = StyleSheet.create({
    searchContainer: {
    paddingHorizontal: 24,
    marginTop: 24,
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
})

export default Search