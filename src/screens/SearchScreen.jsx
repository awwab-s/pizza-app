import React, { useContext, useState } from "react";
import Icon from "react-native-vector-icons/Feather"
import { View, Text, StyleSheet, SafeAreaView, TextInput, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { PizzaContext, getGoogleDriveImage } from "../context/PizzaContext";
import { useNavigation } from "@react-navigation/native";
import PizzaItem from "../components/PizzaItem";

const { width, height } = Dimensions.get('window');

const SearchScreen = () => {
  const navigation = useNavigation();
  const { pizzas } = useContext(PizzaContext);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter pizzas based on searchQuery
  const filteredPizzas =
    searchQuery.trim() === ""
      ? [] // Don't show any pizzas initially
      : pizzas.filter((pizza) =>
          pizza.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
      </View>

      <View style={styles.divider} />

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
        <Icon name="search" size={height * 0.025} color="#868686" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for pizzas..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        </View>
      </View>

      {/* Show results only if user has typed something */}
      {searchQuery.trim() !== "" && (
        <View style={styles.contentContainer}>
          <FlatList
            data={filteredPizzas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('PizzaOrder', { pizza: item })} >
                <PizzaItem imgURL={ getGoogleDriveImage(item.imageURL) } name= {item.name} price={item.basePrice} discountText="25% Off" rating={item.rating} />
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text style={styles.emptyText}>No pizzas found</Text>}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: width * 0.06,
    paddingTop: height * 0.03,
    marginBottom: height * 0.02,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#DDD",
    marginBottom: height * 0.02,
    width: "90%",
    alignSelf: "center",
  },
  searchContainer: {
    paddingHorizontal: width * 0.04,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 35,
    paddingHorizontal: width * 0.020,
    paddingVertical: height * 0.01,
    marginBottom: height * 0.02,
  },
  searchIcon: {
    marginLeft: width * 0.03,
  },
  searchInput: {
    flex: 1,
    fontSize: width * 0.04,
    marginLeft: width * 0.01,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: width * 0.04,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});

export default SearchScreen

