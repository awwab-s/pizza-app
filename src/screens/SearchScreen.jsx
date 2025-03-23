import React, { useContext, useState } from "react";
import Icon from "react-native-vector-icons/Feather"
import { View, Text, StyleSheet, SafeAreaView, TextInput, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { PizzaContext, getGoogleDriveImage } from "../context/PizzaContext";
import { useNavigation } from "@react-navigation/native";
import {PizzaItem} from "./HomeScreen"

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
        <FlatList
          data={filteredPizzas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('PizzaOrder', { pizza: item })}>
              <PizzaItem imgURL={ getGoogleDriveImage(item.imageURL) } name= {item.name} price={item.basePrice} discountText="25% Off" />
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No pizzas found</Text>}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

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
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});

export default SearchScreen

