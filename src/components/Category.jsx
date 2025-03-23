import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, Dimensions, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const Category = () => {
    return (
      <View style={{paddingHorizontal: width * 0.024,}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            <TouchableOpacity style={styles.categoryButtonActive}>
                <Text style={styles.categoryButtonTextActive}>All Pizzas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryButtonText}>Vegetarian</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryButtonText}>Specials</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryButtonText}>Specials</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryButtonText}>Specials</Text>
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
        paddingHorizontal: width * 0.024,
        paddingVertical: height * 0.012,
        borderRadius: width * 0.05,
        marginRight: width * 0.012,
        marginLeft: width * 0.012,
    },
    categoryButtonTextActive: {
        color: "#ffffff",
        fontWeight: "500",
        fontSize: width * 0.04,
    },
    categoryButton: {
        backgroundColor: "#f8f8f8",
        paddingHorizontal: width * 0.024,
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