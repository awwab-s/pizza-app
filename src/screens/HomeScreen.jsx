import React, { useState, useEffect, useContext } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Dimensions, ActivityIndicator } from "react-native"

import { PizzaContext } from "../context/PizzaContext";

import LocationHeader from "../components/LocationHeader"
import Search from "../components/Search"
import Category from "../components/Category"
import SpecialOffer from "../components/SpecialOffer";
import PizzaList from "../components/PizzaList";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const { width, height } = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const [isGuest, setIsGuest] = useState(false);
  const [loadingPizzas, setLoadingPizzas] = useState(true);
  const { pizzas, fetchPizzas } = useContext(PizzaContext);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPizzas, setFilteredPizzas] = useState(pizzas);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsGuest(!user); // User is not logged in
    });
  
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingPizzas(true);
      await fetchPizzas();
      setLoadingPizzas(false);
    };
    
    fetchData();
  }, []);
  
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPizzas(pizzas);
    } else if (selectedCategory === 'Vegetarian') {
      setFilteredPizzas(pizzas.filter(pizza => pizza.category.includes('Vegetable')));
    } else if (selectedCategory === 'Specials') {
      setFilteredPizzas(pizzas.filter(pizza => pizza.category.includes('Special')));
    } else {
      setFilteredPizzas(pizzas.filter(pizza => pizza.category.includes(selectedCategory)));
    }
  }, [selectedCategory, pizzas]);  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LocationHeader isGuest={isGuest} />

        {/* Search Bar */}
        <Search />

        {/* Special Offer */}
        <SpecialOffer />

        {/* Pizza Menu */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Choose Your Pizza</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

        {/* Pizza Items */}
        <View style={styles.pizzaItemsContainer}>
          {loadingPizzas ? (
            <ActivityIndicator size="large" color="#B55638" />
          ) : (
            <PizzaList pizzas={filteredPizzas} onPress={(item) => navigation.navigate("PizzaOrder", { pizza: item })} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.024,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.024,
    marginTop: height * 0.032,
  },
  sectionTitle: {
    fontSize: height * 0.024,
    fontWeight: "bold",
    color: "#0f0e0d",
  },
  seeAllText: {
    fontSize: height * 0.016,
    fontWeight: "500",
    color: "#B55638",
  },
  pizzaItemsContainer: {
    paddingHorizontal: width * 0.024,
    marginTop: height * 0.024,
  },
})

export default HomeScreen
