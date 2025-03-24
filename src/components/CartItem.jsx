import { useRef } from "react"
import { View, Text, Image, StyleSheet, Dimensions, Animated, PanResponder, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import QuantityControl from "./QuantityControl"
import { getGoogleDriveImage } from "../context/PizzaContext"

const { width } = Dimensions.get("window")
const scale = (size) => (width / 375) * size

const SWIPE_THRESHOLD = 80

const CartItem = ({ item, onUpdateQuantity }) => {
  const translateX = useRef(new Animated.Value(0)).current
  const deleteButtonWidth = scale(60)

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 5
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0) {
          translateX.setValue(Math.min(gestureState.dx, deleteButtonWidth))
        } else {
          translateX.setValue(Math.max(gestureState.dx, 0))
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          Animated.spring(translateX, {
            toValue: deleteButtonWidth,
            useNativeDriver: true,
          }).start()
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start()
        }
      },
    })
  ).current

  return (
    <View style={styles.container}>
      {/* Delete button */}
      <View style={[styles.deleteContainer, { width: deleteButtonWidth }]}>
        <TouchableOpacity style={styles.deleteButton}>
          <Icon name="trash-2" size={scale(24)} color="white" />
        </TouchableOpacity>
      </View>

      {/* Card */}
      <Animated.View style={[styles.card, { transform: [{ translateX }] }]} {...panResponder.panHandlers}>
        <Image source={{ uri: getGoogleDriveImage(item.imageURL) }} style={styles.image} />

        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{item.name} Pizza</Text>
            <Text style={styles.description}>{item.size} Size | {item.crust} Crust</Text>
            <Text 
              style={[styles.toppings, Array.isArray(item.toppings) && item.toppings.length > 0 ? {} : styles.noToppings]}
              numberOfLines={1}
              ellipsizeMode="tail"
            > 
              {Array.isArray(item.toppings) && item.toppings.length > 0
                ? `${item.toppings.join(", ")}`
                : "No extra toppings"}
            </Text>
            <Text style={styles.price}>Rs. {item.price}</Text>
          </View>

          <QuantityControl
            quantity={item.quantity}
            onDecrease={() => onUpdateQuantity(item.id, item.quantity - 1)}
            onIncrease={() => onUpdateQuantity(item.id, item.quantity + 1)}
          />
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: scale(140),
    marginBottom: scale(16),
  },
  deleteContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#d32f2f",
    borderTopLeftRadius: scale(24),
    borderBottomLeftRadius: scale(24),
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    width: scale(40),
    height: scale(40),
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "white",
    borderRadius: scale(24),
    flexDirection: "row",
    padding: scale(16),
  },
  image: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(12),
  },
  contentContainer: {
    flex: 1,
    marginLeft: scale(16),
    justifyContent: "space-between",
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: scale(18),
    fontWeight: "600",
    color: "#333",
    marginBottom: scale(5),
  },
  description: {
    fontSize: scale(14),
    color: "#666",
    marginBottom: scale(4),
  },
  toppings: {
    fontSize: scale(12),
    color: "#888",
    marginBottom: scale(10),
  },
  price: {
    fontSize: scale(16),
    fontWeight: "bold",
    color: "#d32f2f",
  },
  noToppings: {
    fontStyle: "italic",
    color: "#888",
    marginBottom: scale(10),
  }
})

export default CartItem
