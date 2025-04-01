import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebaseConfig"

const { width, height } = Dimensions.get("window")

// Custom scale function to adjust sizes based on screen width
const scale = (size) => (width / 375) * size

const OrderHistoryScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { orderID } = route.params // Get orderID from navigation params
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const orderDocRef = doc(db, "orders", orderID.toString())
        const orderDocSnap = await getDoc(orderDocRef)

        if (orderDocSnap.exists()) {
          setOrderData(orderDocSnap.data())
        } else {
          alert("Order not found.")
          navigation.goBack()
        }
      } catch (error) {
        console.error("Error fetching order data:", error)
      }
    }

    fetchOrderData()
  }, [orderID])

  if (!orderData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#b55638" />
      </View>
    )
  }

  const { order_time, pizzas_ordered, total_bill, delivery_address, phone_number, order_id } = orderData

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.orderDetails}>
        <Text style={styles.sectionTitle}>Order ID: {order_id}</Text>
        <Text style={styles.orderTime}>
          Order Time: {order_time && order_time.seconds ? new Date(order_time.seconds * 1000).toLocaleString() : "N/A"}
        </Text>


        <View style={styles.border}></View>
        {pizzas_ordered.map((pizza, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemHeader}>
              <Text style={styles.pizzaName}>{pizza.name} Pizza</Text>
              <Text style={styles.pizzaPrice}>Rs. {pizza.price}</Text>
            </View>
            <Text style={[styles.quantityText, { color: '#333' }]}>Quantity: <Text style={styles.quantityText}>{pizza.quantity}</Text></Text>
            <Text style={[styles.sizeText, { color: '#333' }]}>Size: <Text style={styles.sizeText}>{pizza.size}</Text></Text>
            <Text style={[styles.crustText, { color: '#333' }]}>Crust: <Text style={styles.crustText}>{pizza.crust}</Text></Text>
            {pizza.toppings.length > 0 ? (
              <Text style={[styles.toppingsText, { color: '#333' }]}>Toppings: <Text style={styles.toppingsText}>{pizza.toppings.join(", ")}</Text></Text>
            ) : (
              <Text style={[styles.toppingsText, { color: '#333' }]}>Toppings: <Text style={[styles.toppingsText, { fontStyle: 'italic' }]}>None</Text></Text>
            )}
            <Text style={styles.itemDetails}>Total: Rs. {pizza.price * pizza.quantity}</Text>
          </View>
        ))}
        <Text style={styles.total}>Total Bill: Rs. {total_bill}</Text>
      </View>

      <View style={styles.deliveryInfo}>
        <Text style={styles.sectionTitle}>Delivery Information</Text>
        <Text style={styles.infoLabel}>Address:</Text>
        <Text style={styles.infoText}>{delivery_address}</Text>
        <Text style={styles.infoLabel}>Phone Number:</Text>
        <Text style={styles.infoText}>{phone_number}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    padding: scale(20),
  },
  border: {
    marginBottom: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: scale(10),
  },
  orderDetails: {
    backgroundColor: "#fff",
    borderRadius: scale(8),
    padding: scale(16),
    marginBottom: scale(20),
  },
  sectionTitle: {
    fontSize: scale(20),
    fontWeight: "600",
    marginBottom: scale(10),
  },
  orderTime: {
    fontSize: scale(15),
    fontWeight: "400",
    color: "#888",
    marginBottom: scale(10),
  },
  item: {
    marginBottom: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: scale(10),
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scale(8),
  },
  pizzaName: {
    fontSize: scale(18),
    fontWeight: "600",
    color: "#333",
  },
  pizzaPrice: {
    fontSize: scale(16),
    fontWeight: "600",
    color: "#b55638",
  },
  quantityText: {
    fontSize: scale(16),
    fontWeight: "600",
    color: "#888",
    marginBottom: scale(8),
  },
  sizeText: {
    fontSize: scale(14),
    fontWeight: "500",  
    color: "#888",  
    marginBottom: scale(4),
  },
  crustText: {
    fontSize: scale(14),
    fontWeight: "500",  
    color: "#888",  
    marginBottom: scale(4),
  },
  toppingsText: {
    fontSize: scale(14),
    fontWeight: "500", 
    color: "#888",  
    marginBottom: scale(14),
    lineHeight: 20,
  },
  itemDetails: {
    fontSize: scale(15),
    color: "#b55638", 
    marginBottom: scale(4),
    fontWeight: "600",  
  },  
  total: {
    fontSize: scale(20),
    fontWeight: "bold",
    color: "#b55638",
    marginTop: scale(10),
  },
  deliveryInfo: {
    backgroundColor: "#fff",
    borderRadius: scale(8),
    padding: scale(16),
    marginBottom: scale(20),
  },
  infoLabel: {
    fontSize: scale(16),
    fontWeight: "600",
    color: "#333",
    marginBottom: scale(4),
  },
  infoText: {
    fontSize: scale(15),
    color: "#555",
    marginBottom: scale(10),
  },
  confirmButton: {
    backgroundColor: "#b55638",
    borderRadius: scale(30),
    paddingVertical: scale(16),
    alignItems: "center",
  },
  buttonText: {
    fontSize: scale(18),
    fontWeight: "bold",
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default OrderHistoryScreen
