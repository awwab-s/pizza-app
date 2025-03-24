import React from "react";
import { View, TouchableOpacity } from "react-native";
import PizzaItem from "../components/PizzaItem";
import { getGoogleDriveImage } from "../context/PizzaContext";

const PizzaList = ({ pizzas, onPress }) => {
  return (
    <View>
      {pizzas.map((item) => (
        <TouchableOpacity
          key={item.id}
          // onPress={() => navigation.navigate("PizzaOrder", { pizza: item })},
          onPress={() => onPress(item)}
        >
          <PizzaItem
            imgURL={getGoogleDriveImage(item.imageURL)}
            name={item.name}
            price={item.basePrice}
            discountText="25% Off"
            rating={item.rating}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PizzaList;
