import Icon from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { View, StyleSheet, TextInput, TouchableOpacity, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"

const { width, height } = Dimensions.get('window');

const Search = () => {
    const navigation = useNavigation()
    
    return (
        <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.searchBar} onPress={() => navigation.navigate('Search')}>
                <Icon name="search" size={height * 0.025} color="#868686" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search your favourite pizza"
                    placeholderTextColor="#868686"
                    editable={false}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
    paddingHorizontal: width * 0.024,
    marginTop: height * 0.024,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 35,
    paddingHorizontal: width * 0.020,
    paddingVertical: height * 0.01,
  },
  searchIcon: {
    marginLeft: width * 0.03,
  },
  searchInput: {
    flex: 1,
    fontSize: width * 0.04,
    marginLeft: width * 0.01,
  },
})

export default Search