import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert, TextInput, Modal } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { useNavigation } from "@react-navigation/native"
import { collection, doc, setDoc, getDoc, getDocs, query, where, Timestamp } from "firebase/firestore"
import { auth, db } from "../../firebaseConfig"
import React, { useState } from "react"

const { width, height } = Dimensions.get("window")
const scale = (size) => (width / 375) * size

const CartFooter = ({ totalBill, cartItems }) => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation()

  const generateUniqueOrderID = async () => {
    let orderID
    let isUnique = false

    while (!isUnique) {
      orderID = Math.floor(10000 + Math.random() * 90000) // Generate 5-digit number

      // Check Firestore if the order_id already exists
      const ordersRef = collection(db, "orders")
      const q = query(ordersRef, where("order_id", "==", orderID))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        isUnique = true
      }
    }
    return orderID
  }

  const placeOrder  = async () => {
    const user = auth.currentUser

    try {
      const orderID = await generateUniqueOrderID()

      const userDocRef = doc(db, "users", user.uid)
      const userDocSnap = await getDoc(userDocRef)

      const userData = userDocSnap.data()
      const deliveryAddress = userData.address || "No address provided"

      const orderData = {
        order_id: orderID,
        user_id: user.uid,
        order_time: Timestamp.now(),
        total_bill: totalBill,
        pizzas_ordered: cartItems,
        delivery_address: deliveryAddress,
        phone_number: phoneNumber,
        status: "Pending",
      }

      await setDoc(doc(db, "orders", orderID.toString()), orderData)

      alert("Order placed successfully!")
      console.log("Order placed successfully!", orderData),

      // Clear the cart in Firestore
      await setDoc(doc(db, "users", user.uid), { cart: [] }, { merge: true });
      console.log("Cart cleared", { cart: [] });

      navigation.navigate("Checkout", { orderID })
    } catch (error) {
      console.error("Error placing order:", error)
    }
  }

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      Alert.alert("Empty Cart", "Your cart is empty.")
      return
    }
  
    Alert.alert(
      "Confirm Order",
      "Are you sure you want to place this order?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => {
            setModalVisible(true); // Set the modal to visible after confirming the order
          } 
        }
      ]
    )
  }  

  return (
    <View style={styles.footer}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Bill</Text>
        <Text style={styles.totalAmount}>Rs. {totalBill}</Text>
      </View>

      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>Place Order</Text>
        <Icon name="chevron-right" size={scale(20)} color="#121212" />
      </TouchableOpacity>

      {/* Modal for Phone Number Input */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                placeOrder()
                setModalVisible(false) // Close modal after submitting
              }}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)} // Close modal if canceled
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#b55638",
    borderTopLeftRadius: scale(32),
    borderTopRightRadius: scale(32),
    padding: scale(24),
    paddingBottom: scale(24) + (height > 800 ? 16 : 0), // Extra padding for notch devices
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(16),
  },
  totalLabel: {
    fontSize: scale(20),
    fontWeight: "500",
    color: "white",
  },
  totalAmount: {
    fontSize: scale(36),
    fontWeight: "bold",
    color: "white",
  },
  placeOrderButton: {
    backgroundColor: "white",
    borderRadius: scale(30),
    paddingVertical: scale(16),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: scale(16),
    fontWeight: "500",
    color: "#121212",
    marginRight: scale(8),
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: scale(300),
    backgroundColor: "white",
    padding: scale(20),
    borderRadius: scale(10),
    alignItems: "center",
  },
  modalTitle: {
    fontSize: scale(18),
    fontWeight: "600",
    marginBottom: scale(10),
  },
  input: {
    width: "100%",
    height: 'auto',
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: scale(10),
    paddingLeft: scale(10),
    marginBottom: scale(20),
  },
  submitButton: {
    backgroundColor: "#b55638",
    borderRadius: scale(10),
    paddingVertical: scale(10),
    paddingHorizontal: scale(30),
  },
  submitButtonText: {
    fontSize: scale(16),
    color: "white",
  },
  cancelButton: {
    marginTop: scale(10),
  },
  cancelButtonText: {
    fontSize: scale(16),
    color: "#888",
  },
})

export default CartFooter

