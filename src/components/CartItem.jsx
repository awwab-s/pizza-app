import { useRef } from "react"
import { View, Text, Image, StyleSheet, Dimensions, Animated, PanResponder, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import QuantityControl from "./QuantityControl"

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
        // Only allow right swipe (positive dx) up to deleteButtonWidth
        if (gestureState.dx > 0) {
          translateX.setValue(Math.min(gestureState.dx, deleteButtonWidth))
        } else {
          // Allow left swipe to close
          translateX.setValue(Math.max(gestureState.dx, 0))
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          // Swipe right - show delete button
          Animated.spring(translateX, {
            toValue: deleteButtonWidth,
            useNativeDriver: true,
          }).start()
        } else {
          // Swipe left or not enough - hide delete button
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start()
        }
      },
    }),
  ).current

  return (
    <View style={styles.container}>
      {/* Delete button (behind the card) */}
      <View style={[styles.deleteContainer, { width: deleteButtonWidth }]}>
        <TouchableOpacity style={styles.deleteButton}>
          <Icon name="trash-2" size={scale(24)} color="white" />
        </TouchableOpacity>
      </View>

      {/* Card content */}
      <Animated.View style={[styles.card, { transform: [{ translateX }] }]} {...panResponder.panHandlers}>
        <Image source={{ uri: item.image }} style={styles.image} />

        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>${item.price}</Text>
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
    backgroundColor: "#b55638",
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
    borderRadius: scale(50),
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
    fontWeight: "500",
    color: "#121212",
    marginBottom: scale(4),
  },
  description: {
    fontSize: scale(14),
    color: "#434343",
    marginBottom: scale(8),
  },
  price: {
    fontSize: scale(18),
    fontWeight: "600",
    color: "#121212",
  },
})

export default CartItem

