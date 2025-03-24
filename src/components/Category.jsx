import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, Dimensions, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const Category = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <View style={{ paddingHorizontal: width * 0.024 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        <TouchableOpacity 
          style={selectedCategory === 'All' ? styles.categoryButtonActive : styles.categoryButton} 
          onPress={() => setSelectedCategory('All')}
        >
          <Text style={selectedCategory === 'All' ? styles.categoryButtonTextActive : styles.categoryButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={selectedCategory === 'Classic' ? styles.categoryButtonActive : styles.categoryButton} 
          onPress={() => setSelectedCategory('Classic')}
        >
          <Text style={selectedCategory === 'Classic' ? styles.categoryButtonTextActive : styles.categoryButtonText}>Classic</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={selectedCategory === 'Vegetable' ? styles.categoryButtonActive : styles.categoryButton} 
          onPress={() => setSelectedCategory('Vegetable')}
        >
          <Text style={selectedCategory === 'Vegetable' ? styles.categoryButtonTextActive : styles.categoryButtonText}>Vegetable</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={selectedCategory === 'Chicken' ? styles.categoryButtonActive : styles.categoryButton} 
          onPress={() => setSelectedCategory('Chicken')}
        >
          <Text style={selectedCategory === 'Chicken' ? styles.categoryButtonTextActive : styles.categoryButtonText}>Chicken</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={selectedCategory === 'Specials' ? styles.categoryButtonActive : styles.categoryButton} 
          onPress={() => setSelectedCategory('Specials')}
        >
          <Text style={selectedCategory === 'Specials' ? styles.categoryButtonTextActive : styles.categoryButtonText}>Specials</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    marginTop: height * 0.016,
    flexDirection: "row",
  },
  categoryButtonActive: {
    backgroundColor: "#B55638",
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.012,
    borderRadius: width * 0.05,
    marginRight: width * 0.012,
    marginLeft: width * 0.012,
  },
  categoryButtonTextActive: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: width * 0.04,
  },
  categoryButton: {
    backgroundColor: "#f8f8f8",
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.012,
    borderRadius: width * 0.05,
    marginRight: width * 0.012,
    marginLeft: width * 0.012,
  },
  categoryButtonText: {
    color: "#868686",
    fontWeight: "250",
    fontSize: width * 0.04,
  },
});

export default Category;
